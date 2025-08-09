# Notion Integration Setup Guide

Denna guide hjälper dig att konfigurera Notion-integrationen för din Tiptap editor.

## 🎯 Vad du får

- ✅ Skapa nya Notion-sidor direkt från editorn
- ✅ Synka innehåll till Notion automatiskt
- ✅ Hämta innehåll från Notion
- ✅ Real-time synkronisering
- ✅ Strukturerad data i Notion

## 📋 Steg-för-steg Setup

### 1. Skapa Notion Integration

1. Gå till [Notion Integrations](https://www.notion.so/my-integrations)
2. Klicka på **"New integration"**
3. Fyll i:
   - **Name**: `Min Tiptap Editor`
   - **Associated workspace**: Välj din workspace
   - **Capabilities**: 
     - ✅ Read content
     - ✅ Update content
     - ✅ Insert content
4. Klicka **"Submit"**
5. Kopiera **Internal Integration Token** (ser ut som `secret_...`)

### 2. Skapa Notion Database

1. Öppna Notion och skapa en ny sida
2. Skapa en **Database** (Full page database)
3. Klicka på **"..."** i övre högra hörnet
4. Välj **"Add connections"**
5. Hitta din integration och klicka **"Confirm"**
6. Kopiera **Database ID** från URL:en:
   ```
   https://www.notion.so/your-workspace/DATABASE-ID?v=...
   ```

### 3. Konfigurera Miljövariabler

#### Lokal utveckling (.env.local)

```bash
# Notion Integration
REACT_APP_NOTION_TOKEN=secret_your_integration_token_here
REACT_APP_NOTION_DATABASE_ID=your_database_id_here
```

#### Vercel Deployment

1. Gå till [Vercel Dashboard](https://vercel.com/dashboard)
2. Välj ditt projekt
3. Gå till **Settings** → **Environment Variables**
4. Lägg till:
   - **Name**: `REACT_APP_NOTION_TOKEN`
   - **Value**: `secret_your_integration_token_here`
   - **Environment**: Production, Preview, Development
5. Lägg till:
   - **Name**: `REACT_APP_NOTION_DATABASE_ID`
   - **Value**: `your_database_id_here`
   - **Environment**: Production, Preview, Development
6. Klicka **Save**

### 4. Testa Integrationen

1. Starta appen lokalt: `npm start`
2. Klicka på **"Visa Notion"** i editorn
3. Klicka **"Skapa Notion-sida"**
4. Kontrollera att sidan skapas i din Notion database

## 🔧 Felsökning

### "Notion integration är inte konfigurerad"

**Lösning:**
- Kontrollera att miljövariablerna är korrekt inställda
- Starta om utvecklingsservern efter att ha lagt till .env.local
- Kontrollera att variablerna börjar med `REACT_APP_`

### "Fel vid skapande av Notion-sida"

**Möjliga orsaker:**
- Integration token är felaktig
- Database ID är felaktigt
- Integrationen har inte rätt behörigheter
- Database är inte kopplad till integrationen

**Lösning:**
1. Kontrollera att integrationen är kopplad till databasen
2. Verifiera token och database ID
3. Kontrollera behörigheter i Notion integration settings

### "Fel vid synkning"

**Lösning:**
- Kontrollera internetanslutning
- Verifiera att sidan finns i Notion
- Kontrollera att integrationen har rätt behörigheter

## 📚 API Referens

### Notion API Endpoints

```javascript
// Skapa sida
await notion.pages.create({
  parent: { database_id: DATABASE_ID },
  properties: {
    title: { title: [{ text: { content: 'Titel' } }] }
  }
});

// Uppdatera innehåll
await notion.blocks.children.append({
  block_id: PAGE_ID,
  children: [/* blocks */]
});

// Hämta innehåll
await notion.blocks.children.list({
  block_id: PAGE_ID
});
```

## 🎨 Anpassning

### Anpassa Database Properties

Du kan anpassa vilka properties som skapas i din Notion database:

```javascript
// I NotionIntegration.js
const response = await notion.pages.create({
  parent: { database_id: DATABASE_ID },
  properties: {
    title: {
      title: [{ text: { content: title } }]
    },
    // Lägg till fler properties här
    status: {
      select: { name: 'Draft' }
    },
    last_updated: {
      date: { start: new Date().toISOString() }
    }
  }
});
```

### Anpassa Block Types

Du kan anpassa vilka block-typer som skapas:

```javascript
// Skapa olika block-typer
const blocks = [
  {
    object: 'block',
    type: 'heading_1',
    heading_1: {
      rich_text: [{ text: { content: 'Rubrik' } }]
    }
  },
  {
    object: 'block',
    type: 'paragraph',
    paragraph: {
      rich_text: [{ text: { content: 'Text' } }]
    }
  }
];
```

## 🚀 Nästa Steg

- [ ] Implementera automatisk synkronisering
- [ ] Lägg till stöd för fler block-typer
- [ ] Implementera real-time collaboration
- [ ] Lägg till stöd för Notion templates

## 📞 Support

Om du stöter på problem:

1. Kontrollera [Notion API Documentation](https://developers.notion.com/)
2. Verifiera att alla miljövariabler är korrekt inställda
3. Kontrollera behörigheter i Notion integration settings
4. Testa med en ny integration om problemet kvarstår

---

**Lycka till med din Notion-integration! 🎉**
