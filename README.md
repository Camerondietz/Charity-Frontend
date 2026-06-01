# Charity-Frontend

The frontend web app for a charity organization



\# American Society Foundation — Static Site



A complete frontend-only website for a civic charity. No backend, no build step.

Pure HTML, CSS, vanilla JS, and JSON data files. Ready for GitHub Pages.



\---



\## Quick start



```bash

\# Just open index.html in a browser, OR run a tiny local server:

python -m http.server 8000

\# then visit http://localhost:8000

```



A local server is recommended over `file://` because the site uses `fetch()` to load JSON.





\### Add a new article / news analysis



Edit \*\*`data/articles.json`\*\* and append an item to the `articles` array:



```json

{

&#x20; "id": "unique-slug",

&#x20; "title": "Your headline",

&#x20; "slug": "unique-slug",

&#x20; "date": "2026-05-12",

&#x20; "category": "Principles",

&#x20; "summary": "One-sentence summary shown on the listing.",

&#x20; "body": \[

&#x20;   "First paragraph.",

&#x20;   "Second paragraph.",

&#x20;   "Third paragraph."

&#x20; ]

}

```



It will appear automatically on the homepage (latest 3) and on `articles.html`.

The article detail page is `article.html?id=<your-id>`.



\### Add or change a value / principle / safety tip



\- \*\*Values\*\* → `data/values.json`

\- \*\*Moral principles + logic principles\*\* → `data/principles.json`

&#x20; (two arrays: `moral` and `logic`)

\- \*\*Safety tips\*\* → `data/safety-tips.json`

&#x20; (each top-level key — `elderly`, `children`, `general` — is rendered as a section;

&#x20; add a new key to add a new section automatically)



\### Edit page copy



Each page is a plain `.html` file. Open it, edit the `<main>` section, save. Done.



\### Change colors, fonts, or spacing



Edit the CSS custom properties at the top of \*\*`css/styles.css`\*\*:



```css

:root {

&#x20; --color-bg:        #faf8f3;   /\* warm cream background \*/

&#x20; --color-navy:      #0f1729;   /\* primary dark \*/

&#x20; --color-accent:    #b8893c;   /\* antique gold \*/

&#x20; --font-serif:      'Cormorant Garamond', Georgia, serif;

&#x20; --font-sans:       -apple-system, 'Inter', sans-serif;

}

```



Everything else is built from those tokens.



\### Add a new page



1\. Copy any existing inner page (e.g. `living.html`) as a template.

2\. Update the `<title>`, `<meta name="description">`, and `<link rel="canonical">`.

3\. Replace the `<main>` content.

4\. Add the new page to the nav `<ul class="nav-links">` in \*\*every\*\* HTML file

&#x20;  (search-and-replace the nav block; or, when you have many pages, it's the one

&#x20;  place templating would help).

5\. Add it to `sitemap.xml`.



\### Replace the placeholder logo / favicon



The current logo is a CSS/SVG mark (a navy square with a gold "C"). To replace:



\- Drop your logo into `assets/` (e.g. `assets/logo.svg`).

\- Replace the inline `<svg class="brand\_\_mark">` markup in each HTML file.

\- Update the `<link rel="icon">` to point at your file:

&#x20; `<link rel="icon" href="assets/favicon.svg" />`



\---



\## File map



```

charity-site/

├── index.html              Home

├── about.html              About / mission

├── history.html            How we got here

├── present.html            Where we are at (gov, law, rights)

├── future.html             Where we want to go (vision)

├── principles.html         Moral principles + logic

├── living.html             Framework for living

├── safety.html             Safety guides for vulnerable populations

├── articles.html           Insights index

├── article.html            Single-article reader (?id=…)

├── 404.html

│

├── css/styles.css          Full design system, single file

├── js/main.js              Mobile nav, reveal-on-scroll, active link

├── js/data-loader.js       Fetches JSON, renders templates

│

├── data/site.json          Charity name, tagline, URLs

├── data/values.json        Inherited values (homepage + about)

├── data/principles.json    Moral + logic principles

├── data/safety-tips.json   Safety guides

├── data/articles.json      All articles / news analysis

│

├── assets/                 Add images, logos, etc. here

├── sitemap.xml

├── robots.txt

├── .nojekyll

└── README.md

```



\---



\## Design notes



\- \*\*Type\*\*: Cormorant Garamond (classical serif) for headlines + Inter (modern sans) for body. Loaded from Google Fonts.

\- \*\*Palette\*\*: warm cream paper, federal navy, antique gold accents — classical institutional feel softened with Apple-style whitespace.

\- \*\*Motion\*\*: subtle fade-and-rise reveals on scroll. Respects `prefers-reduced-motion`.

\- \*\*Accessibility\*\*: skip link, semantic landmarks, `aria-` labels on nav, focusable controls. Color contrast checked against WCAG AA.



\## SEO checklist (already done)



\- Per-page `<title>` and `<meta name="description">`

\- `<link rel="canonical">` on each page

\- Open Graph + Twitter card tags

\- JSON-LD organization schema on the homepage

\- `sitemap.xml` and `robots.txt`

\- Semantic HTML structure

\- Mobile responsive



Before you launch, search-and-replace `https://better-society.org` across the site

with your real production domain if it changes. The relevant files are:



\- every `\*.html` (canonical, og:url, JSON-LD)

\- `sitemap.xml`

\- `robots.txt`

\- `data/site.json`



\---



\## License \& content notes



The American Society Foundation name and copy in this scaffold can be replaced

with your final branding at any time. The structural code

(HTML/CSS/JS) is yours to do whatever you want with.



