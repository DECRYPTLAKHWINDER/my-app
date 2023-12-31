"use client";
import React from "react";
import Link from "next/link";

const links = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "Portfolio",
    url: "/portfolio",
  },
  {
    id: 3,
    title: "Blog",
    url: "/blog",
  },
  {
    id: 4,
    title: "About",
    url: "/about",
  },
  {
    id: 5,
    title: "Contact",
    url: "/contact",
  },
  {
    id: 6,
    title: "Dashboard",
    url: "/dashboard",
  },
];
const Navbar = () => {
  return (
    <div className="navbar">
      <Link href="/">Applications</Link>

      <div>
        {links.map((link) => (
          <Link key={link.id} href={link.url} className="menu-item">
            {link.title}
          </Link>
        ))}
        <button >Logout</button>
        </div>
        
    </div>
  );
};

export default Navbar;
