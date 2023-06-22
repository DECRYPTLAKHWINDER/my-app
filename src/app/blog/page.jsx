import Link from "next/link";
import React from "react";

const Blog = () => {
  let id = "125";
  return (
    <div className="pageBody">
      <h1>
        <Link href={`/blog/${id}`}>Blog</Link>
      </h1>
    </div>
  );
};

export default Blog;
