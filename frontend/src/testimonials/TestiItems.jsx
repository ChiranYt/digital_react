import React from "react";
import "./testimonials.css"; // Ensure you import the custom CSS

const testimonials = [
  {
    name: "Leslie Alexander",
    role: "Digital Marketing Strategist",
    image: "https://cdn-icons-png.flaticon.com/128/16001/16001916.png",
    feedback:
      "Their strategic approach and expert insights significantly boosted our brand visibility and lead generation. Highly recommend!",
  },
  {
    name: "Julie Doe",
    role: "E-commerce Manager",
    image: "https://cdn-icons-png.flaticon.com/128/16001/16001931.png",
    feedback:
      "Their expertise in e-commerce marketing helped us drive more traffic and increase conversions effortlessly. Truly outstanding!",
  },
  {
    name: "Jane Cooper",
    role: "Content Marketing Specialist",
    image: "https://cdn-icons-png.flaticon.com/128/16001/16001922.png",
    feedback:
      "Their strategic content approach boosted our engagement and brand visibility significantly. Highly recommend!",
  },
];

const TestiItems = () => {
  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <h2 className="testimonials-title">Our happy clients say about us</h2>
        <div className="testimonial-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="star-icons">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
              <blockquote className="testimonial-text">
                {testimonial.feedback}
              </blockquote>
              <div className="testimonial-footer">
                <img
                  className="testimonial-image"
                  src={testimonial.image}
                  alt={testimonial.name}
                />
                <div className="testimonial-info">
                  <p className="testimonial-name">{testimonial.name}</p>
                  <p className="testimonial-role">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="spacing"></div>
    </section>
  );
};

export default TestiItems;
