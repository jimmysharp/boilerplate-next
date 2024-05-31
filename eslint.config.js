import eslint from '@eslint/js';
import next from '@next/eslint-plugin-next';
import love from 'eslint-config-love';
import prettier from 'eslint-config-prettier';
import compat from 'eslint-plugin-compat';
import importX from 'eslint-plugin-import-x';
import a11y from 'eslint-plugin-jsx-a11y';
import preferArrow from 'eslint-plugin-prefer-arrow-functions';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import testingLibrary from 'eslint-plugin-testing-library';
import vitest from 'eslint-plugin-vitest';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  {
    rules: {
      'no-console': 'error',
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  // TypeScript
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  love,
  {
    rules: {
      // Reactにそぐわないルールの変更
      'no-nested-ternary': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: false,
        },
      ],
      '@typescript-eslint/triple-slash-reference': [
        'error',
        {
          types: 'always',
        },
      ],
      '@typescript-eslint/no-confusing-void-expression': [
        'error',
        {
          ignoreArrowShorthand: true,
          ignoreVoidOperator: true,
        },
      ],
      // typeを強制
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      // React Queryなどで使いづらいため無効化
      '@typescript-eslint/promise-function-async': 'off',
      // Reactの記法上辛いので無効化
      '@typescript-eslint/strict-boolean-expressions': 'off',
    },
  },
  // JavaScript
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    ...tseslint.configs.disableTypeChecked,
  },
  // import
  {
    plugins: {
      'import-x': importX,
    },
    settings: {
      'import-x/extensions': ['.js', '.jsx', '.ts', '.tsx'],
      'import-x/parsers': {
        '@typescript-eslint/parser': ['.js', '.jsx', '.ts', '.tsx'],
      },
      'import-x/resolver': {
        typescript: true,
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
    rules: {
      ...importX.configs.recommended.rules,
      ...importX.configs.typescript.rules,
      // 拡張子無しのimportを許可
      'import-x/extensions': [
        'error',
        {
          ignorePackages: true,
          pattern: {
            js: 'never',
            jsx: 'never',
            ts: 'never',
            tsx: 'never',
          },
        },
      ],
      // import順の強制
      'import-x/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
          ],
          pathGroups: [
            {
              pattern: './*.{css,scss,sass,less}',
              group: 'index',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: {
            order: 'asc',
          },
        },
      ],
      // named exportを強制
      'import-x/prefer-default-export': 'off',
      'import-x/no-default-export': 'error',
    },
  },
  // arrow functionの強制
  {
    plugins: {
      'prefer-arrow-functions': preferArrow,
    },
    rules: {
      'prefer-arrow-functions/prefer-arrow-functions': [
        'error',
        {
          disallowPrototype: true,
          singleReturnOnly: false,
          classPropertiesAllowed: true,
        },
      ],
    },
  },
  // a11y
  {
    plugins: {
      'jsx-a11y': a11y,
    },
    rules: {
      ...a11y.configs.recommended.rules,
    },
  },
  // React
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      // TypeScriptにそぐわないルールの変更
      'react/prop-types': 'off',
      'react/require-default-props': 'off',
      // arrow functionの強制
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unNamedComponents: 'arrow-function',
        },
      ],
    },
  },
  // Next.js
  {
    plugins: {
      '@next/next': next,
    },
    rules: {
      ...next.configs.recommended.rules,
    },
  },
  // Next.js Router
  {
    files: ['src/{pages,app}/**/*.{ts,tsx}'],
    rules: {
      'import/no-default-export': 'off',
    },
  },
  // Storybook
  {
    files: ['*.{story,stories}.{ts,tsx}'],
    rules: {
      'import/no-default-export': 'off',
      '@typescript-eslint/consistent-type-assertions': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
    },
  },
  // Vitest / Testing Library
  {
    files: ['**/*.{test,spec}.{ts,tsx}'],
    plugins: {
      vitest,
      'testing-library': testingLibrary,
    },
    rules: {
      ...vitest.configs.recommended.rules,
      ...testingLibrary.configs.react.rules,
    },
  },
  // Type definitions
  {
    files: ['*.d.ts'],
    rules: {
      '@typescript-eslint/consistent-type-assertions': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
    },
  },
  // config files
  {
    files: ['*.config.{js,ts}', '*rc.js'],
    rules: {
      'import-x/no-default-export': 'off',
      'import-x/no-named-as-default-member': 'off',
    },
  },
  // Public
  {
    files: ['public/**/*.js'],
    ...compat.configs['flat/recommended'],
  },
  // prettier
  prettier,
  // ignore
  {
    ignores: [
      'node_modules/',
      '.pnpm-store/',
      '.next/',
      'coverage/',
      'storybook-static/',
    ],
  }
);
