import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
// Dynamically set the base path for GitHub Pages project sites when running in CI.
// This ensures assets and links work at https://<owner>.github.io/<repo>/.
const repo = "https://github.com/djw8605/gp-stor-website";
const isCI = process.env.GITHUB_ACTIONS === 'true';

export default defineConfig({
    // Set site URL for sitemap generation
    site: 'https://djw8605.github.io/gp-stor-website/',
    
    // If running in GitHub Actions and repo is available, prefix paths with /<repo>/
    // Otherwise default to root when developing locally.
  integrations: [
      starlight({
          title: 'GP-STOR',
          description: 'Great Plains Scalable Tiered Object Repository',
          logo: { light: './src/assets/logo.png', dark: './src/assets/logo-dark.png', alt: 'GP-STOR', replacesTitle: true },
          // Disable root index to avoid conflict with custom landing page
          disable404Route: false,
          social: [
              { icon: 'github', label: 'Github', href: repo}
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
                      { label: 'Overview', link: '/docs/overview/' },
                      { label: 'Quickstart', link: '/docs/quickstart/' },
                      { label: 'Access & Getting Started', link: '/docs/access/' },
                  ],
              },
              {
                  label: 'Using GP-STOR',
                  items: [
                      { label: 'Mounting GP-STOR to Your Cluster', link: '/docs/connecting/' },
                  ],
              },
              {
                  label: 'About',
                  items: [
                      { label: 'Team & Partners', link: '/docs/team/' },
                      { label: 'Training & Resources', link: '/docs/training/' },
                      { label: 'FAQ', link: '/docs/faq/' },
                      { label: 'Contact', link: '/docs/contact/' },
                  ],
              },
          ],
      }),
      sitemap(),
      icon(),
	],

  vite: {
    plugins: [tailwindcss()],
  },
});