// Google Docs Integration Component
import React, { useState } from 'react';

const GoogleDocsIntegration = ({ editor }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  // Exportera till Google Docs format
  const exportToGoogleDocs = async () => {
    if (!editor) return;
    
    setIsExporting(true);
    try {
      const content = editor.getHTML();
      const googleDocsContent = convertHtmlToGoogleDocsFormat(content);
      
      const blob = new Blob([googleDocsContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `document-${new Date().toISOString().split('T')[0]}.html`;
      a.click();
      
      URL.revokeObjectURL(url);
      
      alert('Dokument exporterat! Öppna filen i Google Docs för att fortsätta redigera.');
    } catch (error) {
      console.error('Export fel:', error);
      alert('Fel vid export: ' + error.message);
    } finally {
      setIsExporting(false);
    }
  };

  // Importera från Google Docs
  const importFromGoogleDocs = async (event) => {
    const file = event.target.files[0];
    if (!file || !editor) return;
    
    setIsImporting(true);
    try {
      const text = await file.text();
      const htmlContent = convertGoogleDocsFormatToHtml(text);
      editor.commands.setContent(htmlContent);
      alert('Dokument importerat framgångsrikt!');
    } catch (error) {
      console.error('Import fel:', error);
      alert('Fel vid import: ' + error.message);
    } finally {
      setIsImporting(false);
    }
  };

  const convertHtmlToGoogleDocsFormat = (html) => {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Exporterat dokument</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        h1, h2, h3 { color: #333; }
        code { background: #f4f4f4; padding: 2px 4px; border-radius: 3px; }
    </style>
</head>
<body>
    ${html}
</body>
</html>`;
  };

  const convertGoogleDocsFormatToHtml = (text) => {
    return text.replace(/<body[^>]*>([\s\S]*)<\/body>/i, '$1');
  };

  return (
    <div className="google-docs-integration">
      <h3>Google Docs Integration</h3>
      
      <div className="integration-buttons">
        <button
          onClick={exportToGoogleDocs}
          disabled={isExporting}
          className="export-button"
        >
          {isExporting ? 'Exporterar...' : 'Exportera till Google Docs'}
        </button>
        
        <label className="import-button">
          {isImporting ? 'Importerar...' : 'Importera från Google Docs'}
          <input
            type="file"
            accept=".html,.htm"
            onChange={importFromGoogleDocs}
            style={{ display: 'none' }}
          />
        </label>
      </div>
      
      <div className="integration-help">
        <p><strong>Exportera:</strong> Laddar ner ditt dokument som HTML-fil som du kan öppna i Google Docs</p>
        <p><strong>Importera:</strong> Laddar upp en HTML-fil från Google Docs till editorn</p>
      </div>
    </div>
  );
};

export default GoogleDocsIntegration;
