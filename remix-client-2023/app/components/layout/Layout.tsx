import { Link } from "@remix-run/react";
import { FaGithub } from "react-icons/fa";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header className="grid-cols-layout grid bg-slate-700 py-4 text-white [&>*]:col-start-2">
        <Link to="/">Matt Welson</Link>
      </header>
      <div className="grid-cols-layout prose grid max-w-none [&>*]:col-start-2">
        {children}
      </div>
      <footer className="grid-cols-layout grid [&>*]:col-start-2">
        <FaGithub />
      </footer>
    </div>
  );
}
