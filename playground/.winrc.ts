import { defineConfig } from '@winner-fed/winjs';

export default defineConfig({
  plugins: ['../src/index.ts'],
  presets: ['@winner-fed/preset-vue'],
  rsbuild: {},
  // vite: {},
  rsdoctor: {
    disableClientServer: false
  },
});
