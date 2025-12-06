import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';

import astrowind from './vendor/integration';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
// Dynamically set the base path for GitHub Pages project sites when running in CI.
// This ensures assets and links work at https://<owner>.github.io/<repo>/.
const repo = "https://github.com/djw8605/gp-stor-website";
const isCI = process.env.GITHUB_ACTIONS === 'true';

export default defineConfig({
  output: 'static',
  
  integrations: [
    starlight({
      title: 'GP-STOR',
      description: 'Great Plains Scalable Tiered Object Repository',
      logo: { light: './src/assets/logo.png', dark: './src/assets/logo-dark.png', alt: 'GP-STOR', replacesTitle: true },
      social: {
        github: repo
      },
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
      customCss: ['./src/styles/global.css', './src/assets/landing.css'],
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
            { label: 'Overview', link: 'documentation/overview/' },
            { label: 'Quickstart', link: 'documentation/quickstart/' },
            { label: 'Access & Getting Started', link: 'documentation/access/' },
          ],
        },
        {
          label: 'Using GP-STOR',
          items: [
            { label: 'Mounting GP-STOR to Your Cluster', link: 'documentation/connecting/' },
          ],
        },
        {
          label: 'About',
          items: [
            { label: 'Team & Partners', link: 'documentation/team/' },
            { label: 'Training & Resources', link: 'documentation/training/' },
            { label: 'FAQ', link: 'documentation/faq/' },
            { label: 'Contact', link: 'documentation/contact/' },
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
        'flat-color-icons': [
          'template',
          'gallery',
          'approval',
          'document',
          'advertising',
          'currency-exchange',
          'voice-presentation',
          'business-contact',
          'database',
        ],
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