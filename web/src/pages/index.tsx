import * as React from "react";
import { graphql, Link, PageProps } from "gatsby";
import Layout from "../components/layouts/layout";

const IndexPage = ({ data }: PageProps<Queries.GetRootPostsQuery>) => {
  const [firstPost, ...otherPosts] = data.allSanityPost.posts;
  return (
    <Layout>
      {/* TODO: Featured blog post */}
      <div>
        <Link to={`${firstPost.slug?.current}`}>
          <h1 className="font-serif text-xl font-bold">{firstPost.title}</h1>
        </Link>
      </div>
      {/* TODO: Blog posts */}
      <div>
        {otherPosts.map(({ title, id, slug }) => (
          <Link key={id} to={`${slug?.current}`}>
            <h2 className="font-serif text-lg font-bold">{title}</h2>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query GetRootPosts {
    allSanityPost {
      posts: nodes {
        ...SanityPostDetailsFull
      }
    }
  }
`;
