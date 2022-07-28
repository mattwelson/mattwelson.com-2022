import * as React from "react"
import { graphql, PageProps } from "gatsby"
import { PortableText } from "@portabletext/react"
import Layout from "./layout"
import HeroSection from "../post/HeroSection"

const PostLayout = ({
  data: { sanityPost },
}: PageProps<Queries.GetPostQuery>) => {
  if (!sanityPost) return "Ooops no post!"
  return (
    <Layout>
      <div className='mt-16' />
      <HeroSection post={sanityPost} />
      <PortableText value={sanityPost._rawContent} />
      <h2 className='font-serif text-lg font-bold'>
        {sanityPost.childPostsTitle}
      </h2>
    </Layout>
  )
}

export default PostLayout

export const query = graphql`
  fragment SanityPostDetailsFull on SanityPost {
    id
    title
    image {
      caption
      ...ImageWithPreview
    }
    ancestorPost {
      title
      category {
        title
        colour
      }
    }
    parentPost {
      title
    }
    childPostsTitle
    fullSlug
    category {
      title
    }
    _rawContent
  }

  query GetPost($id: String!) {
    sanityPost(id: { eq: $id }) {
      ...SanityPostDetailsFull
      childPosts {
        ...SanityPostDetailsListable
        childPosts {
          ...SanityPostDetailsListable
        }
      }
    }
  }
`
