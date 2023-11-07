"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import StyledButton from "./StyledButton";

//import styles from "./Navbar.module.css"; // Import the CSS module

const Navbar = () => {
  return (
    <nav>
      <Link href="/">
        <StyledButton title="About this Project" />
      </Link>

      <div>
        <Link href="/jeopardy">
          <StyledButton title="Play Jeopardy!" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
