package com.echo.app.controller;

import java.io.IOException;
import java.io.OutputStream;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.echo.app.entity.Song;
import com.echo.app.entity.SongResponse;
import com.echo.app.entity.User;
import com.echo.app.service.SongService;
import com.echo.app.service.UserService;
import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.GridFSDownloadStream;
import com.mongodb.client.gridfs.model.GridFSFile;
import com.mongodb.client.gridfs.model.GridFSUploadOptions;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/song")
public class SongController {

    @Autowired
    private SongService songService;

    @Autowired
    private UserService userService;

    @Autowired
    private GridFSBucket gridFSBucket;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadSong(
            @RequestParam String songName,
            @RequestParam String artistName,
            @RequestParam MultipartFile file) {

        try (var inputStream = file.getInputStream()) {
            ObjectId fileId = gridFSBucket.uploadFromStream(
                    file.getOriginalFilename(),
                    inputStream,
                    new GridFSUploadOptions().chunkSizeBytes(21048576) 
            );

            Song song = new Song();
            song.setSongName(songName);
            song.setArtistName(artistName);
            song.setSongFile(fileId);
            song.setLikes(0L);
            song.setDisLikes(0L);
            song.setDate(LocalDateTime.now());
            song.setLanguage("English"); 
            songService.saveSong(song);
            System.out.println("Saved song ID: " + song.getId());
            Optional<User> optUser = userService.findByUserName(artistName);
            User user = optUser.get();
            List<String> oldSongs;
            if (optUser.isPresent()) {
                oldSongs = user.getUserSongs();
                if (oldSongs == null) {
                    oldSongs = new ArrayList<>();
                }
                oldSongs.add(0, song.getId().toHexString());
                user.setUserSongs(oldSongs);
                userService.saveUser(user);
            }
            else{
                return ResponseEntity.badRequest().body("User not found.");
            }
            

            return ResponseEntity.ok().body(user);

        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to upload song.");
        }
    }

    @GetMapping("getSong/{id}")
    public ResponseEntity<?> getSongById(@PathVariable ObjectId id) {
        Optional<Song> song = songService.getSong(id);
        if (song.isPresent()) {
            return ResponseEntity.ok().body(song.get());
        }
        return ResponseEntity.badRequest().body("Song not found.");
    }

    @GetMapping("/stream/{fileId}")
public void streamSong(@PathVariable String fileId, HttpServletResponse response) {
    ObjectId objectId;
    try {
        objectId = new ObjectId(fileId);
    } catch (IllegalArgumentException e) {
        response.setStatus(HttpStatus.BAD_REQUEST.value());
        return;
    }

    GridFSFile gridFSFile = gridFSBucket.find(new Document("_id", objectId)).first();
    if (gridFSFile == null) {
        response.setStatus(HttpStatus.NOT_FOUND.value());
        return;
    }

    try (GridFSDownloadStream downloadStream = gridFSBucket.openDownloadStream(objectId)) {
        response.setContentType("audio/mpeg");
        response.setHeader("Content-Disposition", "inline; filename=\"" + gridFSFile.getFilename() + "\"");
        byte[] buffer = new byte[4096];
        int bytesRead;
        while ((bytesRead = downloadStream.read(buffer)) != -1) {
            response.getOutputStream().write(buffer, 0, bytesRead);
        }
        response.flushBuffer();
    } catch (IOException e) {
        response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
    }
}





    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteSong(@PathVariable ObjectId id) {
        Optional<Song> songOpt = songService.getSong(id);
        if (songOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Song not found.");
        }

        Song song = songOpt.get();
        try {
            gridFSBucket.delete(song.getSongFile());
            songService.deleteById(id);
            return ResponseEntity.ok("Song deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to delete song: " + e.getMessage());
        }
    }
    
    @GetMapping("/playlist")
    public List<SongResponse> getPlaylistByLanguage(@RequestParam String language) {
    List<Song> songs = songService.getSongsByLanguage(language);
    return songs.stream().map(SongResponse::new).collect(Collectors.toList());
    }

    

}
