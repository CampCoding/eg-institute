import React from "react";
import PagesBanner from "./../../components/layout/PagesBanner";
import ContactSection from "../../components/Contact/contactForm";
import Map from "../../components/Contact/Map";

const ContactUsPage = () => {
  return (
    <div>
      <PagesBanner
        title={"Contact Us"}
        subTitle={`Have questions? We're just a message away from helping you master the language.`}
      />

      <ContactSection />
      {/* <Map /> */}
    </div>
  );
};

export default ContactUsPage;
