const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    if (entry.name.startsWith('.')) return [];
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(file) : file.endsWith('.html') ? [file] : [];
  });
}
const files = walk(root);
test('homepage preserves effects and incoming campaign parameters', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  assert.ok(html.includes('function initCanvas(){'));
  assert.ok(html.includes("getElementById('cur')"));
  assert.ok(!html.includes("window.location.replace('https://ruxar.com/')"));
  assert.ok(html.includes('.rv { opacity:1;transform:none;'));
});
test('HTML scripts parse, local targets exist, and Steam links retain attribution', () => {
  let steamLinks = 0;
  for (const file of files) {
    const html = fs.readFileSync(file, 'utf8');
    const template = file.includes('TEMPLATE');
    for (const [, attributes, body] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
      if (attributes.includes('application/ld+json')) JSON.parse(body);
      else if (!attributes.includes('src=')) new vm.Script(body, { filename: file });
    }
    if (html.includes('mobile-nav')) {
      assert.equal((html.match(/src="\/site.js"/g) || []).length, 1, file);
      assert.ok(!html.includes("gtag('event'"), `Duplicate inline tracker: ${file}`);
      if (path.basename(file) !== '404.html') assert.ok(html.includes('gtag/js'), `Missing analytics: ${file}`);
    }
    for (const [, raw] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const value = raw.replaceAll('&amp;', '&');
      if (value.startsWith('https://store.steampowered.com/') && value.includes('utm_')) {
        const url = new URL(value);
        for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'])
          assert.equal(url.searchParams.getAll(key).length, 1, `${file}: ${key}`);
        steamLinks++;
      }
      if (template || /^(https?:|\/\/|mailto:|data:|javascript:|#)/.test(value)) continue;
      const pathname = value.split(/[?#]/)[0];
      if (!pathname) continue;
      const target = pathname.startsWith('/') ? path.join(root, pathname) : path.resolve(path.dirname(file), pathname);
      assert.ok(fs.existsSync(target), `${file}: missing ${value}`);
    }
    for (const [, url] of html.matchAll(/<a\b[^>]*href="(https:\/\/store\.steampowered\.com\/[^"<>]*)"/g))
      assert.ok(url.includes('utm_content='), `Untagged Steam anchor: ${file}`);
  }
  assert.ok(steamLinks >= 125);
});
test('delegated tracking handles unlabelled links, nested targets, and missing analytics', () => {
  const handlers = {};
  const events = [];
  const window = { gtag: (...args) => events.push(args) };
  const document = { addEventListener: (type, fn) => handlers[type] = fn, querySelector: () => null };
  vm.runInNewContext(fs.readFileSync(path.join(root, 'site.js'), 'utf8'), {
    document, window, URL, location: { href: 'https://ruxar.com/games/izbot-2/', pathname: '/games/izbot-2/' }
  });
  function click(href) { handlers.click({ target: { closest: () => ({ href }) } }); }
  click('https://store.steampowered.com/app/1452790/IZBOT_2/?utm_content=games-izbot-2-nav-2');
  assert.equal(events.length, 1);
  assert.equal(events[0][1], 'steam_click');
  assert.equal(events[0][2].game, 'izbot2');
  assert.equal(events[0][2].placement, 'games-izbot-2-nav-2');
  click('https://store.steampowered.com/app/388970/iZBOT/?utm_content=footer');
  assert.equal(events[1][2].game, 'izbot');
  click('https://example.com/');
  assert.equal(events.length, 2);
  delete window.gtag;
  assert.doesNotThrow(() => click('https://store.steampowered.com/app/388970/'));
});

test('game page tracking measures internal interest without collecting query strings', () => {
  const handlers = {}, events = [];
  const window = { gtag: (...args) => events.push(args) };
  const document = { addEventListener: (type, fn) => handlers[type] = fn, querySelector: () => null };
  vm.runInNewContext(fs.readFileSync(path.join(root, 'site.js'), 'utf8'), {
    document, window, URL,
    location: { href: 'https://ruxar.com/blog/posts/games-like-celeste.html', pathname: '/blog/posts/games-like-celeste.html' }
  });
  const click = href => handlers.click({ target: { closest: () => ({ href }) } });
  click('/games/izbot-2/?example=not-collected');
  assert.equal(events.length, 1);
  assert.equal(events[0][1], 'game_page_click');
  assert.equal(events[0][2].game, 'izbot2');
  assert.equal(events[0][2].destination, '/games/izbot-2/');
  assert.ok(!JSON.stringify(events).includes('not-collected'));
  click('https://example.com/games/izbot/');
  assert.equal(events.length, 1);
  delete window.gtag;
  assert.doesNotThrow(() => click('/games/izbot/'));
});

test('all public content headers use the Ruxar logo and homepage navigation', () => {
  for (const file of files) {
    const html = fs.readFileSync(file, 'utf8');
    if (file.includes('design-concepts') || /http-equiv="refresh"|window\.location\.replace/i.test(html)) continue;
    const header = html.match(/<header class="site-header">([\s\S]*?)<\/header>/);
    assert.ok(header, `Missing studio header: ${file}`);
    const brand = header[1].match(/<a\b[^>]*class="site-brand"[^>]*>([\s\S]*?)<\/a>/);
    assert.ok(brand, `Missing studio brand: ${file}`);
    assert.equal(brand[1].replace(/<[^>]+>/g, '').trim(), 'RUXAR', file);
    const links = [...header[1].matchAll(/<a href="([^"]+)"/g)].map(m => m[1].split('?')[0]);
    assert.deepEqual(links, ['/', '/#games', '/blog/', '/about/', '/press/', 'https://store.steampowered.com/search/'], file);
    assert.equal((html.match(/<link rel="stylesheet" href="\/header.css"/g) || []).length, 1, file);
  }
});
