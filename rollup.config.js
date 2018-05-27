import babel from 'rollup-plugin-babel'
import eslint from 'rollup-plugin-eslint'

export default {
  input: 'src/render.js',
  output: {
    file: 'index.js',
    format: 'cjs',
    sourceMap: 'inline',
  },
  plugins: [
    eslint({
      exclude: []
    }),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true
    }),
  ],
}