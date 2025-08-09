# Deployment Guide - Min Tiptap Editor

## 🚀 Snabb Deployment med Vercel (Rekommenderat)

### Steg 1: Förbered appen
```bash
# Bygg appen för produktion
npm run build
```

### Steg 2: Deploya till Vercel

1. **Gå till [vercel.com](https://vercel.com)**
2. **Logga in** med GitHub/GitLab/Bitbucket
3. **Klicka "New Project"**
4. **Importa ditt repository** eller dra och släpp `build`-mappen
5. **Konfigurera miljövariabler:**
   - `REACT_APP_SUPABASE_URL` = `https://btbrdiaanylvjttuyyoq.supabase.co`
   - `REACT_APP_SUPABASE_ANON_KEY` = `sb_publishable_9t8tb-nCBTTqCqAylVDZcQ_T3T0yVcm`
6. **Klicka "Deploy"**

### Steg 3: Verifiera deployment
- Din app kommer att vara live på `https://your-project-name.vercel.app`
- Testa att editorn fungerar och sparar text

## 🌐 Alternativa Deployment-plattformar

### Netlify
1. Gå till [netlify.com](https://netlify.com)
2. Dra och släpp `build`-mappen
3. Konfigurera miljövariabler i Settings > Environment variables
4. Din app kommer att vara live på `https://your-project-name.netlify.app`

### GitHub Pages
1. Lägg till `"homepage": "https://yourusername.github.io/your-repo-name"` i `package.json`
2. Installera `gh-pages`: `npm install --save-dev gh-pages`
3. Lägg till scripts i `package.json`:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d build"
   ```
4. Kör `npm run deploy`

### Firebase Hosting
1. Installera Firebase CLI: `npm install -g firebase-tools`
2. Logga in: `firebase login`
3. Initiera projekt: `firebase init hosting`
4. Bygg appen: `npm run build`
5. Deploya: `firebase deploy`

## 🔧 Miljövariabler för Produktion

Se till att dessa miljövariabler är konfigurerade i din deployment-plattform:

```bash
REACT_APP_SUPABASE_URL=https://btbrdiaanylvjttuyyoq.supabase.co
REACT_APP_SUPABASE_ANON_KEY=sb_publishable_9t8tb-nCBTTqCqAylVDZcQ_T3T0yVcm
```

## 📝 Post-Deployment Checklist

- [ ] Appen laddas utan fel
- [ ] Supabase-anslutning fungerar
- [ ] Editor sparar text korrekt
- [ ] Text finns kvar efter page reload
- [ ] Alla formateringsknappar fungerar
- [ ] Responsiv design fungerar på mobil

## 🐛 Felsökning

### Vanliga problem:
1. **"Supabase miljövariabler saknas"** → Kontrollera att miljövariablerna är konfigurerade
2. **"CORS error"** → Kontrollera Supabase-inställningar
3. **"Build fails"** → Kontrollera att alla dependencies är installerade

### Kontakta support:
- Vercel: [vercel.com/support](https://vercel.com/support)
- Netlify: [netlify.com/support](https://netlify.com/support)
- Supabase: [supabase.com/support](https://supabase.com/support)

## 🎉 Gratulerar!

Din Tiptap Editor är nu live och redo att användas! 🚀
