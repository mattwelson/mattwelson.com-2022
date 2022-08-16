import { FaYoutube as icon } from 'react-icons/fa'

export default {
    name: 'youtube',
    type: 'object',
    title: 'YouTube Embed',
    icon,
    fields: [
        {
            name: 'url',
            type: 'url',
            title: 'YouTube video URL'
        }
    ]
}