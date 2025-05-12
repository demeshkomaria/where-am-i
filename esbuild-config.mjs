import * as esbuild from 'esbuild'

let result = await esbuild.build({
  entryPoints: ['index.jsx'],
  bundle: true,
  outdir: 'dist',
})
console.log(result)