"use client";
import React from "react";
import { ConnectKitButton } from "connectkit";
import { Button } from "../ui/button";
import Logo from "../common/logo";

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50">
      <div>
        <Logo width={30} height={30}/>
      </div>
      <Button
        asChild
        className="overflow-hidden self-end px-10 py-5 text-2xl rounded-[34px] max-md:px-5"
      >
        <ConnectKitButton />
      </Button>
    </header>
  );
}
