# Min Tiptap Editor

En kraftfull textredigerare byggd med React och Tiptap, med stöd för Supabase-persistens och Notion-integration.

## ✨ Funktioner

- 🎨 **Rik textredigering** - Bold, italic, headings, lists, code blocks
- 💾 **Automatisk sparande** - Innehåll sparas automatiskt till Supabase
- 🔄 **Notion-integration** - Skapa och synka sidor med Notion
- 📁 **Google Docs-integration** - Exportera/importera till Google Docs
- 🎯 **Modern UI** - Snygg och responsiv design
- ⚡ **Real-time** - Automatisk synkronisering
- 🌐 **Live deployment** - Deployad på Vercel

## 🚀 Snabb Start

### Lokal Utveckling

1. **Klona projektet**
   ```bash
   git clone <your-repo-url>
   cd my-editor-app
   ```

2. **Installera dependencies**
   ```bash
   npm install
   ```

3. **Konfigurera miljövariabler**
   ```bash
   # Skapa .env.local fil
   cp env-example.txt .env.local
   # Redigera .env.local med dina värden
   ```

4. **Starta utvecklingsservern**
   ```bash
   npm start
   ```

5. **Öppna appen**
   - Gå till `http://localhost:3000`
   - Redigera text i editorn
   - Innehållet sparas automatiskt

### Deployment till Vercel

1. **Förbered appen**
   ```bash
   npm run build
   ```

2. **Deploya till Vercel**
   ```bash
   # Installera Vercel CLI
   npm install -g vercel
   
   # Deploya
   vercel --prod
   ```

3. **Konfigurera miljövariabler i Vercel**
   - Gå till Vercel Dashboard → Settings → Environment Variables
   - Lägg till `REACT_APP_SUPABASE_URL` och `REACT_APP_SUPABASE_ANON_KEY`
   - Lägg till `REACT_APP_NOTION_TOKEN` och `REACT_APP_NOTION_DATABASE_ID` (för Notion-integration)

## 🛠️ Teknisk Stack

- **Frontend**: React 19.1.1
- **Editor**: Tiptap 3.0.9
- **Backend**: Supabase 2.54.0
- **Styling**: CSS3
- **Deployment**: Vercel
- **Integration**: Notion API, Google Drive API

## 📁 Projektstruktur

```
my-editor-app/
├── public/                 # Statiska filer
├── src/
│   ├── App.js             # Huvudkomponent
│   ├── Editor.js          # Tiptap editor
│   ├── supabase.js        # Supabase konfiguration
│   ├── NotionIntegration.js # Notion integration
│   ├── GoogleDocsIntegration.js # Google Docs integration
│   └── App.css            # Styling
├── package.json           # Dependencies
├── vercel.json           # Vercel konfiguration
└── README.md             # Dokumentation
```

## ⚙️ Konfiguration

### Miljövariabler

Skapa en `.env.local` fil i projektets rot:

```bash
# Supabase
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key

# Notion (valfritt)
REACT_APP_NOTION_TOKEN=secret_your_integration_token
REACT_APP_NOTION_DATABASE_ID=your_database_id

# Google Drive (valfritt)
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
REACT_APP_GOOGLE_API_KEY=your_google_api_key
```

### Supabase Setup

1. **Skapa Supabase projekt**
   - Gå till [supabase.com](https://supabase.com)
   - Skapa nytt projekt
   - Kopiera URL och anon key

2. **Skapa databastabell**
   ```sql
   -- Kör detta i Supabase SQL Editor
   CREATE TABLE IF NOT EXISTS documents (
     id BIGINT PRIMARY KEY,
     content TEXT NOT NULL DEFAULT '',
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

3. **Konfigurera RLS (valfritt)**
   ```sql
   ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
   CREATE POLICY "Allow all operations" ON documents FOR ALL USING (true);
   ```

### Notion Setup

Se [NOTION_SETUP.md](./NOTION_SETUP.md) för detaljerade instruktioner.

## 🎯 Användning

### Grundläggande Redigering

1. **Öppna editorn** - Klicka i redigeringsområdet
2. **Använd verktygsfältet** - Bold, italic, headings, lists
3. **Automatisk sparande** - Innehållet sparas automatiskt
4. **Ladda innehåll** - Innehållet laddas automatiskt vid start

### Notion-integration

1. **Konfigurera Notion** - Följ instruktionerna i `NOTION_SETUP.md`
2. **Skapa sida** - Klicka "Visa Notion" → "Skapa Notion-sida"
3. **Synka innehåll** - Använd "Synka till Notion" och "Hämta från Notion"
4. **Hantera sidor** - Se aktuell sida och koppla från vid behov

### Google Docs-integration

1. **Exportera** - Klicka "Visa Google Docs" → "Exportera till HTML"
2. **Importera** - Använd "Importera från HTML-fil"
3. **Google Drive** - Konfigurera för fullständig integration

## 🔧 Felsökning

### Vanliga Problem

**"Fel vid sparande"**
- Kontrollera Supabase-anslutning
- Verifiera miljövariabler
- Kontrollera internetanslutning

**"Notion integration är inte konfigurerad"**
- Lägg till `REACT_APP_NOTION_TOKEN` och `REACT_APP_NOTION_DATABASE_ID`
- Följ instruktionerna i `NOTION_SETUP.md`

**"Build failed på Vercel"**
- Kontrollera miljövariabler i Vercel Dashboard
- Verifiera att alla dependencies är installerade

### Debugging

1. **Kontrollera konsolen** - Öppna Developer Tools (F12)
2. **Verifiera nätverk** - Kontrollera Network-tabben
3. **Testa anslutningar** - Använd test-knapparna i appen

## 📚 Resurser

- [Tiptap Documentation](https://tiptap.dev/)
- [Supabase Documentation](https://supabase.com/docs)
- [Notion API Documentation](https://developers.notion.com/)
- [React Documentation](https://react.dev/)
- [Vercel Documentation](https://vercel.com/docs)

## 🤝 Bidrag

1. Forka projektet
2. Skapa feature branch (`git checkout -b feature/AmazingFeature`)
3. Committa ändringar (`git commit -m 'Add some AmazingFeature'`)
4. Pusha till branch (`git push origin feature/AmazingFeature`)
5. Öppna Pull Request

## 📄 Licens

Detta projekt är licensierat under MIT License - se [LICENSE](LICENSE) filen för detaljer.

## 🆘 Support

Om du stöter på problem:

1. Kontrollera [Felsökning](#felsökning) sektionen
2. Sök i [Issues](../../issues)
3. Skapa nytt issue med detaljerad beskrivning
4. Kontakta utvecklaren

---

**Lycka till med din textredigerare! 🎉**
