# Institution logos

Provenance for the mark files in `public/images/logos/`.

Each mark is the institution's own **reversed (light-on-dark) variant**, taken from
the institution's own site. They are shown on the navy plate in
`src/components/InstitutionGrid.astro`, which is why the reversed variants are the
right ones — none of these four publish a version that works on both light and dark
grounds, but all four publish a reversed one.

| File | Source | Notes |
| --- | --- | --- |
| `unl.svg` | Inline header mark on <https://www.unl.edu/> (WDN template 6.1) | The primary "N". Extracted from the page's inline SVG, keeping only the highest-detail `n153` group; fills are UNL scarlet `#d00000` and cream `#fefdfa`, unchanged. |
| `usd.svg` | <https://www.usd.edu/-/media/Themes/USD/DotEdu/DotEdu/images/logo-white.svg> | The reversed horizontal signature ("SD" monogram + University of South Dakota). |
| `mizzou.svg` | <https://missouri.edu/themes/miz_missouri_edu_subtheme/images/MU_MizzouSig_rgb_White_Horiz.svg> | `MU_MizzouSig_rgb_White_Horiz` — the reversed horizontal Mizzou signature. |
| `gpn.png` | <https://www.greatplains.net/wp-content/uploads/2017/02/GPN_Logo-1.png> | GPN publishes only this one reversed PNG (no vector). Downscaled 1830px → 640px wide; not otherwise altered. |

No mark has been recolored, redrawn, or cropped. If an institution asks for a
different treatment, replace the file here and adjust that entry's `logoClass`
optical size in `src/pages/people.astro`.

Trademark note: these are third-party marks used to identify project partners.
Each university has its own brand/licensing policy (UNL licensing, USD Creative
Services, MU Licensing and Brand Management) — worth a confirming email if the
site becomes a public-facing NSF deliverable.
