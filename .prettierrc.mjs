/**
 * @type {import('prettier').Options}
 */
export default {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  bracketSpacing: true,
  bracketSameLine: false,
  importOrder: ['<THIRD_PARTY_MODULES>', '^[./]'],
  importOrderParserPlugins: ['decorators', 'typescript', 'jsx', 'tsx'],
  plugins: ['@ianvs/prettier-plugin-sort-imports']
}
