import commonjs from '@rollup/plugin-commonjs';
import image from '@rollup/plugin-image';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import svgr from '@svgr/rollup';
import postcssUrl from "postcss-url";
import babel from 'rollup-plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import { terser } from "rollup-plugin-terser";
import typescript from 'rollup-plugin-typescript2';

const pkg = require('./package.json');

const options = {
  url: 'inline'
}

export default {
  input: './src/index.ts',
  output: [
    {
      name: pkg.name,
      sourcemap: true,
      // dir: './dist',
      file: pkg.main,
      format: 'umd',
      globals: { react: 'React' },

    },
  ],
  plugins: [
    nodeResolve(),
    peerDepsExternal(),
    postcss({
      extract: false,
      modules: true,
      plugins: [
        postcssUrl(options)
      ],
      use: ['sass'],
    }),
    svgr(),
    image(),
    babel({
      exclude: "node_modules/**", extensions: ['.js', '.svg'],
    }),
    commonjs(),
    typescript({ tsconfig: "./tsconfig.json", allowJs: true }), ,
    json(),
    terser()
  ],
  external: ['react', 'react-dom'],
};