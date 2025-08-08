// src/Editor.js
import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const Editor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello Tiptap!</p>',
  })

  return <EditorContent editor={editor} />
}

export default Editor
