import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/widget.ts',
  output: {
    file: 'dist/widget.js',
    format: 'iife',
    sourcemap: false,
  },
  plugins: [
    typescript({ tsconfig: './tsconfig.json' }),
    terser(),
  ],
};
