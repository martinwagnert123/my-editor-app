# Google Docs Integration Setup

## 🎯 Översikt

Din Tiptap Editor har nu stöd för Google Docs integration! Detta låter dig:

- **Exportera** dokument till Google Docs format
- **Importera** dokument från Google Docs
- **Synka** innehåll mellan din editor och Google Drive

## 🚀 Snabb Start

### Alternativ 1: Enkel Export/Import (Rekommenderat)

1. **Klicka på "Visa Google Docs"** knappen i editorn
2. **Exportera:** Klicka "Exportera till Google Docs" för att ladda ner en HTML-fil
3. **Öppna i Google Docs:** Ladda upp HTML-filen till Google Docs
4. **Importera:** Ladda ner från Google Docs som HTML och importera tillbaka

### Alternativ 2: Fullständig Google Drive Integration

För fullständig integration behöver du konfigurera Google Drive API:

## 🔧 Google Drive API Setup

### Steg 1: Skapa Google Cloud Project

1. Gå till [Google Cloud Console](https://console.cloud.google.com/)
2. Skapa ett nytt projekt eller välj befintligt
3. Aktivera Google Drive API

### Steg 2: Konfigurera OAuth 2.0

1. Gå till "Credentials" i vänstermenyn
2. Klicka "Create Credentials" > "OAuth 2.0 Client IDs"
3. Välj "Web application"
4. Lägg till dina domäner:
   - `http://localhost:3000` (för utveckling)
   - `https://your-app.vercel.app` (för produktion)
5. Kopiera Client ID och API Key

### Steg 3: Konfigurera miljövariabler

Lägg till i din `.env.local` fil:

```bash
REACT_APP_GOOGLE_CLIENT_ID=your-oauth-client-id
REACT_APP_GOOGLE_API_KEY=your-api-key
```

### Steg 4: Konfigurera Vercel

Lägg till samma miljövariabler i Vercel Dashboard:

1. Gå till ditt Vercel-projekt
2. Settings > Environment Variables
3. Lägg till:
   - `REACT_APP_GOOGLE_CLIENT_ID` = din OAuth Client ID
   - `REACT_APP_GOOGLE_API_KEY` = din API Key

## 📁 Filformat

### Exporterade filer
- **Format:** HTML
- **Innehåll:** Formaterad text med CSS-styling
- **Kompatibilitet:** Kan öppnas i Google Docs, Word, etc.

### Importerade filer
- **Format:** HTML från Google Docs
- **Konvertering:** Automatisk konvertering till Tiptap-format
- **Bevarande:** Formatering bevaras så mycket som möjligt

## 🎯 Funktioner

### Export-funktioner
- ✅ **HTML-export** - Ladda ner som HTML-fil
- ✅ **Formatering bevaras** - Bold, italic, rubriker, etc.
- ✅ **Automatisk namngivning** - Datum-baserade filnamn
- ✅ **Google Docs kompatibel** - Kan öppnas direkt i Google Docs

### Import-funktioner
- ✅ **HTML-import** - Ladda upp HTML-filer
- ✅ **Automatisk konvertering** - Konverterar till Tiptap-format
- ✅ **Formatering bevaras** - Bevarar så mycket formatering som möjligt
- ✅ **Felhantering** - Tydliga felmeddelanden

### Google Drive Integration
- ✅ **OAuth-autentisering** - Säker inloggning med Google
- ✅ **Dokumentlista** - Visa dina Google Docs
- ✅ **Direkt export** - Exportera direkt till Google Drive
- ✅ **Direkt import** - Importera direkt från Google Drive

## 🐛 Felsökning

### Vanliga problem:

1. **"Google Drive integration är inte konfigurerad"**
   - Kontrollera att miljövariablerna är konfigurerade
   - Verifiera att Google Drive API är aktiverat

2. **"OAuth-fel"**
   - Kontrollera att Client ID och API Key är korrekta
   - Verifiera att domänerna är tillagda i OAuth-konfigurationen

3. **"Import/Export fel"**
   - Kontrollera filformatet (HTML)
   - Verifiera att filen inte är korrupt

4. **"CORS-fel"**
   - Kontrollera att domänerna är tillagda i Google Cloud Console
   - Verifiera att API:et är aktiverat

## 📚 Resurser

- [Google Drive API Documentation](https://developers.google.com/drive/api)
- [Google OAuth 2.0 Guide](https://developers.google.com/identity/protocols/oauth2)
- [Google Cloud Console](https://console.cloud.google.com/)

## 🎉 Gratulerar!

Din Tiptap Editor har nu fullständig Google Docs integration! 🚀
