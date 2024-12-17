import eslint from '@eslint/js'
import typescriptParser from '@typescript-eslint/parser'
import prettierConfig from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import prettier from 'eslint-plugin-prettier'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tailwindcss from 'eslint-plugin-tailwindcss'
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
  {
    // このオブジェクトは ignores プロパティだけにする必要あり
    ignores: ['dist', '.next'], // ESLint のチェック除外 (node_modules と .git はデフォルトで対象外)
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      parser: typescriptParser,
      globals: globals.browser,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      tailwindcss: tailwindcss,
      'unused-imports': unusedImports,
      import: importPlugin,
      prettier: prettier,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-hooks/rules-of-hooks': 'error',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'unused-imports/no-unused-imports': 'off', // 自動削除を無効化
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      'no-unused-vars': 'off',
      'no-undef': 'off',

      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling'],
            'object',
            'type',
            'index',
          ],
          // パスでグループ化する
          pathGroups: [
            {
              pattern: '@/**',
              group: 'parent',
              position: 'before', // groupに対しての相対的な位置
            },
          ],
          // pathGroupsによって処理されないインポートタイプを指定
          pathGroupsExcludedImportTypes: [
            'builtin',
            'external',
            'object',
            'type', // "type" importは'@/**'に該当しても最後に配置される
          ],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'always', // グループ毎に改行を入れる
        },
      ],

      'prettier/prettier': [
        'warn',
        {
          // Prettierの設定（オプションを追加できます）
        },
      ],
      'tailwindcss/classnames-order': 'off', // クラス名のソートは prettier-plugin-tailwindcss に任せる
      'tailwindcss/no-custom-classname': 'off',
    },
  },
  prettierConfig, // フォーマット は Prettier で行うため、フォーマット関連のルールを無効化
]
