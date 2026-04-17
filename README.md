# Ruxar Site — Blog System Guide

## How to Add a New Blog Article (Windows)

Publishing a new post takes about 5 minutes once you've written your content.
No build tools, no terminal, no Node.js. Just copy a file and edit it.

---

### Step 1 — Copy the Template

Go to `blog/posts/` and copy `_TEMPLATE.html`.
Rename the copy using a short, descriptive, lowercase-and-hyphen filename:

```
blog/posts/best-indie-games-under-5-dollars.html
blog/posts/how-to-improve-at-platformers.html
blog/posts/izbot-2-update-notes.html
```

**Good URL slug rules:**
- Lowercase only
- Words separated by hyphens
- No spaces, no underscores, no special characters
- Describe the article topic, not just the title

---

### Step 2 — Edit the HTML File

Open your new `.html` file in Notepad, Notepad++, or VS Code.
Follow the `<!-- STEP -->` comments inside the file. You need to update:

| What | Where in the file |
|------|-------------------|
| `<title>` tag | Line ~10 |
| `<meta name="description">` | Line ~11 |
| `<link rel="canonical">` | Replace `YOUR-ARTICLE-SLUG` with your filename (no `.html`) |
| `og:url`, `og:title`, `og:description` | OG meta tags |
| JSON-LD `"headline"`, `"description"`, `"datePublished"` | Script block |
| Article tag + date | `<div class="article-meta">` |
| `<h1>` title | The main heading |
| Intro paragraph | `<p class="article-intro">` |
| Body sections | `<h2>`, `<h3>`, `<p>` blocks |
| CTA box | `<div class="cta-box">` |

**Date format for `datetime` attribute:** `YYYY-MM-DD` (e.g. `2025-06-15`)  
**Date format displayed:** `June 15, 2025`

---

### Step 3 — Add It to the Blog Index

Open `blog/index.html` and add a new card inside `<div class="post-grid">`:

```html
<a href="posts/YOUR-ARTICLE-SLUG.html" class="blog-card">
  <div class="blog-card-tag">TAG</div>
  <h3>Your Article Title</h3>
  <p>A one or two sentence description of the article for the listing page.</p>
  <span class="blog-card-read">Read more →</span>
</a>
```

**Available tags:** `Lists` | `Opinion` | `Dev` | `Guide` | `News` | `Review`

---

### Step 4 — Add It to the Homepage Teaser (Optional)

If you want the article to appear in the "From the Dev Log" section on the homepage,
open `index.html` and update one of the three cards in `<div class="blog-teaser-grid">`.
Replace the oldest/least relevant card with your new one.

---

### Step 5 — Update the Sitemap

Open `sitemap.xml` and add a new `<url>` block before the closing comment:

```xml
<url>
  <loc>https://ruxar.com/blog/posts/YOUR-ARTICLE-SLUG.html</loc>
  <lastmod>YYYY-MM-DD</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

---

### Step 6 — Commit and Push to GitHub

```bash
git add .
git commit -m "Add blog post: Your Article Title"
git push
```

GitHub Pages will deploy automatically within ~1 minute.

---

## SEO Checklist for Every Article

Before publishing, confirm:

- [ ] `<title>` is unique and includes the primary keyword (under 60 characters)
- [ ] `<meta name="description">` is 140–160 characters, reads naturally
- [ ] `<link rel="canonical">` matches the actual URL
- [ ] `datePublished` in JSON-LD is accurate
- [ ] Article has at least one link to a Steam page (iZBOT or iZBOT 2)
- [ ] Article has at least one link to another article on ruxar.com (internal linking)
- [ ] Article is at least 600 words (longer is generally better for SEO)
- [ ] Filename/URL slug contains the main keyword
- [ ] Sitemap is updated with the new URL

---

## Article Ideas by SEO Category

**High search volume — general:**
- Best indie games under $5 on Steam
- Best platformer games for beginners
- Hardest platformer games on PC
- Best robot games on Steam
- Australian indie game developers

**Niche / long-tail (easier to rank):**
- Best precision platformers with controller support
- How to get better at platformer games
- Why pixel art games are still popular
- Best short games to play on lunch breaks
- iZBOT 2 tips and tricks

**Dev content (great for backlinks from dev communities):**
- How to market an indie game with no budget
- Choosing your Steam release date
- GameMaker studio tips for solo devs
- How to approach Let's Players for your indie game
- Post-launch update strategy for indie Steam games

---

---

## How to Add a Standalone Content Page

Use this for pages that live at their own URL (e.g. `ruxar.com/my-guide/`) rather than inside the blog.
Examples: topic guides, resource pages, landing pages.

### Step 1 — Create a new folder

In the root of the repo, create a new folder named with a lowercase hyphenated slug:

```
gamemaker-tips/
izbot-tips/
indie-dev-resources/
```

### Step 2 — Copy the template into it

Copy `_PAGE-TEMPLATE.html` from the root into your new folder and rename it `index.html`:

```
gamemaker-tips/index.html
```

The filename must be `index.html` so the URL is clean (`/gamemaker-tips/` not `/gamemaker-tips/page.html`).

### Step 3 — Edit the file

Open `index.html` in your editor and follow the `<!-- STEP -->` comments:

| What | Where |
|------|-------|
| `<title>` tag | Line ~13 |
| `<meta name="description">` | Line ~14 |
| `<link rel="canonical">` | Replace `YOUR-PAGE-SLUG` with your folder name |
| `og:url`, `og:title`, `og:description` | OG meta tags |
| JSON-LD `"headline"`, `"description"`, `"datePublished"` | Script block |
| Breadcrumb position 2 name and URL | Second JSON-LD script block |
| Article tag + date | `<div class="article-meta">` |
| `<h1>` title | Main heading |
| Intro paragraph | `<p class="article-intro">` |
| Body sections | `<h2>`, `<h3>`, `<p>` blocks |
| CTA box | `<div class="cta-box">` |
| Related reading links | `<div class="related-reading">` |

**Key difference from blog posts:** The CSS path is `../ruxar.css` (one level up, not two).

### Step 4 — Update the Sitemap

Open `sitemap.xml` and add a new `<url>` block:

```xml
<url>
  <loc>https://ruxar.com/YOUR-PAGE-SLUG/</loc>
  <lastmod>YYYY-MM-DD</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

### Step 5 — Link to it from somewhere

Standalone pages won't get traffic unless something links to them. Pick one or more:

- Add a card to the blog index (`blog/index.html`) pointing to `/YOUR-PAGE-SLUG/`
- Add a link in a related blog post's **Related Reading** section
- Add it to the footer nav in `ruxar.css` or individual page footers

### Step 6 — Commit and push

```bash
git add .
git commit -m "Add content page: Your Page Title"
git push
```

---

## File Structure

```
ruxar-site/
├── index.html              ← Main homepage
├── style.css               ← All styles (shared by all pages)
├── sitemap.xml             ← SEO sitemap (update when adding articles)
├── robots.txt              ← Tells Google how to crawl
├── CNAME                   ← GitHub Pages domain config (don't touch)
├── img/
│   └── logo.png            ← Ruxar logo
└── blog/
    ├── index.html          ← Blog listing page
    └── posts/
        ├── _TEMPLATE.html  ← Copy this for new articles
        ├── best-precision-platformers-steam.html
        ├── why-hard-games-are-good-for-you.html
        └── indie-platformer-dev-lessons.html
```
