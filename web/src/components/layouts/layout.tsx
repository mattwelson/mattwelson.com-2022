import * as React from "react";
import { Link } from "gatsby";

const Layout: React.FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div>
      <header className="grid-content">
        <div className="font-serif text-lg font-bold text-red-700">
          <Link to="/">Matt Welson</Link>
        </div>
      </header>
      <main className="grid-content">{children}</main>
    </div>
  );
};

export default Layout;
