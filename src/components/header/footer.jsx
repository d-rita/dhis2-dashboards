import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "4rem 1rem",
        color: "#FBFCFD",
        backgroundColor: "#212934",
      }}
    >
      <p>Created by DN</p>
      <p>Hosted on Netlify</p>
      <p>Code: Github</p>
    </footer>
  );
};

export default Footer;
