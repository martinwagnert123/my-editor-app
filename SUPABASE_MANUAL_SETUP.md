# Supabase Manual Setup

## Steg 1: Öppna Supabase Dashboard

1. Gå till [supabase.com](https://supabase.com)
2. Logga in och välj ditt projekt: `btbrdiaanylvjttuyyoq`

## Steg 2: Skapa documents-tabellen

1. Gå till **SQL Editor** i vänstermenyn
2. Klicka på **"New query"**
3. Kopiera och klistra in följande SQL-kod:

```sql
-- Skapa tabellen för dokument
CREATE TABLE IF NOT EXISTS documents (
  id BIGINT PRIMARY KEY,
  content TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Skapa en trigger för att automatiskt uppdatera updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_documents_updated_at 
    BEFORE UPDATE ON documents 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
```

4. Klicka på **"Run"** för att köra SQL-koden

## Steg 3: Verifiera att tabellen skapades

1. Gå till **Table Editor** i vänstermenyn
2. Du borde se `documents`-tabellen i listan
3. Klicka på tabellen för att se strukturen

## Steg 4: Testa appen

1. Gå tillbaka till din React-app
2. Klicka på **"Testa Supabase-anslutning"** knappen
3. Du borde se: "✅ Anslutning lyckades! Tabellen "documents" finns och fungerar."

## Steg 5: Testa editor-funktionaliteten

1. Skriv något i editorn
2. Du borde se "Sparar..." och sedan "Sparad!" i statusfältet
3. Ladda om sidan - din text borde finnas kvar!

## Felsökning

Om du får fel:

1. **"relation does not exist"** → Kör SQL-koden ovan
2. **"permission denied"** → Kontrollera att du är inloggad på rätt projekt
3. **"network error"** → Kontrollera internetanslutning

## Kontakt

Om du fortfarande har problem, kontrollera:
- Att du är inloggad på rätt Supabase-projekt
- Att SQL-koden kördes framgångsrikt
- Att `.env.local` innehåller rätt värden
