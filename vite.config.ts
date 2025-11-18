import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

const workspaceRoot = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: 'chakra-ui3-tour', replacement: resolve(workspaceRoot, 'src/index.ts') },
      { find: 'chakra-ui3-tour/', replacement: resolve(workspaceRoot, 'src/') },
    ],
  },
});
