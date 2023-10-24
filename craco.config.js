const { CracoAliasPlugin } = require('react-app-alias');

module.exports = {
    plugins: [
        {
            plugin: CracoAliasPlugin,
            options: {
                source: 'tsconfig',
                baseUrl: '.',
                tsConfigPath: './tsconfig.json',
            },
        },
    ],
    webpack: {
        alias: {
            '@mui/styled-engine': '@mui/styled-engine-sc',
        },
    },
};
