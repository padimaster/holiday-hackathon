'use client'
import Logo from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import { ConnectKitButton } from "connectkit";
import * as React from "react";

export default function Home() {
  return (
    <main>
      <header className="flex justify-end items-center py-4 px-8">
        <Button
          asChild
          className="overflow-hidden self-end px-10 py-5 text-2xl rounded-[34px] max-md:px-5"
        >
          <ConnectKitButton />
        </Button>
      </header>
      <div className="flex overflow-hidden flex-col items-center px-20 pt-7 pb-60 font-bold text-white  max-md:px-5 max-md:pb-24">
        <Logo/>
        <h1 className="mt-4 text-6xl max-md:text-4xl">Tech pills</h1>
        <p className="mt-4 text-4xl text-center max-md:max-w-full">
          Whether you&apos;re a curious enthusiast, a tech professional, or a
          builder, Tech Pills offers tailored content to learn, explore, and
          create—all in one place.
        </p>
      </div>
    </main>
  );
}
