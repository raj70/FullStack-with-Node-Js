module.exports = {
    parser: 'babel-eslint',
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
        jest: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        sourceType: 'module',
    },
    plugins: ['react'],
    rules: {
        // You can do your customizations here...
        // For example, if you don't want to use the prop-types package,
        // you can turn off that recommended rule with: 'react/prop-types': ['off']
        indent: ["error", 2, { SwitchCase: 1 }],
        "linebreak-style": ["error", "unix"],
        quotes: ["error", "single"],
        semi: ["error", "always"],
        "no-console": [
            "warn", {allow:["clear", "info", "error", "dir", "trace"]}
        ]
    },
};