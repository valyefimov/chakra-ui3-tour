import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  tsconfig: './tsconfig.build.json',
  external: ['react', 'react-dom', '@chakra-ui/react', '@chakra-ui/popper'],
});
