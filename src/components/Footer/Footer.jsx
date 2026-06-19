import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-5 py-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo / About */}
          <div>
            <h2 className="text-2xl font-bold mb-4">BlogApp</h2>
            <p className="text-gray-400 leading-6">
              A modern blogging platform where you can share your ideas,
              stories, and creativity with the world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/all-posts"
                  className="text-gray-400 hover:text-white transition"
                >
                  All Posts
                </Link>
              </li>

              <li>
                <Link
                  to="/add-post"
                  className="text-gray-400 hover:text-white transition"
                >
                  Add Post
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>

            <p className="text-gray-400">Email: support@blogapp.com</p>

            <p className="text-gray-400 mt-2">
              Made with ❤️ using React & Appwrite
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-5 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} BlogApp. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
