
## Phases d'implémentation

### Phase 1 — Base commune
- `css/style.css` : reset, variables CSS (`--color-*`, `--font-*`), composants réutilisables (cards, badges, section-title), breakpoints 768px / 480px
- `js/main.js` : carrousel universel (flèches + indicateurs), hamburger mobile, dropdown navbar, détection lien actif
- Navbar commune (inline dans chaque page) : logo + liens + hamburger

### Phase 2 — Pages
- **index.html** : hero plein-écran (prix, localisation, nb pièces), 4 highlights (chambres / sdb / jardin / parking), mini-galerie, CTA
- **pieces.html** : navigation par ancres — 4 chambres, 2 sdb, 4 toilettes, cuisine, SAM, salon, espace libre, buanderie, terrasse, parking. Chaque section = carrousel 3 placeholders + liste caractéristiques
- **transports.html** : cards bus/tram (lignes + temps à pied), autoroute, centre-ville, université, iframe Google Maps
- **interets.html** : grille catégories — supermarchés, pharmacies, médecins, parcs, restaurants/cafés
- **infos.html** : table/cards — loyer, charges, disponibilité, dépôt, animaux, meublé, bail, surface
- **contact.html** : téléphone fictif, email fictif, horaires, récap points clés

### Phase 3 — Finitions
- Responsive mobile (Chrome DevTools — iPhone SE + Pixel 5)
- Accessibilité minimale (`alt`, `aria-label`)
- Audit commentaires `<!-- DATA: ... -->` sur toutes les valeurs à personnaliser

## Décisions techniques
| Sujet | Choix |
|---|---|
| Architecture | Multi-pages HTML (pas de SPA) |
| Galerie | Carrousel flèches gauche/droite |
| Contact | Coordonnées directes (pas de formulaire) |
| Langue | Français uniquement |
| Stack | Vanilla HTML/CSS/JS — aucun framework |
| Images | `https://placehold.co/800x500` (placeholders) |
| Données | Toutes fictives, balisées `<!-- DATA: -->` |

## Checklist de vérification
- [ ] `index.html` — hero + highlights visibles
- [ ] Hamburger mobile < 768px fonctionnel
- [ ] Dropdown "Les pièces" affiché au clic
- [ ] Carrousel sur `pieces.html` — flèches défilent
- [ ] Iframe Maps visible sur `transports.html`
- [ ] Navigation inter-pages — tous les liens fonctionnent
- [ ] Vue mobile DevTools (iPhone SE, Pixel 5)
- [ ] Tous les `<!-- DATA: -->` présents et documentés