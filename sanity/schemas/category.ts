export default {
    name: 'category',
    title: 'Category',
    type: 'document',
    hidden: true,
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
    ]
}