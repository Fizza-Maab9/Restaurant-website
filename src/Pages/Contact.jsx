import { useState } from "react";
import "./Contact.css";

const Contact = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const whatsappNumber = "923417194113";

    const whatsappMessage = `Hello Maab's Kitchen!%0A%0AName: ${formData.name}%0APhone: ${formData.phone}%0AMessage: ${formData.message}`;

    window.open(
      `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`,
      "_blank"
    );

    setFormData({
      name: "",
      phone: "",
      message: "",
    });
  };

  return (
    <section className={`contact-section ${darkMode ? "theme-dark" : "theme-light"}`}>
      <div className="contact-container">

        {/* Contact Content */}
        <div className="contact-content">
          <span>GET IN TOUCH</span>

          <h1>
            Let's Talk About <strong>Food</strong>
          </h1>

          <p>
            Have a question, special request, or want to place an
            order? Contact Maab's Kitchen and we will be happy to
            help you.
          </p>

          <div className="contact-info">

            <div className="contact-info-box">
              <div className="contact-icon">📍</div>
              <div>
                <h3>Visit Us</h3>
                <p>123 Food Street, MB.DIN, Pakistan</p>
              </div>
            </div>

            <div className="contact-info-box">
              <div className="contact-icon">📞</div>
              <div>
                <h3>Call Us</h3>
                <p>+92 341 7194113</p>
              </div>
            </div>

            <div className="contact-info-box">
              <div className="contact-icon">🕒</div>
              <div>
                <h3>Opening Hours</h3>
                <p>Everyday: 12 PM – 11 PM</p>
              </div>
            </div>

          </div>
        </div>

        {/* Contact Form */}
        <form className="contact-form" onSubmit={handleSubmit} autoComplete="off">
          <h2>Send Us a Message</h2>

          <div className="contact-group">
            <label>Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>

          <div className="contact-group">
            <label>Phone</label>

            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>

          <div className="contact-group">
            <label>Message</label>

            <textarea
              name="message"
              placeholder="Write your message..."
              value={formData.message}
              onChange={handleChange}
              rows="6"
              required
            ></textarea>
          </div>

          <button type="submit" className="contact-submit-btn">
            Send on WhatsApp →
          </button>
        </form>

      </div>
    </section>
  );
};

export default Contact;