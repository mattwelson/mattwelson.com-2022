import * as React from "react"
import { graphql, Link, PageProps } from "gatsby"

type PageData = {
  allSanityPost: {
    posts: Array<{
      title: string,
      id: string
    }>
  }
}

const IndexPage = ({ data }: PageProps<PageData>) => {
  const [firstPost, ...otherPosts] = data.allSanityPost.posts
  return (<div>
    <header>
      <div className="font-serif text-lg font-bold text-red-700">
        <Link to="/">Matt Welson</Link>
      </div></header>
    <main>
      {/* TODO: Featured blog post */}
      <div>
        <h1 className="font-bold text-xl font-serif">
          {firstPost.title}</h1>
      </div>
      {/* TODO: Blog posts */}
      <div>
        {otherPosts.map(({ title }) => <div>
          <h2 className="text-lg font-bold font-serif">{title}</h2></div>)}
      </div>
    </main>
  </div>
  )
}

export default IndexPage

export const query = graphql`
  {
    allSanityPost {
      posts: nodes {
        title
        id
      }
    }
  }
`