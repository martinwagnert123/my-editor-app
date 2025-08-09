// src/Editor.js
import React, { useEffect, useState, useCallback } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { supabase } from './supabase'

const Editor = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [saveStatus, setSaveStatus] = useState('')
  const [error, setError] = useState('')

  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Laddar innehåll...</p>',
    onUpdate: ({ editor }) => {
      // Auto-save när innehållet ändras
      const content = editor.getHTML()
      saveContent(content)
    },
  })

  // Debug-funktion för att kontrollera Supabase-anslutning
  const testSupabaseConnection = async () => {
    try {
      if (process.env.NODE_ENV === 'development') {
        console.log('🔍 Testar Supabase-anslutning...')
        console.log('URL:', process.env.REACT_APP_SUPABASE_URL ? '✅ Konfigurerad' : '❌ Saknas')
        console.log('Key:', process.env.REACT_APP_SUPABASE_ANON_KEY ? '✅ Konfigurerad' : '❌ Saknas')
      }
      
      if (!process.env.REACT_APP_SUPABASE_URL || !process.env.REACT_APP_SUPABASE_ANON_KEY) {
        throw new Error('Supabase miljövariabler saknas')
      }

      // Testa anslutningen genom att hämta en tom lista
      const { error } = await supabase.from('documents').select('id').limit(1)
      
      if (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('❌ Supabase-anslutning misslyckades:', error)
        }
        return false
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.log('✅ Supabase-anslutning lyckades!')
        }
        return true
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('❌ Supabase-test fel:', error)
      }
      return false
    }
  }

  // Funktion för att spara innehåll till Supabase
  const saveContent = async (content) => {
    try {
      setSaveStatus('Sparar...')
      setError('')
      
      // Testa anslutningen först
      const isConnected = await testSupabaseConnection()
      if (!isConnected) {
        throw new Error('Kan inte ansluta till Supabase. Kontrollera .env.local filen och internetanslutning.')
      }

      const { error } = await supabase
        .from('documents')
        .upsert(
          { 
            id: 1, // Vi använder ID 1 för denna dokument
            content: content,
            updated_at: new Date().toISOString()
          },
          { onConflict: 'id' }
        )

      if (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Supabase fel:', error)
        }
        setError(`Databasfel: ${error.message}`)
        setSaveStatus('Fel vid sparande')
      } else {
        setSaveStatus('Sparad!')
        setError('')
        // Dölj status efter 2 sekunder
        setTimeout(() => setSaveStatus(''), 2000)
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Fel vid sparande:', error)
      }
      setError(`Sparfel: ${error.message}`)
      setSaveStatus('Fel vid sparande')
    }
  }

  // Funktion för att hämta innehåll från Supabase
  const loadContent = useCallback(async () => {
    try {
      setIsLoading(true)
      setError('')
      
      // Testa anslutningen först
      const isConnected = await testSupabaseConnection()
      if (!isConnected) {
        throw new Error('Kan inte ansluta till Supabase. Kontrollera .env.local filen och internetanslutning.')
      }
      
      const { data, error } = await supabase
        .from('documents')
        .select('content')
        .eq('id', 1)
        .single()

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        if (process.env.NODE_ENV === 'development') {
          console.error('Fel vid hämtning:', error)
        }
        setError(`Hämtningsfel: ${error.message}`)
        // Sätt standardinnehåll om det inte finns något sparat
        if (editor) {
          editor.commands.setContent('<p>Skriv här...</p>')
        }
      } else if (data && data.content) {
        // Uppdatera editorn med sparat innehåll
        if (editor) {
          editor.commands.setContent(data.content)
        }
      } else {
        // Sätt standardinnehåll om det inte finns något sparat
        if (editor) {
          editor.commands.setContent('<p>Skriv här...</p>')
        }
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Fel vid hämtning:', error)
      }
      setError(`Hämtningsfel: ${error.message}`)
      if (editor) {
        editor.commands.setContent('<p>Skriv här...</p>')
      }
    } finally {
      setIsLoading(false)
    }
  }, [editor])

  // Ladda innehåll när editorn är redo
  useEffect(() => {
    if (editor) {
      loadContent()
    }
  }, [editor, loadContent])

  if (!editor) {
    return <div>Laddar editor...</div>
  }

  return (
    <div className="editor-container">
      <div className="editor-header">
        <div className="editor-toolbar">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'is-active' : ''}
          >
            Bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}
          >
            Italic
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'is-active' : ''}
          >
            Strike
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            className={editor.isActive('code') ? 'is-active' : ''}
          >
            Code
          </button>
          <button
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={editor.isActive('paragraph') ? 'is-active' : ''}
          >
            Paragraph
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
          >
            H1
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
          >
            H2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}
          >
            Bullet List
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'is-active' : ''}
          >
            Ordered List
          </button>
        </div>
        <div className="save-status">
          {isLoading ? 'Laddar...' : saveStatus}
        </div>
      </div>
      {error && (
        <div className="error-message">
          <strong>Fel:</strong> {error}
        </div>
      )}
      <EditorContent editor={editor} />
    </div>
  )
}

export default Editor
