import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  tsconfig: './tsconfig.build.json',
  external: [
    'react',
    'react-dom',
    '@chakra-ui/react',
    '@chakra-ui/anatomy',
    '@chakra-ui/icons',
    '@chakra-ui/popper',
    '@chakra-ui/styled-system',
    '@chakra-ui/theme-tools',
    '@chakra-ui/utils',
    '@chakra-ui/react-use-controllable-state',
  ],
});
