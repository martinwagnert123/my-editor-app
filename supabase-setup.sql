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

-- Lägg till RLS (Row Level Security) om du vill
-- ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Skapa en policy som tillåter alla operationer (för enkelhet)
-- CREATE POLICY "Allow all operations" ON documents FOR ALL USING (true);
