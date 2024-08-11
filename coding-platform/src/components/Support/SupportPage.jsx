import React, { useState } from 'react';
import './SupportPage.css';

const SupportPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle form submission, e.g., send data to an API
    setIsSubmitted(true);
  };

  return (
    <div className="support-page">
      <header className="support-header">
        <h1>Support Center</h1>
        <p>We’re here to help! Please reach out with any questions or issues.</p>
      </header>
      <div className="contact-details">
        <h2>Contact Details</h2>
        <p>Email: <a href="mailto:support@codeconquer.com">support@codeconquer.com</a></p>
        <p>Phone: +01 1001010001</p>
        <p>Address: 123 Code Conquer St, Coding City, CA 98765</p>
      </div>
      <div className="contact-form">
        <h2>Send Us a Message</h2>
        {isSubmitted ? (
          <p className="thank-you-message">Thank you for reaching out! We will get back to you soon.</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
            />
            <button type="submit">Send Message</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SupportPage;
