const importExtensions = ['js', 'jsx', 'ts', 'tsx', 'json'];
const importDotExtensions = importExtensions.map(ext => `.${ext}`);
// react & vue shared native eslint rules or common plugin rules
const sharedRules = {
    'indent': [
        'error',
        4,
        {
            SwitchCase: 1,
            flatTernaryExpressions: false,
            offsetTernaryExpressions: false,
            ignoreComments: false
        }
    ],
    'linebreak-style': [
        'error',
        'unix'
    ],
    'quotes': [
        'error',
        'single',
        'avoid-escape'
    ],
    'quote-props': [
        'error',
        'consistent-as-needed'
    ],
    'semi': [
        'error',
        'always'
    ],
    'no-trailing-spaces': [
        'error',
        {
            ignoreComments: true
        }
    ],
    'arrow-parens': [
        'error',
        'as-needed'
    ],
    'arrow-spacing': 'error',
    'no-multiple-empty-lines': [
        'error',
        {
            max: 1
        }
    ],
    'comma-spacing': [
        'error',
        {
            before: false,
            after: true
        }
    ],
    'keyword-spacing': [
        'error'
    ],
    'space-infix-ops': [
        'error'
    ],
    'no-multi-spaces': [
        'error',
        {
            ignoreEOLComments: true
        }
    ],
    'comma-dangle': [
        'error',
        {
            arrays: 'never',
            objects: 'only-multiline',
            imports: 'never',
            exports: 'never',
            functions: 'never'
        }
    ],
    'callback-return': [
        'error',
        [
            'callback',
            'cb',
            'next'
        ]
    ],
    'array-callback-return': [
        'error',
        {
            allowImplicit: true,
            checkForEach: false
        }
    ],
    'no-underscore-dangle': [
        'error',
        {
            allow: [
                '_doc',
                '_id'
            ],
            allowAfterThis: false,
            allowAfterSuper: false,
            allowAfterThisConstructor: false,
            enforceInMethodNames: false,
            allowFunctionParams: true
        }
    ],
    'eol-last': [
        'error',
        'always'
    ],
    'switch-colon-spacing': [
        'error',
        {
            after: true,
            before: false
        }
    ],
    'block-spacing': [
        'error',
        'never'
    ],
    'object-curly-spacing': [
        'error',
        'never'
    ],
    'key-spacing': [
        'error',
        {
            beforeColon: false,
            afterColon: true
        }
    ],
    'padding-line-between-statements': [
        'error',
        {
            blankLine: 'always',
            prev: '*',
            next: 'return'
        },
        {
            blankLine: 'always',
            prev: 'block-like',
            next: '*'
        }
    ],
    'padded-blocks': [
        'error',
        {
            blocks: 'never',
            classes: 'always',
            switches: 'never'
        }
    ],
    'no-console': ['error'],
    // vue@3 + typescript 省略.vue比较麻烦，降级为warn
    'import/extensions': ['warn', 'ignorePackages', Object.fromEntries(importExtensions.map(ext => [ext, 'never']))],
    // 忽略各子项目 src/** 的引用，也可以参考spa/oa/.eslintrc.js配置 moduleDirectory
    'import/no-unresolved': ['error', { ignore: ['^src', '^server'] }],
    //对import xx from xxx 排序
    //ref: https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
    'import/order': [
        'error',
        {
            'groups': [
                'builtin',
                'external',
                'internal',
                'parent',
                'sibling',
                'index',
                'object',
                'type',
                'unknown'
            ],
            'alphabetize': {
                order: 'asc',
                caseInsensitive: true
            },
            'newlines-between': 'always',
            'pathGroups': [
                {
                    pattern: '@shared/**',
                    group: 'internal',
                    position: 'before'
                },
                {
                    pattern: 'src/**',
                    group: 'internal',
                    position: 'before'
                },
                {
                    pattern: 'server/**',
                    group: 'internal',
                    position: 'before'
                }
            ],
            'pathGroupsExcludedImportTypes': ['@shared', 'src', 'server']
        }
    ]
};

const reactRules = {
    'react/prop-types': 'off',
    'react/display-name': 'warn',
    'react/jsx-key': 'warn',
    'react/jsx-indent': ['error', 4],
    'react/jsx-indent-props': ['error', 4],
    'react/jsx-first-prop-new-line': 'error',
    'react/jsx-max-props-per-line': 'error',
    'react/jsx-closing-bracket-location': 'error',
    'react/no-unknown-property': ['error', { ignore: ['sx'] }]
};

module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    globals: {
        __STAGE__: 'readonly'
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',

        // extends react
        'plugin:react/recommended',
        // disable react/react-in-jsx-scope
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended'
    ],
    parser: '@typescript-eslint/parser',
    // TODO type-linting
    // ref: https://typescript-eslint.io/docs/getting-started/linting/type-linting
    parserOptions: {},
    plugins: [
        '@typescript-eslint',
        'import',

        // react plugins
        'react',
        'react-hooks'
    ],
    settings: {
        'react': {
            version: 'detect'
        },
        'import/resolver': {
            node: {
                extensions: importDotExtensions
            },
            typescript: {
                // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
                alwaysTryTypes: true,
                // Multiple tsconfigs (Useful for monorepos)
                project: [
                    'packages/*/tsconfig.json'
                ]
            },
            alias: {
                map: [],
                extensions: importDotExtensions
            }
        },
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx']
        }
    },
    overrides: [
        {
            files: ['**/server/**', 'shared/frontend/config/**'],
            rules: {
                'no-console': 'warn',
                'no-underscore-dangle': 'warn'
            }
        }
    ],
    rules: {
        ...sharedRules,
        ...reactRules,
        '@typescript-eslint/member-delimiter-style': [
            'error',
            {
                multiline: {
                    delimiter: 'none', // 'none' or 'semi' or 'comma'
                    requireLast: false
                },
                singleline: {
                    delimiter: 'semi', // 'semi' or 'comma'
                    requireLast: false
                }
            }
        ],
        '@typescript-eslint/no-this-alias': [
            'error',
            {
                allowedNames: [
                    'self',
                    'vm'
                ]
            }
        ],
        '@typescript-eslint/no-empty-function': 'warn',
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/no-explicit-any': 'off',
        // callback-return deprecated，并且对koa middleware确实不友好
        // ref: https://eslint.org/docs/rules/callback-return
        'callback-return': 'warn',
    }
};
