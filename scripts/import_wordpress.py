"""Convertit l'export WordPress de thierrybrenet.fr en fichiers Markdown pour le site Astro.

Usage : python3 scripts/import_wordpress.py chemin/vers/export.xml

- Articles et infographies -> src/content/articles/<slug>.md (même slug que l'ancien site).
- Les blocs ACF (content_multi, content_img_left/right, two_columns) sont remis dans l'ordre.
- Un seul visuel par article : le champ ACF « img », noté comme chemin dans /uploads/.
  Les images insérées dans le corps ne sont pas reprises ; les fichiers eux-mêmes
  viendront de la sauvegarde complète du site (dossier uploads).
"""
import html
import re
import sys
import unicodedata
import xml.etree.ElementTree as ET
from pathlib import Path

from markdownify import markdownify

NS = {
    'wp': 'http://wordpress.org/export/1.2/',
    'content': 'http://purl.org/rss/1.0/modules/content/',
}
OUT = Path(__file__).resolve().parent.parent / 'src' / 'content' / 'articles'


def slugify(texte):
    t = unicodedata.normalize('NFKD', texte).encode('ascii', 'ignore').decode()
    t = re.sub(r"[^\w\s-]", '', t.lower()).strip()
    return re.sub(r'[\s_-]+', '-', t)


def nettoyer(h):
    if not h:
        return ''
    h = re.sub(r'<!--.*?-->', '', h, flags=re.S)
    h = re.sub(r'\[/?[a-z_]+[^\]]*\]', '', h)          # shortcodes
    h = re.sub(r'href="applewebdata://[^"]*"', '', h)   # liens cassés (copier-coller Mac)
    h = re.sub(r'<img[^>]*>', '', h)                     # un seul visuel par article
    # WordPress sépare les paragraphes par des lignes vides, sans balises <p>.
    if '<p' not in h:
        h = ''.join(f'<p>{p.strip()}</p>' for p in re.split(r'\n\s*\n', h) if p.strip())
        h = re.sub(r'(?<!>)\n(?!<)', '<br>', h)
    md = markdownify(h, heading_style='ATX', bullets='-')
    md = html.unescape(md).replace('\xa0', ' ')
    md = re.sub(r'[ \t]+\n', '\n', md)
    return re.sub(r'\n{3,}', '\n\n', md).strip()


def corps(meta):
    """Rassemble les blocs ACF dans l'ordre."""
    types = re.findall(r's:\d+:"([a-z_]+)"', meta.get('blocs', ''))
    morceaux = []
    for n, t in enumerate(types):
        p = f'blocs_{n}_'
        if t == 'content_multi':
            for r in range(int(meta.get(p + 'repeater') or 0)):
                morceaux.append(meta.get(f'{p}repeater_{r}_content', ''))
        else:  # content_img_left / content_img_right / two_columns
            for cle in ('content_left', 'content_right'):
                if meta.get(p + cle):
                    morceaux.append(meta[p + cle])
    return '\n\n'.join(filter(None, (nettoyer(m) for m in morceaux)))


def yaml(v):
    return '"' + str(v).replace('\\', '\\\\').replace('"', '\\"').replace('\n', ' ').strip() + '"'


def main(chemin):
    canal = ET.parse(chemin).getroot().find('channel')
    items = canal.findall('item')
    pieces = {i.find('wp:post_id', NS).text: i.find('wp:attachment_url', NS).text
              for i in items if i.find('wp:post_type', NS).text == 'attachment'}

    def upload(id_):
        url = pieces.get(id_ or '')
        return url.split('/uploads/', 1)[1] if url and '/uploads/' in url else ''

    for f in OUT.glob('*.md'):
        f.unlink()
    bilan = {}
    for i in items:
        type_ = i.find('wp:post_type', NS).text
        statut = i.find('wp:status', NS).text
        if type_ not in ('article', 'infographie') or statut not in ('publish', 'draft'):
            continue
        meta = {m.find('wp:meta_key', NS).text: (m.find('wp:meta_value', NS).text or '')
                for m in i.findall('wp:postmeta', NS)}
        titre = html.unescape(i.find('title').text or 'Sans titre').strip()
        lien = i.find('link').text or ''
        slug = (i.find('wp:post_name', NS).text or '').strip() or slugify(titre)
        slug = slug if not slug.startswith('%') else slugify(titre)
        date = i.find('wp:post_date', NS).text[:10]
        cats = [c.text for c in i.findall('category') if c.get('domain') == 'categorie']
        tags = [c.text for c in i.findall('category') if c.get('domain') == 'hashtag']

        if type_ == 'article':
            texte = corps(meta)
            mots = len(texte.split())
            fm = {
                'title': yaml(titre),
                'dek': yaml(html.unescape(meta.get('descriptif', '')) or titre),
                'accroche': yaml(html.unescape(meta.get('accroche', ''))),
                'rubrique': slugify(cats[0]) if cats else 'divers',
                'type': 'article',
                'date': date,
                'minutes': max(1, round(mots / 230)),
                'une': 'true' if meta.get('a_la_une_radio') == 'Oui' else 'false',
                'brouillon': 'true' if statut == 'draft' else 'false',
                'image': yaml(upload(meta.get('img'))),
                'image_pano': yaml(upload(meta.get('img_pano'))),
            }
        else:
            texte = ''
            fm = {
                'title': yaml(titre),
                'dek': yaml(titre),
                'rubrique': 'coup-doeil',
                'type': 'infographie',
                'format': 'Infographie',
                'date': date,
                'une': 'false',
                'brouillon': 'true' if statut == 'draft' else 'false',
                'image': yaml(upload(meta.get('img_infographie'))),
                'vignette': yaml(upload(meta.get('miniature_infographie'))),
                'pdf': yaml(upload(meta.get('pdf_infographie'))),
            }
        fm['ancienne_url'] = yaml(lien)
        if tags:
            fm['hashtags'] = '[' + ', '.join(yaml(t) for t in tags) + ']'
        entete = '\n'.join(f'{k}: {v}' for k, v in fm.items())
        (OUT / f'{slug}.md').write_text(f'---\n{entete}\n---\n\n{texte}\n', encoding='utf-8')
        cle = f'{type_} ({statut})'
        bilan[cle] = bilan.get(cle, 0) + 1
    print(bilan)


if __name__ == '__main__':
    main(sys.argv[1])
