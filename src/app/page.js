import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <div style={styles.introSection}>
        <Image
          src={"/kubi-logo.png"}
          alt={"kubi logo"}
          height={300}
          width={300}
        />
        <div style={styles.about}>
          <strong>
            This site is brought to you by the University of Kansas Blockchain
            Institute.
          </strong>
          <p>
            The KU Blockchain Institute is a is a student-led technology
            initiative established under the Institute for Information Sciences
            (I2S) at the University of Kansas. We are committed to promoting
            adoption of blockchain technology and principles of decentralization
            through the interdisciplinary research, education, and development
            of distributed ledger technologies at KU.
          </p>
          <Link href={"https://kublockchain.com/"} style={styles.buttonLink}>
            Learn More
          </Link>
        </div>
        <Link href={"/jeopardy"} style={styles.buttonLink}>
          Play Jeopardy!
        </Link>
      </div>
    </>
  );
}

const styles = {
  introSection: {
    display: "flex", // Enable flexbox
    flexDirection: "column", // Stack children vertically
    justifyContent: "center", // Center content vertically in the container
    alignItems: "center", // Center content horizontally in the container

    textAlign: "center", // Center the text within the div itself
    marginLeft: "150px",
    marginRight: "150px",
  },
  about: {
    fontSize: "1.5rem",
    marginBottom: "20px", // Correct the property name from 'marginBelow'
  },
  buttonLink: {
    display: "inline-block",
    border: "2px solid black",
    borderRadius: "8px",
    padding: "8px 16px",
    backgroundColor: "transparent",
    color: "black",
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
