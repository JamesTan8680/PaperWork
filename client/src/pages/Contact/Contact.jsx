import React, { useState } from "react";
import "./Contact.scss";
import Phone from "../../img/contact/Phone.svg";
import Mail from "../../img/contact/contact.svg";
import Location from "../../img/contact/location.svg";
function Contact() {
  //state for the form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  //onclick to handle event change
  const onChangeElement = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //event for handle the onSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(formData.phone);
  };
  return (
    <div className="contact">
      <div className="contact-header">
        <span>
          <b>Get in Touch!</b>
        </span>
        <span className="quote">Contact us for a quote</span>
      </div>
      <div className="contact-info">
        <div className="location">
          <img src={Location} alt="" />
          <div className="address">
            <span>234 Glenhuntly, Glenhuntly</span>
            <span>VIC, 3163</span>
          </div>
        </div>
        <div className="phone">
          <img src={Phone} alt="" />
          <span>+655 449219024</span>
        </div>
        <div className="mail">
          <img src={Mail} alt="" />
          <span>
            <a href="mailto:Teampaperwork@proton.me">Teampaperwork@proton.me</a>
          </span>
        </div>
      </div>

      <div className="contact-form">
        <form onSubmit={handleSubmit}>
          <div className="detail">
            <div className="personal-detail">
              <label htmlFor="name">Your name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={onChangeElement}
                placeholder="Enter your name"
                required
              />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={onChangeElement}
                placeholder="Enter your Email"
                required
              />
              <label htmlFor="phone">Phone number</label>
              <input
                type="tel"
                pattern="^\({0,1}((0|\+61)(2|4|3|7|8)){0,1}\){0,1}( |-){0,1}[0-9]{2}( |-){0,1}[0-9]{2}( |-){0,1}[0-9]{1}( |-){0,1}[0-9]{3}$"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={onChangeElement}
                placeholder="Enter your Phone number"
                required
              />
            </div>
            <div className="message">
              <label htmlFor="message">Message</label>
              <textarea
                name="message"
                id="message"
                value={formData.message}
                onChange={onChangeElement}
                placeholder="Enter your message!"
                required
              />
            </div>
          </div>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
