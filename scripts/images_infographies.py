"""Infographies : cartes à leur format naturel (rien de coupé) et aperçu LinkedIn 1200x627
« image entière sur fond flouté » (rien de coupé non plus).
Usage : python3 scripts/images_infographies.py  (depuis la racine du dépôt)
Ajoute `carte: "cartes/<nom>.jpg"` et `vignette: "vignettes/<nom>.jpg"` dans l'en-tête de chaque infographie."""
import glob, re, os
from PIL import Image, ImageFilter

os.makedirs('public/uploads/cartes', exist_ok=True)
for f in sorted(glob.glob('src/content/articles/*.md')):
    t = open(f, encoding='utf-8').read()
    if 'type: infographie' not in t:
        continue
    m = re.search(r'^image: "(.+)"', t, re.M)
    if not m:
        continue
    nom = os.path.basename(f)[:-3][:48]
    src = Image.open('public/uploads/' + m.group(1)).convert('RGB')
    w, h = src.size
    if abs(w / h - 1.91) < 0.02:      # déjà au bon format : rien à faire
        continue
    # 1) carte : format naturel, 900 px de large
    carte = src.resize((900, round(900 * h / w)), Image.LANCZOS)
    carte.save(f'public/uploads/cartes/{nom}.jpg', quality=84, optimize=True)
    # 2) aperçu LinkedIn : image entière, centrée, sur fond flou
    W, H = 1200, 627
    fond = src.resize((W, round(W * h / w)), Image.LANCZOS)
    top = (fond.height - H) // 2
    fond = fond.crop((0, top, W, top + H)).filter(ImageFilter.GaussianBlur(28))
    fw = round(H * w / h)
    fg = src.resize((fw, H), Image.LANCZOS)
    fond.paste(fg, ((W - fw) // 2, 0))
    fond.save(f'public/uploads/vignettes/{nom}.jpg', quality=86, optimize=True)
    # 3) en-tête
    t = re.sub(r'^(carte|vignette): ".*"\n', '', t, flags=re.M)
    t = t.replace(m.group(0), m.group(0) + f'\nvignette: "vignettes/{nom}.jpg"\ncarte: "cartes/{nom}.jpg"', 1)
    open(f, 'w', encoding='utf-8').write(t)
    print('ok', nom, (w, h))
