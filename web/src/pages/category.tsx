import * as React from "react";
import { graphql, Link, PageProps } from "gatsby";
import Layout from "../components/layouts/layout";
import { getColour } from "../components/post/CategorySubtitle";

const CategoryPage = ({
  data: { allSanityCategory },
}: PageProps<Queries.GetAllCategoryQuery>) => {
  if (!allSanityCategory) return "Something weird has happened!";
  // TODO: sort posts by created date desc
  return (
    <Layout>
      <div className="mt-16" />

      <h1 className={`font-semibold uppercase text-slate-400`}>Categories</h1>
      <div className="mb-4 h-0.5 w-8 bg-slate-400"></div>
      {allSanityCategory.categories?.map(({ title, fullSlug, colour }) => (
        <Link to={fullSlug}>
          <h2
            className={`mb-4 text-3xl font-bold sm:text-4xl md:text-6xl ${getColour(
              colour
            )}`}
          >
            {title}
          </h2>
        </Link>
      ))}
    </Layout>
  );
};

export default CategoryPage;

export const query = graphql`
  query GetAllCategory {
    allSanityCategory {
      categories: nodes {
        fullSlug
        title
        colour
      }
    }
  }
`;
