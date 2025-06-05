package com.echo.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String toEmail, String otp) {
       SimpleMailMessage message = new SimpleMailMessage();
       message.setTo(toEmail);
       message.setSubject("Your OTP for email verification");
       message.setText("Your otp is  : " + otp);
       mailSender.send(message);
    }

}
