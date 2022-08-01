import { Link } from "gatsby";
import React from "react";
import { PortableTextMarkComponentProps } from "@portabletext/react";

const LinkInline: React.FunctionComponent<
  PortableTextMarkComponentProps<any>
> = ({ value, children }) => {
  const isLocal = !(value?.href || "").startsWith("http");
  if (isLocal)
    return (
      <Link
        to={value?.href || ""}
        className="font-semibold text-blue-700 underline"
      >
        {children}
      </Link>
    );
  return (
    <a
      href={value?.href}
      target="_blank"
      rel="noopener nofollow noindex"
      className="font-semibold text-blue-700 underline"
    >
      {children}
    </a>
  );
};

export default LinkInline;
