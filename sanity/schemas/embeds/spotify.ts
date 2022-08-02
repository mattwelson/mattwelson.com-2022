import { FaSpotify as icon } from 'react-icons/fa'

export default {
  name: 'spotify',
  type: 'object',
  title: 'Spotify Embed',
  icon,
  fields: [
    {
      name: 'url',
      type: 'url',
      title: 'Spotify URL'
    }
  ]
}