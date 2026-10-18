import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 默认按“域名根目录”构建；GitHub Pages 项目站点会通过环境变量传入
// PUBLIC_SITE_URL=https://<user>.github.io
// PUBLIC_BASE_PATH=/<repo>
const site = (process.env.PUBLIC_SITE_URL || 'https://pawly.example.com').replace(/\/$/, '');
const rawBase = process.env.PUBLIC_BASE_PATH || '/';
const base = rawBase === '/' ? '/' : `/${rawBase.replace(/^\/+|\/+$/g, '')}`;

export default defineConfig({
  site,
  base,
  integrations: [sitemap()],
  build: {
    format: 'directory'
  },
  trailingSlash: 'always'
});
