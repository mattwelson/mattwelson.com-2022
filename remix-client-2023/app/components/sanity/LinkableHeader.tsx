import * as React from "react";
import { toPlainText } from "@portabletext/react";
import { PortableTextBlock } from "@portabletext/types";
import slugify from "slugify";
import { FaLink } from "react-icons/fa";
import { Link } from "@remix-run/react";

const LinkableHeader =
  (Header: "h1" | "h2" | "h3" | "h4" | "h5" | "h6", className: string) =>
  ({
    children,
    value,
  }: {
    children?: React.ReactNode;
    value?: PortableTextBlock;
  }) => {
    const headerId = slugify(toPlainText(value!), { lower: true });
    return (
      <Link
        to={`#${headerId}`}
        className="group flex items-center gap-2 no-underline"
      >
        <Header id={headerId} className={className}>
          {children}
        </Header>
        <FaLink className="text-slate-500 opacity-50 duration-200 ease-in-out group-hover:opacity-100" />
      </Link>
    );
  };

export default LinkableHeader;
