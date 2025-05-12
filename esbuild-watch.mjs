import * as esbuild from 'esbuild'

let ctx = await esbuild.context({
  entryPoints: ['index.jsx'],
  bundle: true,
  outdir: 'dist',
})

await ctx.watch()

let { host, port } = await ctx.serve({
  servedir: './',
})