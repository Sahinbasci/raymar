import coreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'

const config = [
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'design-source/**',
      'playwright-report/**',
      'test-results/**',
      'next-env.d.ts',
    ],
  },
  ...coreWebVitals,
  ...nextTypescript,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      'no-console': ['error', { allow: ['warn', 'error'] }],
    },
  },
  {
    /*
     * Build and test tooling, not shipped code.
     *
     * `no-console` exists to keep stray logging out of the bundle — nothing in
     * `scripts/` is bundled, and both files there are command-line tools whose
     * entire output contract is stdout: the image optimizer reports what it
     * wrote, the static server reports the address it is listening on. Routing
     * those through `console.error` to satisfy a bundle rule would put ordinary
     * progress output on stderr.
     */
    files: ['scripts/**/*.mjs'],
    rules: {
      'no-console': 'off',
    },
  },
]

export default config
