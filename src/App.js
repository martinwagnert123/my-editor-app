import React, { useState } from 'react'
import './App.css'
import Editor from './Editor'
import { supabase } from './supabase'

function App() {
  const [testResult, setTestResult] = useState('')
  const [isTesting, setIsTesting] = useState(false)

  const testSupabase = async () => {
    try {
      setIsTesting(true)
      setTestResult('Testar anslutning...')
      
      // Test 1: Grundläggande anslutning
      const { error } = await supabase.from('documents').select('id').limit(1)
      
      if (error) {
        if (error.code === 'PGRST116') {
          // Tabellen finns men är tom - det är OK
          setTestResult('✅ Anslutning lyckades! Tabellen "documents" finns men är tom.')
        } else if (error.message.includes('relation "documents" does not exist')) {
          setTestResult('⚠️ Tabellen "documents" finns inte. Skapar den...')
          await createTable()
        } else {
          setTestResult(`❌ Fel: ${error.message}`)
        }
      } else {
        setTestResult('✅ Anslutning lyckades! Tabellen "documents" finns och fungerar.')
      }
    } catch (error) {
      setTestResult(`❌ Fel: ${error.message}`)
    } finally {
      setIsTesting(false)
    }
  }

  const createTable = async () => {
    try {
      setTestResult('Skapar tabellen...')
      
      // Försök skapa tabellen via SQL
      const createTableSQL = `
        CREATE TABLE IF NOT EXISTS documents (
          id BIGINT PRIMARY KEY,
          content TEXT NOT NULL DEFAULT '',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
      
      // Notera: Detta kommer troligen inte fungera via frontend, men vi kan testa
      const { error } = await supabase.rpc('exec_sql', { sql: createTableSQL })
      
      if (error) {
        setTestResult('⚠️ Kunde inte skapa tabellen via frontend. Du behöver skapa den manuellt i Supabase SQL Editor.')
      } else {
        setTestResult('✅ Tabellen skapades framgångsrikt!')
      }
    } catch (error) {
      setTestResult('⚠️ Du behöver skapa tabellen manuellt. Se instruktioner nedan.')
    }
  }

  return (
    <div className="App">
      <h1>Min Tiptap Editor</h1>
      <p>En kraftfull textredigerare byggd med React och Tiptap</p>
      
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f3f4f6', borderRadius: '8px', border: '1px solid #d1d5db' }}>
        <button 
          onClick={testSupabase} 
          disabled={isTesting}
          style={{ 
            marginRight: '10px',
            padding: '8px 16px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isTesting ? 'not-allowed' : 'pointer'
          }}
        >
          {isTesting ? 'Testar...' : 'Testa Supabase-anslutning'}
        </button>
        {testResult && (
          <div style={{ marginTop: '10px', padding: '8px', backgroundColor: 'white', borderRadius: '4px' }}>
            {testResult}
          </div>
        )}
      </div>
      
      <Editor />
    </div>
  )
}

export default App

