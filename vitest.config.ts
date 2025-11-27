import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

const workspaceRoot = dirname(fileURLToPath(import.meta.url));

export default mergeConfig(
  viteConfig,
  defineConfig({
    resolve: {
      alias: [
        { find: 'chakra-ui3-tour', replacement: resolve(workspaceRoot, 'src/index.ts') },
        { find: 'chakra-ui3-tour/', replacement: resolve(workspaceRoot, 'src/') },
      ],
    },
    test: {
      globals: true,
      environment: 'jsdom',
      environmentOptions: {
        jsdom: {
          url: 'http://localhost',
        },
      },
      setupFiles: './vitest.setup.ts',
      css: true,
    },
  }),
);
