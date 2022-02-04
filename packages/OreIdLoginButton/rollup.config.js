import babel from "rollup-plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";
import svgr from "@svgr/rollup";
import image from "@rollup/plugin-image";
import json from "@rollup/plugin-json";

const pkg = require("./package.json");

export default {
  input: "./src/index.ts",
  output: [
    {
      name: pkg.name,
      sourcemap: true,
      // dir: './dist',
      file: pkg.main,
      format: "umd",
      globals: { react: "React" },
    },
  ],
  plugins: [
    nodeResolve(),
    peerDepsExternal(),
    svgr(),
    image(),
    babel({
      exclude: "node_modules/**",
      extensions: [".js", ".svg"],
    }),
    commonjs(),
    typescript(),
    json(),
  ],
  external: ["react", "react-dom"],
};
