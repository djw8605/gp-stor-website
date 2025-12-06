import path from 'path';
import { fileURLToPath } from 'url';

import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import icon from 'astro-icon';
import compress from 'astro-compress';
import starlight from '@astrojs/starlight';
import type { AstroIntegration } from 'astro';

import astrowind from './vendor/integration';

import { readingTimeRemarkPlugin, responsiveTablesRehypePlugin, lazyImagesRehypePlugin } from './src/utils/frontmatter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const hasExternalScripts = false;
const whenExternalScripts = (items: (() => AstroIntegration) | (() => AstroIntegration)[] = []) =>
  hasExternalScripts ? (Array.isArray(items) ? items.map((item) => item()) : [items()]) : [];

export default defineConfig({
  output: 'static',
  site: 'https://djw8605.github.io/gp-stor-website/',

  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
    mdx(),
    icon({
      include: {
        tabler: ['*'],
        mdi: ['*'],
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
        { icon: 'github', label: 'Github', href: 'https://github.com/djw8605/gp-stor-website'}
      ],
      customCss: ['./src/styles/global.css', './src/assets/landing.css'],
      editLink: {
        baseUrl: 'https://github.com/djw8605/gp-stor-website/edit/main/',
      },
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Overview', slug: 'docs/overview' },
            { label: 'Quickstart', slug: 'docs/quickstart' },
            { label: 'Access & Getting Started', slug: 'docs/access' },
          ],
        },
        {
          label: 'Using GP-STOR',
          items: [
            { label: 'Mounting GP-STOR to Your Cluster', slug: 'docs/connecting' },
          ],
        },
        {
          label: 'About',
          items: [
            { label: 'Team & Partners', slug: 'docs/team' },
            { label: 'Training & Resources', slug: 'docs/training' },
            { label: 'FAQ', slug: 'docs/faq' },
            { label: 'Contact', slug: 'docs/contact' },
          ],
        },
      ],
    }),

    ...whenExternalScripts(() =>
      partytown({
        config: { forward: ['dataLayer.push'] },
      })
    ),

    compress({
      CSS: true,
      HTML: {
        'html-minifier-terser': {
          removeAttributeQuotes: false,
        },
      },
      Image: false,
      JavaScript: true,
      SVG: false,
      Logger: 1,
    }),

    astrowind({
      config: './src/config.yaml',
    }),
  ],

  image: {
    domains: ['cdn.pixabay.com'],
  },

  markdown: {
    remarkPlugins: [readingTimeRemarkPlugin],
    rehypePlugins: [responsiveTablesRehypePlugin, lazyImagesRehypePlugin],
  },

  vite: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  },
});
