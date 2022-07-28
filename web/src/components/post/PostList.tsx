import * as React from "react"
import { graphql, Link } from "gatsby"
import SanityImage from "gatsby-plugin-sanity-image"

const PostList = ({
  childPosts,
  childPostTitle,
  className = "",
}: {
  childPosts: Array<Queries.SanityPostDetailsListableFragment>
  childPostTitle: string
  className?: string
}) => {
  return (
    <div className={`${className} `}>
      <h3 className='my-4 font-sans text-lg'>{childPostTitle ?? "Related"}</h3>
      {childPosts.map((post) => (
        <Link
          to={post.fullSlug}
          className='mb-16 grid items-center gap-8 text-2xl font-bold md:grid-cols-[2fr_1fr]'
        >
          <SanityImage
            {...post.image}
            className='max-w-none md:-ml-8 md:w-[calc(100%+2rem)]'
          />
          <Link to={post.fullSlug}>{post.title}</Link>
        </Link>
      ))}
    </div>
  )
}

export default PostList

export const sanityPostDetailsListable = graphql`
  fragment SanityPostDetailsListable on SanityPost {
    id
    title
    childPostsTitle
    fullSlug
    image {
      caption
      ...ImageWithPreview
    }
  }
`
