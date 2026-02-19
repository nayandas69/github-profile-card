<div align="center">
  <img src="https://github-profile-card-blue.vercel.app/card/nayandas69?theme=tokyonight" alt="GitHub Profile Card Demo">
</div>

---

<div align="center">

[![CI](https://github.com/nayandas69/github-profile-card/actions/workflows/ci.yml/badge.svg)](https://github.com/nayandas69/github-profile-card/actions/workflows/ci.yml)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/Node.js-24.x-339933?style=flat-square&logo=node.js)](package.json)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?style=flat-square&logo=typescript)](tsconfig.json)
[![Hono Framework](https://img.shields.io/badge/Hono-4.7-FF6B35?style=flat-square&logo=fastapi)](package.json)
[![Production Deployment](https://img.shields.io/badge/Vercel-Deployed-000000?style=flat-square&logo=vercel)](https://github-profile-card-blue.vercel.app)
[![Discord](https://img.shields.io/discord/1435329767149797461?label=Join%20Discord&logo=discord&color=5865F2)](https://discord.gg/u9XfHZN8K9)

</div>

**GitHub Profile Card** is a sophisticated Node.js application engineered to generate aesthetically refined, configurable SVG profile cards for GitHub users. This utility proves particularly valuable for developers seeking to embed professional profile representations within README documentation, personal portfolios, landing pages, or web applications that require comprehensive GitHub profile visualisation.

### Configurable Parameters

| Parameter | Data Type | Functional Description | Exemplification |
|-----------|-----------|---|---|
| `theme` | String | Thematic selection identifier | `?theme=dracula` |
| `title_color` | Hexadecimal | Customised title hue (excluding # notation) | `?title_color=ff0000` |
| `text_color` | Hexadecimal | Customised textual hue (excluding # notation) | `?text_color=ffffff` |
| `icon_color` | Hexadecimal | Customised iconographic hue (excluding # notation) | `?icon_color=00ff00` |
| `bg_color` | Hexadecimal | Customised background hue (excluding # notation) | `?bg_color=1a1a1a` |
| `border_color` | Hexadecimal | Customised perimeter hue (excluding # notation) | `?border_color=333333` |
| `hide_border` | Boolean | Perimeter removal functionality (true/false) | `?hide_border=true` |
| `compact` | Boolean | Minimalist presentation mode excluding biographical and social elements (true/false) | `?compact=true` |
| `fields` | String | Statistical field filtration mechanism ("languages", "stats", "all") | `?fields=languages,stats` |

## Thematic Specifications

All thematic variations encompass optimised colour arrangements for **Background**, **Title**, **Text**, **Icon**, and **Border** components. Each theme is demonstrated below with live preview links.

Display your GitHub profile statistics in a beautiful SVG card format.

### Try it yourself

Visit: `https://github-profile-card-blue.vercel.app/card/{username}?theme={theme}`

Replace `{username}` with any GitHub username and `{theme}` with one of our 56 available themes listed below.

<details close>
<summary><b>Complete Thematic Catalogue (56 Variations)</b></summary>

### Default Theme
![Default Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=default)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Off-White | `#fffefe` |
| Title | Vibrant Blue | `#2f80ed` |
| Text | Charcoal Gray | `#434d58` |
| Icon | Periwinkle Blue | `#4c71f2` |
| Border | Pale Gray | `#e4e2e2` |

---

## Dark Themes

### Dark
![Dark Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=dark)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Abyssal Black | `#151515` |
| Title | Pristine White | `#ffffff` |
| Text | Silver Gray | `#9f9f9f` |
| Icon | Lime Verdancy | `#79ff97` |
| Border | Graphite Gray | `#2a2a2a` |

### Dracula
![Dracula Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=dracula)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Slate Charcoal | `#282a36` |
| Title | Fuchsia | `#ff6e96` |
| Text | Alabaster | `#f8f8f2` |
| Icon | Amethyst | `#bd93f9` |
| Border | Steel Gray | `#44475a` |

### Monokai
![Monokai Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=monokai)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Charcoal | `#272822` |
| Title | Fuchsia | `#f92672` |
| Text | Ivory | `#f8f8f2` |
| Icon | Chartreuse | `#a6e22e` |
| Border | Medium Gray | `#3e3d32` |

### Nord
![Nord Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=nord)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Arctic Blue | `#2e3440` |
| Title | Glacier Blue | `#88c0d0` |
| Text | Snowstorm | `#d8dee9` |
| Icon | Steel Blue | `#81a1c1` |
| Border | Polar Night | `#3b4252` |

### GitHub Dark
![GitHub Dark Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=github_dark)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Deep Onyx | `#0d1117` |
| Title | GitHub Blue | `#58a6ff` |
| Text | Concrete | `#c9d1d9` |
| Icon | GitHub Indigo | `#1f6feb` |
| Border | Obsidian | `#21262d` |

### Slate
![Slate Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=slate)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Midnight Navy | `#0b1220` |
| Title | Silver | `#e2e8f0` |
| Text | Slate Gray | `#94a3b8` |
| Icon | Cerulean | `#38bdf8` |
| Border | Charcoal | `#1f2937` |

### Midnight
![Midnight Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=midnight)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Deep Navy | `#0f172a` |
| Title | Sky Blue | `#38bdf8` |
| Text | Silver | `#cbd5e1` |
| Icon | Indigo | `#818cf8` |
| Border | Navy | `#1e293b` |

### High Contrast
![High Contrast Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=highcontrast)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Absolute Black | `#000000` |
| Title | Luminous Yellow | `#e7f216` |
| Text | Pure White | `#ffffff` |
| Icon | Electroluminescent Cyan | `#00ffff` |
| Border | Graphite | `#333333` |

---

## Light Themes

### Pearl
![Pearl Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=pearl)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Cream | `#f7f7f5` |
| Title | Ebony | `#1f2328` |
| Text | Anthracite | `#3d444d` |
| Icon | Sapphire | `#0969da` |
| Border | Platinum | `#e6e8eb` |

### Ice
![Ice Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=ice)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Frost | `#f0f9ff` |
| Title | Sky | `#0369a1` |
| Text | Ocean | `#075985` |
| Icon | Cyan | `#0ea5e9` |
| Border | Pale Blue | `#dbeafe` |

### Sand
![Sand Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=sand)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Cream Beige | `#fbf7f0` |
| Title | Rich Brown | `#6b4e2e` |
| Text | Tan | `#7a6754` |
| Icon | Amber Gold | `#d97706` |
| Border | Pale Sand | `#eadfce` |

---

## Pastel Themes

### Pastel Peach
![Pastel Peach Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=pastel_peach)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Soft Pink | `#fff1f2` |
| Title | Rose | `#fb7185` |
| Text | Deep Rose | `#7f1d1d` |
| Icon | Light Pink | `#fda4af` |
| Border | Pale Rose | `#ffe4e6` |

### Pastel Mint
![Pastel Mint Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=pastel_mint)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Soft Green | `#f0fdf4` |
| Title | Emerald | `#4ade80` |
| Text | Deep Green | `#14532d` |
| Icon | Light Green | `#86efac` |
| Border | Pale Green | `#dcfce7` |

### Pastel Lavender
![Pastel Lavender Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=pastel_lavender)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Soft Purple | `#f5f3ff` |
| Title | Light Purple | `#a78bfa` |
| Text | Deep Purple | `#4c1d95` |
| Icon | Lavender | `#c4b5fd` |
| Border | Pale Purple | `#ede9fe` |

### Pastel Lemon
![Pastel Lemon Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=pastel_lemon)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Soft Yellow | `#fefce8` |
| Title | Golden | `#facc15` |
| Text | Deep Gold | `#713f12` |
| Icon | Light Yellow | `#fde68a` |
| Border | Pale Yellow | `#fef9c3` |

### Pastel Rose
![Pastel Rose Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=pastel_rose)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Soft Rose | `#fff1f5` |
| Title | Pink | `#f472b6` |
| Text | Deep Rose | `#831843` |
| Icon | Light Rose | `#f9a8d4` |
| Border | Pale Rose | `#fce7f3` |

---

## Material Design Themes

### MUI Blue
![MUI Blue Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=mui_blue)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Light Blue | `#e3f2fd` |
| Title | Material Blue | `#1976d2` |
| Text | Dark Blue | `#0d47a1` |
| Icon | Sky Blue | `#42a5f5` |
| Border | Pale Blue | `#bbdefb` |

### MUI Indigo
![MUI Indigo Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=mui_indigo)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Light Indigo | `#e8eaf6` |
| Title | Material Indigo | `#3f51b5` |
| Text | Dark Indigo | `#1a237e` |
| Icon | Medium Indigo | `#5c6bc0` |
| Border | Pale Indigo | `#c5cae9` |

### MUI Teal
![MUI Teal Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=mui_teal)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Light Teal | `#e0f2f1` |
| Title | Material Teal | `#00796b` |
| Text | Dark Teal | `#004d40` |
| Icon | Medium Teal | `#26a69a` |
| Border | Pale Teal | `#b2dfdb` |

### MUI Deep Purple
![MUI Deep Purple Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=mui_deep_purple)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Light Purple | `#ede7f6` |
| Title | Material Purple | `#673ab7` |
| Text | Dark Purple | `#311b92` |
| Icon | Medium Purple | `#9575cd` |
| Border | Pale Purple | `#d1c4e9` |

### MUI Orange
![MUI Orange Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=mui_orange)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Light Orange | `#fff3e0` |
| Title | Material Orange | `#f57c00` |
| Text | Dark Orange | `#e65100` |
| Icon | Material Orange | `#ff9800` |
| Border | Pale Orange | `#ffe0b2` |

### MUI Red
![MUI Red Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=mui_red)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Light Red | `#ffebee` |
| Title | Material Red | `#d32f2f` |
| Text | Dark Red | `#b71c1c` |
| Icon | Medium Red | `#ef5350` |
| Border | Pale Red | `#ffcdd2` |

---

## VSCode Themes

### VSCode Dark Plus
![VSCode Dark Plus Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=vscode_dark_plus)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | VSCode Dark | `#1e1e1e` |
| Title | VSCode Blue | `#569cd6` |
| Text | VSCode Gray | `#d4d4d4` |
| Icon | VSCode Purple | `#c586c0` |
| Border | VSCode Border | `#2d2d2d` |

### VSCode Light
![VSCode Light Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=vscode_light)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | VSCode Light | `#ffffff` |
| Title | VSCode Light Blue | `#0066bf` |
| Text | VSCode Light Text | `#333333` |
| Icon | VSCode Light Orange | `#795e26` |
| Border | VSCode Light Border | `#e5e5e5` |

### VSCode Monokai Pro
![VSCode Monokai Pro Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=vscode_monokai_pro)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Monokai Dark | `#2d2a2e` |
| Title | Monokai Red | `#ff6188` |
| Text | Monokai White | `#fcfcfa` |
| Icon | Monokai Green | `#a9dc76` |
| Border | Monokai Border | `#403e41` |

### VSCode Night Owl
![VSCode Night Owl Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=vscode_night_owl)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Night Owl Dark | `#011627` |
| Title | Night Owl Blue | `#82aaff` |
| Text | Night Owl Text | `#d6deeb` |
| Icon | Night Owl Purple | `#c792ea` |
| Border | Night Owl Border | `#1d3b53` |

### VSCode Palenight
![VSCode Palenight Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=vscode_palenight)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Palenight Dark | `#292d3e` |
| Title | Palenight Purple | `#c792ea` |
| Text | Palenight Text | `#a6accd` |
| Icon | Palenight Blue | `#89ddff` |
| Border | Palenight Border | `#3a3f58` |

---

## Brand Themes

### Twitter
![Twitter Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=twitter)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Twitter Dark | `#15202b` |
| Title | Twitter Blue | `#1da1f2` |
| Text | Twitter Light | `#e1e8ed` |
| Icon | Twitter Blue | `#1da1f2` |
| Border | Twitter Border | `#38444d` |

### Discord
![Discord Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=discord)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Discord Dark | `#2c2f33` |
| Title | Discord Purple | `#5865f2` |
| Text | Discord White | `#ffffff` |
| Icon | Discord Gray | `#99aab5` |
| Border | Discord Darker | `#23272a` |

### Spotify
![Spotify Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=spotify)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Spotify Black | `#121212` |
| Title | Spotify Green | `#1db954` |
| Text | Spotify Gray | `#b3b3b3` |
| Icon | Spotify Light Green | `#1ed760` |
| Border | Spotify Charcoal | `#282828` |

### GitHub Light
![GitHub Light Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=github_light)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | GitHub White | `#ffffff` |
| Title | GitHub Black | `#24292e` |
| Text | GitHub Gray | `#57606a` |
| Icon | GitHub Blue | `#0969da` |
| Border | GitHub Light Gray | `#d0d7de` |

### YouTube
![YouTube Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=youtube)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | YouTube Black | `#181818` |
| Title | YouTube Red | `#ff0000` |
| Text | YouTube White | `#ffffff` |
| Icon | YouTube Red Light | `#ff4e45` |
| Border | YouTube Dark | `#303030` |

### Instagram
![Instagram Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=instagram)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Instagram Dark | `#1e1e1e` |
| Title | Instagram Pink | `#e1306c` |
| Text | Instagram Light | `#f5f5f5` |
| Icon | Instagram Red | `#fd1d1d` |
| Border | Instagram Darker | `#2a2a2a` |

---

## Neon/Vibrant Themes

### Radical
![Radical Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=radical)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Near-Black | `#141321` |
| Title | Magenta Intensity | `#fe428e` |
| Text | Cyan Luminescence | `#a9fef7` |
| Icon | Aureate | `#f8d847` |
| Border | Indigo Depth | `#2a2a40` |

### Cyberpunk
![Cyberpunk Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=cyberpunk)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Cyber Black | `#14001f` |
| Title | Cyber Magenta | `#ff00ff` |
| Text | Cyber Cyan | `#00ffff` |
| Icon | Cyber Yellow | `#fcee0c` |
| Border | Cyber Purple | `#2a003f` |

### Synthwave
![Synthwave Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=synthwave)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Twilight Plum | `#2b213a` |
| Title | Off-White | `#e2e9ec` |
| Text | Hot Magenta | `#e5289e` |
| Icon | Burnt Amber | `#ef8539` |
| Border | Deep Plum | `#3e2f5a` |

### Oceanic
![Oceanic Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=oceanic)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Ocean Dark | `#0c1e26` |
| Title | Ocean Cyan | `#00c2ff` |
| Text | Ocean Light | `#9be7ff` |
| Icon | Ocean Green | `#00ffa3` |
| Border | Ocean Blue | `#123844` |

### Mint
![Mint Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=mint)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Deep Teal | `#0f1f1c` |
| Title | Mint Green | `#5eead4` |
| Text | Light Mint | `#99f6e4` |
| Icon | Teal | `#2dd4bf` |
| Border | Dark Teal | `#1b3a34` |

### Royal
![Royal Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=royal)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Royal Navy | `#1a1a2e` |
| Title | Royal Gold | `#ffd700` |
| Text | Royal Light | `#eaeaea` |
| Icon | Royal Purple | `#8a2be2` |
| Border | Royal Dark | `#2e2e4d` |

---

## Natural/Warm Themes

### Gruvbox
![Gruvbox Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=gruvbox)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Anthracite | `#282828` |
| Title | Aureous | `#fabd2f` |
| Text | Taupe Cream | `#ebdbb2` |
| Icon | Apricot Orange | `#fe8019` |
| Border | Slate Gray | `#3c3836` |

### Merko
![Merko Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=merko)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Profound Verdancy | `#0a0f0b` |
| Title | Chartreuse Brilliance | `#abd200` |
| Text | Viridian | `#68b587` |
| Icon | Pale Lime | `#b7d364` |
| Border | Darkened Green | `#1a2f1a` |

### Forest
![Forest Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=forest)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Deep Woodland | `#0f1b17` |
| Title | Mint | `#b7f7d9` |
| Text | Sage | `#86a995` |
| Icon | Emerald | `#34d399` |
| Border | Darkened Forest | `#17332a` |

### Rose
![Rose Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=rose)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Deep Rose | `#1a0f14` |
| Title | Light Rose | `#ffd0dd` |
| Text | Dusty Mauve | `#e6b0c0` |
| Icon | Petal Pink | `#fb7185` |
| Border | Darkened Rose | `#2b1a22` |

### Sunset
![Sunset Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=sunset)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Dusk | `#2a1a1f` |
| Title | Sunset Orange | `#ff7a59` |
| Text | Peach | `#ffd6c2` |
| Icon | Light Orange | `#ffb347` |
| Border | Deep Maroon | `#40252b` |

### Lavender
![Lavender Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=lavender)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Deep Purple | `#1e1b2e` |
| Title | Light Purple | `#c084fc` |
| Text | Lavender Light | `#e9d5ff` |
| Icon | Medium Purple | `#a78bfa` |
| Border | Dark Purple | `#312e4a` |

### Ember
![Ember Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=ember)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Deep Ember | `#1a0f0f` |
| Title | Ember Orange | `#ff4500` |
| Text | Ember Light | `#ffb3a7` |
| Icon | Ember Red | `#ff6347` |
| Border | Dark Ember | `#331a1a` |

### TokyoNight
![TokyoNight Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=tokyonight)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Nocturnal Blue | `#1a1b27` |
| Title | Periwinkle | `#70a5fd` |
| Text | Teal Aquamarine | `#38bdae` |
| Icon | Violet | `#bf91f3` |
| Border | Deep Indigo | `#2a2b3d` |

### OneDark
![OneDark Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=onedark)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Charcoal | `#282c34` |
| Title | Champagne | `#e4bf7a` |
| Text | Luminous Gray | `#abb2bf` |
| Icon | Sage Green | `#8eb573` |
| Border | Medium Slate | `#3e4451` |

### Cobalt
![Cobalt Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=cobalt)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Prussian Blue | `#193549` |
| Title | Vivid Magenta | `#e683d9` |
| Text | Jade Green | `#75eeb2` |
| Icon | Azure | `#0480ef` |
| Border | Naval Blue | `#2a4a6a` |

---

## AMOLED Themes

### AMOLED Blue
![AMOLED Blue Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=amoled_blue)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Pure Black | `#000000` |
| Title | Deep Sky Blue | `#00bfff` |
| Text | Light Blue | `#b3e5fc` |
| Icon | Dodger Blue | `#1e90ff` |
| Border | Near Black | `#0a0a0a` |

### AMOLED Green
![AMOLED Green Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=amoled_green)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Pure Black | `#000000` |
| Title | Spring Green | `#00ff7f` |
| Text | Light Green | `#ccffcc` |
| Icon | Medium Spring Green | `#00fa9a` |
| Border | Near Black | `#0d0d0d` |

### AMOLED Purple
![AMOLED Purple Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=amoled_purple)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Pure Black | `#000000` |
| Title | Medium Purple | `#bb86fc` |
| Text | Light Purple | `#e0c3fc` |
| Icon | Dark Purple | `#9d4edd` |
| Border | Deep Black | `#121212` |

---

## Grayscale Themes

### Grayscale Light
![Grayscale Light Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=grayscale_light)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Off-White | `#f5f5f5` |
| Title | Near-Black | `#111111` |
| Text | Medium Gray | `#555555` |
| Icon | Dark Gray | `#888888` |
| Border | Light Gray | `#dddddd` |

### Grayscale Mid
![Grayscale Mid Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=grayscale_mid)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Dark Gray | `#2b2b2b` |
| Title | Off-White | `#ffffff` |
| Text | Medium Gray | `#bbbbbb` |
| Icon | Light Gray | `#999999` |
| Border | Medium Gray | `#3c3c3c` |

### Grayscale Dark
![Grayscale Dark Theme](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=grayscale_dark)

| Component | Designation | Hexadecimal Code |
|-----------|-------------|------------------|
| Background | Deep Black | `#121212` |
| Title | Light Gray | `#e0e0e0` |
| Text | Medium Gray | `#9e9e9e` |
| Icon | Silver | `#bdbdbd` |
| Border | Near Black | `#1f1f1f` |

---

</details>

## Quickstart Guide

### Prerequisites
- **Node.js** version 24.x or contemporary iteration
- **pnpm** version 10.29.2 or equivalent package manager (npm or yarn acceptable)
- **GitHub Personal Access Token** for API authentication

### Installation Protocol

1. **Repository Acquisition**
   ```bash
   git clone https://github.com/nayandas69/github-profile-card.git
   cd github-profile-card
   ```

2. **Dependency Installation**
   ```bash
   pnpm install
   ```

3. **Environment Configuration Initialisation**
   ```bash
   cp .env.example .env
   ```

4. **Credentials Configuration** - Modify the `.env` file with your authentication credentials:
   ```env
   GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   UPSTASH_REDIS_REST_URL=https://xxxxxxxx.upstash.io
   UPSTASH_REDIS_REST_TOKEN=AxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxE=
   PORT=3000
   ```

5. **Server Initialisation**
   ```bash
   pnpm dev
   ```

   The API shall be accessible via `http://localhost:3000`

## Environment Variables Configuration

### Comprehensive `.env` Setup Documentation

check the `.env.example` file for a detailed template of required environment variables. The following sections provide an in-depth guide for acquiring and configuring these credentials.

### GitHub Token Acquisition

#### Classical Token Methodology (Recommended)
1. Navigate to [GitHub Settings Interface](https://github.com/settings/tokens)
2. Initiate token generation via "Generate new token (classic)"
3. Assign a descriptive nomenclature (e.g., "GitHub Profile Card")
4. Designate requisite scopes:
   - `read:user` - User profile data interrogation
   - `repo` - Public repository information access
5. Select "Generate token"
6. Execute immediate token replication (subsequent visualisation is precluded)
7. Transfer into `.env` file as `GITHUB_TOKEN=ghp_...`

#### Fine-Grained Token Methodology (Enhanced Security)
1. Navigate to [Fine-Grained Token Interface](https://github.com/settings/personal-access-tokens/new)
2. Establish descriptive nomenclature and expiration parameters
3. Under "Account" permission classification, designate:
   - Profile: Read-only permission assignment
4. Execute "Generate token"
5. Transfer into `.env` file

### Upstash Redis Credential Configuration (Discretionary)

1. Commence registration via [Upstash Console](https://console.upstash.com/)
2. Initiate database instantiation
3. Designate geographic region (proximate selection recommended)
4. Establish database with predetermined parameters
5. Extract **REST URL** and **REST Token** from database configuration interface
6. Transfer into `.env`:
   ```env
   UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
   UPSTASH_REDIS_REST_TOKEN=xxx
   ```

> [!IMPORTANT]
> Free Upstash database instances expire following 14 days of inactivity. Configure the provided GitHub Action workflow to sustain continuous availability via automated daily database access.

## Utilisation Exemplars

### Elementary Implementation
```markdown
![GitHub Profile Card](https://github-profile-card-blue.vercel.app/card/nayandas69)
```

### Thematic Implementation
```markdown
![GitHub Profile Card](https://github-profile-card-blue.vercel.app/card/nayandas69?theme=dracula)
```

### Bespoke Colour Assignment
```markdown
![GitHub Profile Card](https://github-profile-card-blue.vercel.app/card/nayandas69?title_color=ff6b6b&text_color=ffffff&bg_color=1a1a1a)
```

### Minimalist Presentation Configuration
```markdown
![GitHub Profile Card](https://github-profile-card-blue.vercel.app/card/nayandas69?compact=true)
```

### API Response Exemplification
```json
{
  "name": "GitHub Profile Card API",
  "version": "0.1.0",
  "author": "Nayan Das (https://github.com/nayandas69)",
  "usage": "GET /card/:username",
  "themes": [
    "default", "dark", "radical", "merko", "gruvbox",
    "tokyonight", "onedark", "cobalt", "synthwave",
    "highcontrast", "dracula", "monokai", "nord",
    "github_dark", "pearl", "slate", "forest", "rose", "sand"
  ],
  "repository": "https://github.com/nayandas69/github-profile-card"
}
```

## API Interface Specifications

### Root Endpoint: `GET /`
Returns comprehensive API metadata and accessible thematic variations.

**Response Payload:**
```json
{
  "name": "GitHub Profile Card API",
  "version": "0.1.0",
  "themes": ["default", "dark", "radical", ...]
}
```

### Profile Card Endpoint: `GET /card/:username`
Generates a customised SVG profile representation for the designated GitHub user.

**Path Parameters:**
- `username` - Target GitHub user identifier

**Query Parameters:**
- `theme` - Thematic identifier (default: "default")
- `compact` - Biographical and social element suppression (true/false)
- `hide_border` - Perimeter element removal (true/false)
- `fields` - Statistical field filtration mechanism; accepts comma-separated values of `languages`, `stats`, or `all` (default: "all")
- `title_color`, `text_color`, `icon_color`, `bg_color`, `border_color` - Hexadecimal colour substitutions

**Card Rendering Behaviour:**
- The Commits statistic is scoped to the current calendar year and is labelled accordingly (e.g. "Commits (2026)").
- Biographical text exceeding 40 characters is truncated to a single line with an ellipsis.

**Response Specification:** SVG image with appropriate HTTP caching directives

### Health Status Endpoint: `GET /health`
Elementary server availability verification mechanism.

**Response Payload:**
```json
{
  "status": "ok",
  "timestamp": "2024-02-12T10:30:45.123Z"
}
```

## Caching Architecture

The system implements a tripartite caching infrastructure for enhanced performance optimisation:

1. **In-Memory Caching Layer** - Instantaneous retrieval, instance-specific storage (30-minute retention interval). Bounded to a maximum of 500 entries with LRU eviction policy, and a periodic sweep that clears expired entries every 5 minutes. Concurrent in-flight requests are capped at 100 to prevent memory exhaustion.
2. **Distributed Redis Caching** - Upstash Redis integration across multiple instances (30-minute retention interval)
3. **Live API Interrogation** - GitHub GraphQL API with duplicate request prevention mechanisms

This architectural approach facilitates:
- Rapid response delivery during initial server instantiation
- Mitigated GitHub API rate-limiting constraints
- Standardised data representation across distributed instances
- Automatic fallback to real-time API interrogation upon cache failure
- Bounded memory consumption through LRU eviction and periodic cache sweeping

## Licensing Information

MIT License - Unrestricted utilisation within proprietary and open-source projects permitted.

## Collaborative Contribution

Community contributions are actively encouraged. Submissions via Pull Request mechanism shall be thoroughly evaluated and considered for integration.

## Authorial Attribution

**Nayan Das**
- GitHub Profile: [@nayandas69](https://github.com/nayandas69)
- Repository Reference: [GitHub Repository](https://github.com/nayandas69/github-profile-card)

## Acknowledgements

- GitHub GraphQL API - User data acquisition
- Upstash - Distributed Redis caching provision
- Hono - Lightweight web framework implementation
- Thematic colour palette inspiration derived from prominent integrated development environment colour schemes

## Support and Issue Resolution

For technical assistance, inquiries, or feature recommendations:
1. Submit an issue via [GitHub Issues Portal](https://github.com/nayandas69/github-profile-card/issues)
2. Consult comprehensive documentation
3. Examine test specifications for implementation exemplification

---

**Developed by Nayan Das**

![Profile](https://komarev.com/ghpvc/?username=nayandas69)
