import { FaInstagram as icon } from 'react-icons/fa'

export default {
    name: 'instagrampost',
    title: 'Instagram Post',
    type: 'document',
    icon,
    fields: [
        {
            name: 'url',
            title: 'Url',
            type: 'url'
        },
        {
            name: 'image',
            title: 'Image',
            type: 'metaimage',
        }
    ],
    preview: {
        select: {
            media: 'image',
            title: 'image.caption',
            subtitle: 'url'
        }
    }
}