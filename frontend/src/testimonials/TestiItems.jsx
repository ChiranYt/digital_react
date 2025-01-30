import "./testimonials.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";

import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCarousel,
  MDBCarouselItem,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
} from "mdb-react-ui-kit";

const TestiItems = () => {
  const testimonials = [
    {
      name: "Maria Smantha",
      role: "Digital Marketing Strategist",
      imgSrc: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp",
      text: "Working with this team has been a game-changer for our business. Their expertise in SEO, social media marketing, and paid ads boosted our online presence and helped us reach a wider audience. Highly recommend their services to anyone looking to grow their business digitally!",
    },
    {
      name: "Lisa Cudrow",
      role: "E-commerce Manager",
      imgSrc: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(2).webp",
      text: "We saw an immediate increase in traffic after collaborating with this team. Their data-driven approach and personalized strategies helped us optimize our online store and increase conversions. Their communication and support are top-notch!",
    },
    {
      name: "John Smith",
      role: "Content Marketing Specialist",
      imgSrc: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(3).webp",
      text: "I've partnered with several marketing agencies, but none have matched the level of detail and care this team puts into their work. From content creation to analytics, they deliver real results. Our content marketing has never been more effective.",
    },
  ];

  return (
    <>
      <div className="testi-main">
        <MDBContainer fluid className="py-5 gradient-custom">
          <MDBRow className="d-flex justify-content-center">
            <MDBCol md="12">
              <div className="text-center mb-4 pb-2">
                <MDBIcon
                  fas
                  icon="quote-left"
                  size="3x"
                  className="text-white"
                />
              </div>
              <MDBCard>
                <MDBCardBody className="px-4 py-5">
                  <MDBCarousel showIndicators showControls dark>
                    {testimonials.map((testi, index) => (
                      <MDBCarouselItem
                        key={index}
                        className={index === 0 ? "active" : ""}
                      >
                        <MDBRow className="d-flex justify-content-center">
                          <MDBCol lg="10" xl="8">
                            <MDBRow>
                              <MDBCol
                                lg="4"
                                className="d-flex justify-content-center"
                              >
                                <img
                                  src={testi.imgSrc}
                                  className="rounded-circle shadow-1 mb-4 mb-lg-0"
                                  alt={`${testi.name}'s avatar`}
                                  width="150"
                                  height="150"
                                />
                              </MDBCol>
                              <MDBCol
                                md="9"
                                lg="7"
                                xl="8"
                                className="text-center text-lg-start mx-auto mx-lg-0"
                              >
                                <h4 className="mb-4">
                                  {testi.name} - {testi.role}
                                </h4>
                                <p className="mb-0 pb-3">{testi.text}</p>
                              </MDBCol>
                            </MDBRow>
                          </MDBCol>
                        </MDBRow>
                      </MDBCarouselItem>
                    ))}
                  </MDBCarousel>
                </MDBCardBody>
              </MDBCard>
              <div className="text-center mt-4 pt-2">
                <MDBIcon
                  fas
                  icon="quote-right"
                  size="3x"
                  className="text-white"
                />
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </>
  );
};

export default TestiItems;
