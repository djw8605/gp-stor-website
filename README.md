# GP-STOR Website

## Summary
The GP-STOR website is built using Astro and Starlight, providing a scalable tiered object repository. It includes documentation and resources for users to get started with GP-STOR.

## Project Structure
Inside the project, you'll find the following folders and files:

```
.
├── public/
├── src/
│   ├── assets/
│   ├── content/
│   │   └── docs/
├── astro.config.mjs
├── package.json
└── README.md
```

## Commands
All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |

## Building and Running Locally
To build the repository and run it locally, follow these steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/djw8605/gp-stor-website.git
   cd gp-stor-website
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:4321` to view the site.

---

> **Note:** For more information, refer to the documentation in the `src/content/docs/` directory.
