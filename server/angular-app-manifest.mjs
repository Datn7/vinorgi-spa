
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://Datn7.github.io/vinorgi-spa',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/vinorgi-spa"
  },
  {
    "renderMode": 2,
    "route": "/vinorgi-spa/login"
  },
  {
    "renderMode": 2,
    "route": "/vinorgi-spa/register"
  },
  {
    "renderMode": 2,
    "route": "/vinorgi-spa/models"
  },
  {
    "renderMode": 2,
    "route": "/vinorgi-spa/ar-viewer"
  },
  {
    "renderMode": 2,
    "route": "/vinorgi-spa/profile"
  },
  {
    "renderMode": 2,
    "route": "/vinorgi-spa/glb-viewer"
  },
  {
    "renderMode": 2,
    "redirectTo": "/vinorgi-spa",
    "route": "/vinorgi-spa/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 916, hash: '708ecb804ba076f8335c9fb8f2e23e27c52aa74a375eea070473565c4ac48d50', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1434, hash: 'f83d6b19994078641d24b518391c9fd216c728f06e2fb7f2f36b81d8c1525e7c', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'glb-viewer/index.html': {size: 3967, hash: '8f6520b84056867a12f5792f2ac70b7504767544be4195acafb6b2aaae4a0dc2', text: () => import('./assets-chunks/glb-viewer_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 4216, hash: 'e6b75234cdb7d372440a7f69a758d23fe8c8a33a25de85cf4395fd326c5e357c', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'ar-viewer/index.html': {size: 3810, hash: 'bfa81e2475bcbcbd466cc4083f778123a51203f5b4ea2c61263a023dc755b051', text: () => import('./assets-chunks/ar-viewer_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 4416, hash: 'd3d75a34a1d890d87cd9329fde35bb86b6d653073238553c88498fb211babbb9', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'models/index.html': {size: 4696, hash: '6958d275d7fe8ffb26e708b03ec176ce3d12eeeeb0aa03d6441be2a412201e84', text: () => import('./assets-chunks/models_index_html.mjs').then(m => m.default)},
    'index.html': {size: 7042, hash: '1cecf01a9535e3010412546612425200cfaa2b44146f08c1bdb996abb3dd3219', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'profile/index.html': {size: 3788, hash: '89ebabe44c62a10167c9fc6531f1732ef0307d4d9da5294e787c4fe0277f73a5', text: () => import('./assets-chunks/profile_index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
