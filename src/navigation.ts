import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Community',
      links: [
        {
          text: 'People',
          href: getPermalink('/people'),
        },
      ],
    },
    {
      text: 'Blog',
      href: getBlogPermalink(),
    },
    {
      text: 'Events',
      href: getPermalink('/events'),
    },
    {
      text: 'Docs',
      href: getPermalink('/docs'),
    },
  ],
};

export const footerData = {
  links: [
    {
      title: 'Information',
      links: [
        { text: 'Getting Started', href: '/docs/overview' },
        { text: 'Contact', href: '/contact' },
    ],
    },
  ],
  secondaryLinks: [
    { text: 'NSF Award #2502799', href: "https://www.nsf.gov/awardsearch/show-award?AWD_ID=2502799" },
  ],
  socialLinks: [
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
  footNote: `
  <div class="flex items-center justify-between gap-5">
  <!-- NSF Logo -->
  <div class="flex items-center">
    <img
      src="/images/nsf-logo.png" 
      alt="NSF Logo"
      class="h-20 w-20 object-contain"
    />
  </div>

  <!-- Footer Text -->
  <div class="text-sm text-gray-600 dark:text-gray-400">
    This work was supported in part by National Science Foundation (NSF) award OAC-2502799.
  </div>
</div>

    
  `,
};
