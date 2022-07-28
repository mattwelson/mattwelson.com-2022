import * as React from "react";
import { Link } from "gatsby";

const Layout: React.FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto] items-start">
      <header className="grid-content bg-slate-500 py-4 text-white">
        <div className="font-sans text-lg font-bold ">
          <Link to="/">Matt Welson</Link>
        </div>
      </header>
      <main className="grid-content">{children}</main>
      <footer className="grid-content mt-16 pt-8 pb-16 ">
        <div>
          Footer will have some cool links to twitter, instagram and strava. As
          well as a super bold Github link. Very important.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
