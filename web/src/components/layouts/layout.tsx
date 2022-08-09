import * as React from "react";
import { Link } from "gatsby";
import { PortableTextComponentsProvider } from "@portabletext/react";
import { FaStrava, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";
import components from "../../sanityComponents/components";
import InstagramFeed from "../instagram/InstagramFeed";

const Layout: React.FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <PortableTextComponentsProvider components={components}>
      <div className="grid min-h-screen grid-rows-[auto_1fr_auto] items-start">
        <header className="grid-content bg-slate-400 py-4 text-white">
          <div className="font-sans text-lg font-bold ">
            <Link to="/">Matt Welson</Link>
          </div>
        </header>
        <main className="grid-content">{children}</main>
        <InstagramFeed />
        <footer className="grid-content mt-16 pt-8 pb-16 ">
          <div className="mb-6 flex items-center justify-center gap-6 text-4xl text-slate-400">
            <a
              href="https://www.strava.com/athletes/37049548"
              title="Strava"
              target="_blank"
              rel="noopener nofollow noindex"
              className="duration-200 ease-in-out hover:text-orange-500"
            >
              <FaStrava />
            </a>
            <a
              href="https://www.instagram.com/m.welson/"
              title="Instagram"
              target="_blank"
              rel="noopener nofollow noindex"
              className="duration-200 ease-in-out hover:text-purple-500"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com/MattWelson"
              target="_blank"
              rel="noopener nofollow noindex"
              className="duration-200 ease-in-out hover:text-blue-500"
            >
              <FaTwitter />
            </a>
          </div>
          <div className="text-center">
            Made by a big old nerd. Using Sanity.io, GatsbyJS and a whole lot of
            other stuff created by smart people.
          </div>
          <div className="my-6 flex items-center justify-center gap-6 text-6xl text-slate-400">
            <a
              href="https://github.com/mattwelson/mattwelson.com-2022"
              target="_blank"
              rel="noopener nofollow noindex"
              className="duration-200 ease-in-out hover:text-slate-800"
            >
              <FaGithub />
            </a>
          </div>
        </footer>
      </div>
    </PortableTextComponentsProvider>
  );
};

export default Layout;
