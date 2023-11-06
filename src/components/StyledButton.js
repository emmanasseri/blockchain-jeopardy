import React from "react";
import Link from "next/link";

const StyledButton = ({ title, onClick, link }) => {
  if (link) {
    return (
      <Link href={link} style={styles.buttonLink}>
        {title}
      </Link>
    );
  }

  if (onClick && typeof onClick === "function") {
    return (
      <button style={styles.button} onClick={onClick}>
        {title}
      </button>
    );
  }

  return <button style={styles.button}>{title}</button>;
};

export default StyledButton;
const styles = {
  button: {
    border: "2px solid white",
    borderRadius: "8px",
    padding: "8px 16px",
    backgroundColor: "transparent",
    color: "white",
    cursor: "pointer",
    outline: "none",
    transition: "0.3s",
    "&:hover": {
      backgroundColor: "black",
      color: "white",
    },
  },
  buttonLink: {
    display: "inline-block",
    border: "2px solid black",
    borderRadius: "8px",
    padding: "8px 16px",
    backgroundColor: "transparent",
    color: "white",
    cursor: "pointer",
    textDecoration: "none",
    outline: "none",
    transition: "0.3s",
    "&:hover": {
      backgroundColor: "black",
      color: "white",
    },
  },
};
