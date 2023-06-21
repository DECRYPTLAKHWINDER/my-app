"use client";
import React, { useState } from "react";
import {
  pageBody,
  container,
  formContainer,
  inputContainer,
  buttonContainer,
} from "../page.module.css";
const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Name: name,
          Email: email,
          Subject: subject,
          Message: message,
        }),
      });
      console.log("response=============>", response);
      if (response.status === 200) {
        console.log("Successfully created");
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        setSubmitMessage("Successfully created");
      } else {
        console.log("Failed to create");
        setSubmitMessage("error creating");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={`${container} ${pageBody}`}>
      <div className={formContainer}>
        <h1>Contact Us</h1>
        <div className={inputContainer}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={inputContainer}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={inputContainer}>
          <label>Subject</label>
          <input
            type="text"
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className={inputContainer}>
          <label>Message</label>
          <textarea
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <div className={buttonContainer}>
          <button type="button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
        <p>{submitMessage}</p>
      </div>
    </div>
  );
};

export default Contact;
