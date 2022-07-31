import { FaPenFancy as icon } from 'react-icons/fa'

export default {
  name: "post",
  type: "document",
  title: "Post",
  icon,
  fieldsets: [
    {
      name: 'childPostGroup', title: 'Child Posts', options: {
        collapsible: true,
        collapsed: false
      }
    }],
  fields: [
    {
      name: "title",
      type: "string",
      title: "Post Title",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "A partial slug to be used for the post, joined together if the posts are nested.",
      options: {
        source: "title",
      },
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [
        { type: 'category' }
      ]
      // TODO: validation
      // TODO: Automatically initialise with category of parent
      // TODO: default to uncategorized?
    },
    {
      name: 'childPostsTitle',
      type: 'string',
      title: 'Title',
      description: 'The title to be shown next to groups of child posts',
      initialValue: 'Related',
      fieldset: 'childPostGroup'
    },
    {
      name: "childPosts",
      type: "array",
      title: "Posts",
      of: [
        {
          type: "reference",
          to: [
            {
              type: "post",
            },
          ],
          options: {
            // TODO: Add filter to only show unparented posts, and not itself. Example query
            /* *[_type=="post"]{
                ...,
                "parents": *[_type=='post' && references(^._id)]{ 
                  title
                }
              }[count(parents) == 0]
            */
          }
        },
      ],
      fieldset: 'childPostGroup'
    },
    {
      name: "image",
      title: "Image",
      type: "metaimage",
    },
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block",
        },
        {
          type: "metaimage",
        },
        {
          type: "imagecollection",
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      subtitle: 'category.title'
    }
  }
}
