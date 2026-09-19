"""Valida o contrato SEO do HTML exportado: python3 scripts/check-seo.py."""
import json
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1] / 'out'
ORIGIN = 'https://granaextracomia.cpani662645.chatgpt.site'

class Page(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.meta, self.links, self.ld = {}, [], []
        self.title, self.h1 = '', ''
        self.current = None
        self.buffer = ''
        self.feed(html)
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'meta': self.meta[a.get('name', a.get('property'))] = a.get('content')
        if tag in ('link', 'a'): self.links.append(a)
        if tag in ('title', 'h1') or (tag == 'script' and a.get('type') == 'application/ld+json'):
            self.current, self.buffer = tag, ''
    def handle_data(self, data):
        if self.current: self.buffer += data
    def handle_endtag(self, tag):
        if tag == self.current:
            if tag == 'script': self.ld.append(json.loads(self.buffer))
            else: setattr(self, tag, self.buffer)
            self.current = None

urls = [n.text for n in ET.parse(ROOT/'sitemap.xml').findall('.//{*}loc')]
assert len(urls) == 7 and len(set(urls)) == 7
titles, descriptions = set(), set()
for url in urls:
    assert url.startswith(ORIGIN + '/')
    path = urlparse(url).path
    page = Page((ROOT/path.lstrip('/')/'index.html').read_text())
    assert page.h1 and page.title and page.ld, url
    assert [x['href'] for x in page.links if x.get('rel') == 'canonical'] == [url], url
    assert page.meta['og:url'] == url and page.meta['og:title'], url
    assert page.meta['twitter:card'] == 'summary', url
    assert 'noindex' not in page.meta.get('robots', ''), url
    assert page.meta['description'] and page.title not in titles, url
    assert page.meta['description'] not in descriptions, url
    titles.add(page.title)
    descriptions.add(page.meta['description'])
    for link in page.links:
        href = link.get('href', '')
        if href.startswith('/') and not href.startswith('//'):
            dest = ROOT/urlparse(href).path.lstrip('/')
            assert dest.is_file() or (dest/'index.html').is_file(), (url, href)
    assert any(x.get('type') == 'application/rss+xml' for x in page.links)

rss = ET.parse(ROOT/'feed.xml').findall('./channel/item')
feed = json.loads((ROOT/'feed.json').read_text())
assert feed['version'] == 'https://jsonfeed.org/version/1.1'
assert {x.findtext('link') for x in rss} == set(urls) - {ORIGIN+'/'}
assert {x['url'] for x in feed['items']} == set(urls) - {ORIGIN+'/'}
assert all(x['id'] == x['url'] and x['content_text'] for x in feed['items'])
assert ORIGIN+'/sitemap.xml' in (ROOT/'robots.txt').read_text()
assert all(url in (ROOT/'llms.txt').read_text() for url in urls[1:])
print('SEO OK: 7 páginas, canonical, HTML, metadados, JSON-LD, links internos, sitemap, robots e 2 feeds.')
