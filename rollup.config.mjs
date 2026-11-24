import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve as resolvePath } from 'node:path';

function copyToRootPlugin() {
  return {
    name: 'copy-to-root',
    writeBundle(options) {
      if (!options.file) return;
      const src = resolvePath(options.file);
      const dest = resolvePath('simple-pastel-weather-card.js');
      mkdirSync(dirname(dest), { recursive: true });
      copyFileSync(src, dest);
    },
  };
}

export default {
  input: 'src/simple-pastel-weather-card.ts',
  output: {
    file: 'dist/simple-pastel-weather-card.js',
    format: 'es',
    inlineDynamicImports: true,
  },
  plugins: [
    resolve({
      browser: true,
    }),
    typescript({
      tsconfig: './tsconfig.json',
    }),
    terser({
      format: {
        comments: false,
      },
    }),
    copyToRootPlugin(),
  ],
};
