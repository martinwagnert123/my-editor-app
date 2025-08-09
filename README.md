# Min Tiptap Editor

En kraftfull textredigerare byggd med React och Tiptap med Supabase-integration för att spara text automatiskt.

## ✨ Funktioner

- **Rich Text Editing**: Formatera text med fet, kursiv, understruken text
- **Rubriker**: Skapa H1 och H2 rubriker
- **Listor**: Skapa punktlistor och numrerade listor
- **Kod**: Formatera kod med `code` taggar
- **Auto-save**: Text sparas automatiskt i Supabase
- **Persistens**: Text finns kvar när du laddar om sidan
- **Modern UI**: Snygg och responsiv design

## 🚀 Snabb Start

### Lokal utveckling

1. **Klona projektet:**
```bash
git clone <repository-url>
cd my-editor-app
```

2. **Installera beroenden:**
```bash
npm install
```

3. **Konfigurera miljövariabler:**
Skapa en `.env.local` fil med:
```
REACT_APP_SUPABASE_URL=https://btbrdiaanylvjttuyyoq.supabase.co
REACT_APP_SUPABASE_ANON_KEY=sb_publishable_9t8tb-nCBTTqCqAylVDZcQ_T3T0yVcm
```

4. **Starta utvecklingsservern:**
```bash
npm start
```

5. **Öppna [http://localhost:3000](http://localhost:3000)** i din webbläsare

### Deployment

#### Snabb deployment med Vercel (Rekommenderat)

1. **Bygg appen:**
```bash
npm run build
```

2. **Deploya till Vercel:**
   - Gå till [vercel.com](https://vercel.com)
   - Logga in och klicka "New Project"
   - Dra och släpp `build`-mappen
   - Konfigurera miljövariabler (se ovan)
   - Klicka "Deploy"

#### Alternativa plattformar

- **Netlify**: Dra och släpp `build`-mappen till [netlify.com](https://netlify.com)
- **GitHub Pages**: Se `DEPLOYMENT.md` för instruktioner
- **Firebase Hosting**: Se `DEPLOYMENT.md` för instruktioner

## 🛠️ Teknisk Stack

- **React 19**: Senaste versionen av React
- **Tiptap**: Kraftfull rich text editor
- **Supabase**: Backend-as-a-Service för databas
- **CSS**: Modern styling med flexbox och CSS Grid

## 📁 Projektstruktur

```
my-editor-app/
├── src/
│   ├── App.js              # Huvudkomponent
│   ├── Editor.js           # Tiptap editor-komponent
│   ├── supabase.js         # Supabase-konfiguration
│   └── App.css             # Styling
├── public/                 # Statiska filer
├── build/                  # Produktionsbygg (genereras)
├── .env.local             # Miljövariabler (skapa själv)
└── DEPLOYMENT.md          # Deployment-instruktioner
```

## 🔧 Konfiguration

### Miljövariabler

Skapa en `.env.local` fil i projektets rot:

```bash
REACT_APP_SUPABASE_URL=https://btbrdiaanylvjttuyyoq.supabase.co
REACT_APP_SUPABASE_ANON_KEY=sb_publishable_9t8tb-nCBTTqCqAylVDZcQ_T3T0yVcm
```

### Supabase Setup

1. Gå till [supabase.com](https://supabase.com)
2. Skapa ett nytt projekt
3. Kör SQL-koden från `supabase-setup.sql` i SQL Editor
4. Kopiera URL och API-nyckel till `.env.local`

## 🎯 Användning

- **Skriv text** direkt i redigeringsområdet
- **Formatera text** med verktygsfältet (Bold, Italic, etc.)
- **Auto-save** - text sparas automatiskt när du skriver
- **Persistens** - text finns kvar när du laddar om sidan

## 🐛 Felsökning

### Vanliga problem:

1. **"Supabase miljövariabler saknas"**
   - Kontrollera att `.env.local` finns och innehåller rätt värden
   - Starta om utvecklingsservern

2. **"Tabellen documents finns inte"**
   - Kör SQL-koden från `supabase-setup.sql` i Supabase SQL Editor

3. **"Build fails"**
   - Kontrollera att alla dependencies är installerade: `npm install`
   - Rensa cache: `npm start -- --reset-cache`

## 📚 Resurser

- [React Documentation](https://reactjs.org/docs/)
- [Tiptap Documentation](https://tiptap.dev/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Deployment](https://vercel.com/docs)

## 🤝 Bidrag

1. Forka projektet
2. Skapa en feature branch (`git checkout -b feature/AmazingFeature`)
3. Committa dina ändringar (`git commit -m 'Add some AmazingFeature'`)
4. Pusha till branchen (`git push origin feature/AmazingFeature`)
5. Öppna en Pull Request

## 📄 Licens

Detta projekt är licensierat under MIT License - se [LICENSE](LICENSE) filen för detaljer.

## 🎉 Gratulerar!

Din Tiptap Editor är nu redo att användas! 🚀
