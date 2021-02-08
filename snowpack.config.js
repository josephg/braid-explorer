const optimize = process.env.NODE_ENV === 'production' ? {
  bundle: true,
  minify: true,
  target: 'es2020'
} : {}

require('fs').writeFileSync('foo.json', JSON.stringify(optimize, null, 2))
// setTimeout(() => console.log('optimize', optimize), 100)

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: {url: '/', static: true},
    src: {url: '/dist'},
  },
  plugins: [
    '@snowpack/plugin-svelte',
    '@snowpack/plugin-typescript',
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize,
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
};
