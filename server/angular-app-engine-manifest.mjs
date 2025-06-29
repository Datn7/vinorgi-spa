
export default {
  basePath: 'https://Datn7.github.io/vinorgi-spa',
  supportedLocales: {
  "en-US": ""
},
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
