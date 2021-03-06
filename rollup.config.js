import typescript from 'rollup-plugin-typescript2';

export default {
  input: './src/ts/index.ts',
  output: [
    {
      file: 'dist/js/env-label.js',
      format: 'umd',
      name: 'EnvLabel',
    },
  ],
  plugins: [
    typescript(),
  ]
}
