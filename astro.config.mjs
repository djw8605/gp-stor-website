import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

import astrowind from './vendor/integration';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
const repo = "https://github.com/djw8605/gp-stor-website";

export default defineConfig({
  site: 'https://djw8605.github.io/gp-stor-website',
  output: 'static',

  integrations: [
    starlight({
      title: 'GP-STOR',
      description: 'Great Plains Scalable Tiered Object Repository',
      logo: { 
        light: './src/assets/logo.png', 
        dark: './src/assets/logo-dark.png', 
        alt: 'GP-STOR', 
        replacesTitle: true 
      },
      social: [
        { icon: 'github', label: 'Github', href: repo }
      ],
      head: [
        {
          tag: 'meta',
          attrs: {
            name: 'theme-color',
            content: '#15422a',
          },
        },
        {
          tag: 'meta',
          attrs: {
            name: 'apple-mobile-web-app-status-bar-style',
            content: 'black-translucent',
          },
        },
        {
          tag: 'meta',
          attrs: {
            name: 'apple-mobile-web-app-title',
            content: 'GP-STOR',
          },
        },
      ],
      
      components: {
        Footer: './src/components/DocsFooter.astro',
      },
      editLink: {
        baseUrl: 'https://github.com/djw8605/gp-stor-website/edit/main/',
      },
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Overview', link: '/docs/overview' },
            { label: 'Quickstart', link: '/docs/quickstart' },
            { label: 'Access & Getting Started', link: '/docs/access' },
          ],
        },
        {
          label: 'Using GP-STOR',
          items: [
            { label: 'Mounting GP-STOR to Your Cluster', link: '/docs/connecting' },
          ],
        },
        {
          label: 'About',
          items: [
            { label: 'Team & Partners', link: '/docs/team' },
            { label: 'Training & Resources', link: '/docs/training' },
            { label: 'FAQ', link: '/docs/faq' },
            { label: 'Contact', link: '/docs/contact' },
          ],
        },
      ],
    }),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
    mdx(),
    icon({
      include: {
        tabler: ['*'],
        'flat-color-icons': ['*'],
      },
    }),
    astrowind({
      config: './src/config.yaml',
    }),
  ],

  vite: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  },
});