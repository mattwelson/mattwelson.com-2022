import * as React from "react"

// text-emerald-500
// TODO: Workout how to make this a switch that contains the full text
function getColour(colour: string, prefix = "text-") {
  return `${prefix}${colour}-500`
}

// TODO: Move to own file
// TODO: Link to category OR link to ancestor, depending on what is rendered - more logic!
const CategorySubtitle = ({
  post,
}: {
  post: Queries.SanityPostDetailsFeaturableFragment
}) => {
  return (
    <h3
      className={`text-lg font-bold ${getColour(
        post?.ancestorPost.category.colour
      )}`}
    >
      {post?.category?.title ?? post.ancestorPost.title}
    </h3>
  )
}

export default CategorySubtitle
