"use client";

import React from "react";
import Image from "next/image";
import { WalletButton } from "./WalletButton";
import styles from "./TechPills.module.css";


export const TechPills: React.FC = () => {

  return (
    <div className={styles.login}>
      <WalletButton/>
      <Image
        src="logo-tech-pills.svg"
        className={styles.img}
        alt="Tech Pills logo"
        width={244}
        height={260}
      />
      <h1 className={styles.title}>Tech Pills</h1>
      <p className={styles.description}>
        Whether you&apos;re a curious enthusiast, a tech professional, or a builder,
        Tech Pills offers tailored content to learn, explore, and create&mdash;all in
        one place.
      </p>
    </div>
  );
};