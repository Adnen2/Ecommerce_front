'use client';
import './globals.css'
import { Inter } from 'next/font/google'
import { CartProvider } from "use-shopping-cart";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <CartProvider
        // Enables local storage
        shouldPersist={true}
      ></CartProvider>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
