const path = require('path');

module.exports = ({root}) => {
    return {
        module: {
            rules: [
                {
                    test: /\.hbs$/u,
                    use: [
                        {
                            loader: 'handlebars-loader',
                            options: {
                                inlineRequires: '(images|icons)/',
                                preventIndent: true,
                                rootRelative: path.join(root, 'src/'),
                            },
                        },
                    ],
                },
            ],
        },
    };
};
