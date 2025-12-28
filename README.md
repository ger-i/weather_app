# ☀️ Időjárás Alkalmazás

Egy modern, responsive időjárás alkalmazás React-tel és Tailwind CSS-sel.

## 📸 Screenshot

![alt text](image-1.png)

## 🌟 Funkciók

- 🔍 Város keresés
- 🌡️ Aktuális időjárás megjelenítése
- 📅 5 napos előrejelzés
- 📱 Teljesen responsive design (mobil, tablet, desktop)
- 🎨 Modern UI Tailwind CSS-sel
- ⚡ Gyors betöltés Vite-tal

## 🚀 Élő Demo

[Nézd meg élőben a Netlify-on](https://idojarasapp.netlify.app/)

## 🛠️ Technológiák

- **React** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **OpenWeatherMap API** - Időjárás adatok
- **Netlify** - Hosting

## 📦 Telepítés

### Előfeltételek

- Node.js (v20.x vagy újabb)
- npm vagy yarn

### Lépések

1. **Klónozd a repository-t:**
```bash
git clone https://github.com/ger-i/weather_app.git
cd weather_app
```

2. **Telepítsd a függőségeket:**
```bash
npm install
```

3. **Környezeti változók beállítása:**

Hozz létre egy `.env` fájlt a projekt gyökerében:
```env
VITE_WEATHER_API_KEY=your_openweathermap_api_key
```

4. **Indítsd el a dev szervert:**
```bash
npm run dev
```

Az alkalmazás elérhető lesz a `http://localhost:5173` címen.

## 🔑 API Kulcs beszerzése

1. Menj az [OpenWeatherMap](https://openweathermap.org/) oldalra
2. Regisztrálj ingyen
3. Menj a **API Keys** menüponthoz
4. Másold ki az API kulcsot
5. Add hozzá a `.env` fájlhoz

## 📱 Használat

1. Írd be a keresett város nevét
2. Kattints a "Keresés" gombra
3. Nézd meg az aktuális időjárást és az 5 napos előrejelzést

## 🏗️ Build

Production build készítése:
```bash
npm run build
```

A build fájlok a `dist` mappába kerülnek.

## 🌐 Netlify-ra deploy

## 📄 Licensz

MIT License

## 👨‍💻 Szerző

**Geri**
- GitHub: [@ger-i](https://github.com/ger-i)