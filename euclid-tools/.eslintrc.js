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
    // 忽略各子项目 src/** 的引用，也可以参考spa/oa/.eslintrc.js配置 moduleDirectory
    'import/no-unresolved': ['error', {ignore: ['^src', '^server']}],
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

module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    globals: {
        argv: 'readonly',
        $: 'readonly'
    },
    parserOptions: {
        ecmaVersion: 'latest'
    },
    extends: [
        'eslint:recommended',
        'plugin:import/recommended'
    ],
    plugins: [
        'import'
    ],
    settings: {
        'import/resolver': {
            node: {
                extensions: importDotExtensions
            },
            alias: {
                map: [],
                extensions: importDotExtensions
            }
        },
    },
    rules: {
        ...sharedRules,
        'no-console': 'warn',
        // callback-return deprecated，并且对koa middleware确实不友好
        // ref: https://eslint.org/docs/rules/callback-return
        'callback-return': 'warn',
    }
};
