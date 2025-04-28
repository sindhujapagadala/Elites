import React, { useState } from 'react';
import { Navbar, Container, Form, InputGroup, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import logo from '../logo.jpeg';

const CustomNavbar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Add your search functionality here
  };

  return (
    <Navbar expand="lg" className="navbar-light bg-light m-2 mt-4" 
      style={{ 
        backgroundImage: "url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3cd770b2-3e49-4672-99fb-8483b9dd9bf0/dg2jzjx-09688ae9-5e0c-4ee5-9d25-7883937eae3f.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzNjZDc3MGIyLTNlNDktNDY3Mi05OWZiLTg0ODNiOWRkOWJmMFwvZGcyanpqeC0wOTY4OGFlOS01ZTBjLTRlZTUtOWQyNS03ODgzOTM3ZWFlM2YucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.iwFvYJ7UOMKb8rYfAhGxBG3-yCOrw4qixMtg7SLAlXI)",
        backgroundSize: "cover",
        borderRadius: "10px",
        height: "auto",
        minHeight: "75px",
        padding: "0.5rem"
      }}>
      <Container fluid>
        <Navbar.Brand href="#" className="d-flex align-items-center me-3">
          <img 
            src={logo} 
            alt="Logo" 
            width="55" 
            height="55" 
            className="d-inline-block align-top" 
            style={{ borderRadius: "50%", minWidth: "55px" }}
          />
          <span className="d-inline-block align-center ms-2" style={{ 
            fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
            fontStyle: "italic",
            fontWeight: "bold", 
            backdropFilter: "blur(2px)",
            whiteSpace: "nowrap"
          }}>
            ECHOMIX
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-content" />
        
        <Navbar.Collapse id="navbar-content" className="justify-content-between">
          <Form onSubmit={handleSearch} className="d-flex my-2 my-lg-0" style={{ flex: 1, maxWidth: "500px", margin: "0 auto" }}>
            <InputGroup>
              <Form.Control
                type="search"
                placeholder="Search songs..."
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: "2px solid black",
                  borderRadius: "5px",
                  height: "40px"
                }}
              />
              <Button 
                variant="light" 
                type="submit"
                style={{
                  border: "2px solid white",
                  borderRadius: "5px",
                  height: "40px",
                  width: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <FaSearch />
              </Button>
            </InputGroup>
          </Form>

          <Navbar.Text className="ms-lg-3">
            <a href="#profile">
              <img 
                src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&ga=GA1.1.1908571217.1697457883&semt=ais_hybrid" 
                alt="Profile" 
                style={{ 
                  height: "clamp(40px, 8vw, 55px)",
                  width: "clamp(40px, 8vw, 55px)",
                  borderRadius: "50%"
                }}
              />
            </a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;