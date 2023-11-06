"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import StyledButton from "./StyledButton";

//import styles from "./Navbar.module.css"; // Import the CSS module

const Navbar = () => {
  return (
    <nav>
      <Link href="/">
        <StyledButton title="home" />
      </Link>

      <div>
        <Link href="/jeopardy">
          <StyledButton title="play jeopardy" />
        </Link>
        <Link href="/about">
          <StyledButton title="about this project" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
