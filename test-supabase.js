// Test script för Supabase-anslutning
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://btbrdiaanylvjttuyyoq.supabase.co'
const supabaseAnonKey = 'sb_publishable_9t8tb-nCBTTqCqAylVDZcQ_T3T0yVcm'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
  console.log('🔍 Testar Supabase-anslutning...')
  
  try {
    // Testa anslutningen
    const { data, error } = await supabase.from('documents').select('*').limit(1)
    
    if (error) {
      console.log('❌ Tabellen "documents" finns inte än. Skapar den...')
      await createTable()
    } else {
      console.log('✅ Anslutning lyckades! Tabellen "documents" finns redan.')
    }
  } catch (error) {
    console.error('❌ Anslutningsfel:', error)
  }
}

async function createTable() {
  console.log('🏗️ Skapar documents-tabellen...')
  
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS documents (
      id BIGINT PRIMARY KEY,
      content TEXT NOT NULL DEFAULT '',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `
  
  const createTriggerSQL = `
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
    END;
    $$ language 'plpgsql';
    
    DROP TRIGGER IF EXISTS update_documents_updated_at ON documents;
    CREATE TRIGGER update_documents_updated_at 
        BEFORE UPDATE ON documents 
        FOR EACH ROW 
        EXECUTE FUNCTION update_updated_at_column();
  `
  
  try {
    // Skapa tabellen
    const { error: tableError } = await supabase.rpc('exec_sql', { sql: createTableSQL })
    if (tableError) {
      console.log('ℹ️ Tabellen kanske redan finns eller behöver skapas manuellt')
    }
    
    // Skapa trigger
    const { error: triggerError } = await supabase.rpc('exec_sql', { sql: createTriggerSQL })
    if (triggerError) {
      console.log('ℹ️ Trigger kanske redan finns eller behöver skapas manuellt')
    }
    
    console.log('✅ Tabell och trigger skapade (eller fanns redan)!')
  } catch (error) {
    console.log('ℹ️ Kunde inte skapa tabellen via RPC. Du behöver skapa den manuellt i SQL Editor.')
    console.log('Kör följande SQL i Supabase SQL Editor:')
    console.log(createTableSQL)
    console.log(createTriggerSQL)
  }
}

// Kör testet
testConnection()
