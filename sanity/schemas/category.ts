import { FaFolderOpen as icon } from 'react-icons/fa'

export default {
    name: 'category',
    title: 'Category',
    type: 'document',
    hidden: true,
    icon,
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string'
        },
        {
            name: 'colour',
            title: 'Colour',
            type: 'string',
            options: {
                list: ['slate', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal',
                    'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose']
            },
            initialValue: 'slate'
        }
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'colour'
        }
    }
}