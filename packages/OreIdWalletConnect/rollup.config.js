import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import sass from 'rollup-plugin-sass'
// import copy from "rollup-plugin-copy";

export default {
  input: ['src/index.ts'],
  output: [
    {
      dir: 'build',
      format: 'cjs',
      sourcemap: true,
    },
  ],
  preserveModules: true, // Important if we want to code split
  plugins: [
    peerDepsExternal(),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    sass({
      insert: true,
    }),
  ],
}
