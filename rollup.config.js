import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { string } from 'rollup-plugin-string';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';
import copy from 'rollup-plugin-copy';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/slime-simulation.js',
      format: 'cjs',
      sourcemap: true
    },
    {
      file: 'dist/slime-simulation.esm.js',
      format: 'es',
      sourcemap: true
    },
    {
      file: 'dist/slime-simulation.umd.js',
      format: 'umd',
      name: 'SlimeSimulation',
      extend: true,
      globals: {
        'three': 'THREE'
      },
      sourcemap: true
    }
  ],
  plugins: [
    string({
      include: ['**/*.glsl', '**/shaders/**/*.glsl']
    }),
    json({
      include: ['**/shaders/**/*.json']
    }),
    resolve(),
    commonjs(),
    terser(),
    copy({
      targets: [
        { src: 'src/shaders/**/*', 
          dest: 'dist/shaders',
        }
      ]
    })
  ],
  external: ['three']
};