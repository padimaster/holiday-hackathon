'use client'
import React from 'react'
import { ConnectKitButton } from "connectkit";

export default function Header() {
  return (
    <header className='flex justify-between items-center py-4 px-8'>
        <div></div>
        <ConnectKitButton />
    </header>
  )
}
