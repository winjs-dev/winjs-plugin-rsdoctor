import { defineConfig } from '@winner-fed/winjs';

export default defineConfig({
  plugins: ['../dist'],
  presets: ['@winner-fed/preset-vue'],
  // rsbuild: {},
  vite: {},
  rsdoctor: {
    disableClientServer: false
  },
});
