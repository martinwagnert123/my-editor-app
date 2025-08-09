# Supabase Setup Guide

## Steg 1: Skapa en Supabase-projekt

1. Gå till [supabase.com](https://supabase.com)
2. Skapa ett nytt projekt
3. Välj en databas-region nära dig
4. Skapa projektet

## Steg 2: Hämta dina API-nycklar

1. Gå till Settings > API i ditt Supabase-projekt
2. Kopiera:
   - **Project URL** (ser ut som: `https://your-project-id.supabase.co`)
   - **anon public** key (börjar med `eyJ...`)

## Steg 3: Skapa .env fil

Skapa en fil som heter `.env` i projektets rot och lägg till:

```
REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
```

## Steg 4: Skapa databastabellen

1. Gå till SQL Editor i Supabase Dashboard
2. Kör följande SQL-kod:

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

## Steg 5: Starta om appen

```bash
npm start
```

Nu borde din editor spara text automatiskt när du skriver och ladda innehållet när du laddar om sidan!
