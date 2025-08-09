// Google Drive Integration Component
import React, { useState, useEffect } from 'react';

const GoogleDriveIntegration = ({ editor }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [documents, setDocuments] = useState([]);

  // Google Drive API konfiguration
  const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';
  const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY || '';
  const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
  const SCOPES = 'https://www.googleapis.com/auth/drive.file';

  useEffect(() => {
    // Ladda Google API
    const loadGoogleAPI = () => {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = () => {
        window.gapi.load('client:auth2', initClient);
      };
      document.head.appendChild(script);
    };

    loadGoogleAPI();
  }, []);

  const initClient = () => {
    window.gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
    }).then(() => {
      // Kontrollera om användaren är inloggad
      if (window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
        setIsAuthenticated(true);
        loadDocuments();
      }
    }).catch((error) => {
      console.error('Google API init fel:', error);
    });
  };

  const signIn = () => {
    window.gapi.auth2.getAuthInstance().signIn().then(() => {
      setIsAuthenticated(true);
      loadDocuments();
    }).catch((error) => {
      console.error('Inloggningsfel:', error);
    });
  };

  const signOut = () => {
    window.gapi.auth2.getAuthInstance().signOut().then(() => {
      setIsAuthenticated(false);
      setDocuments([]);
    });
  };

  const loadDocuments = async () => {
    setIsLoading(true);
    try {
      const response = await window.gapi.client.drive.files.list({
        pageSize: 10,
        fields: 'files(id, name, mimeType, modifiedTime)',
        q: "mimeType='application/vnd.google-apps.document'"
      });

      setDocuments(response.result.files || []);
    } catch (error) {
      console.error('Fel vid laddning av dokument:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const exportToGoogleDocs = async () => {
    if (!editor) return;
    
    setIsLoading(true);
    try {
      const content = editor.getHTML();
      const fileName = `Document-${new Date().toISOString().split('T')[0]}`;
      
      // Skapa HTML-fil
      const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>${fileName}</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 20px; }
        h1, h2, h3 { color: #333; }
        code { background: #f4f4f4; padding: 2px 4px; border-radius: 3px; }
        p { margin: 0 0 1em 0; }
    </style>
</head>
<body>
    ${content}
</body>
</html>`;

      // Ladda upp till Google Drive
      const file = new Blob([htmlContent], { type: 'text/html' });
      const metadata = {
        name: `${fileName}.html`,
        mimeType: 'text/html'
      };

      const form = new FormData();
      form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
      form.append('file', file);

      const accessToken = window.gapi.auth.getToken().access_token;
      
      const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        body: form
      });

      if (response.ok) {
        alert('Dokument exporterat till Google Drive!');
        loadDocuments();
      } else {
        throw new Error('Export misslyckades');
      }
    } catch (error) {
      console.error('Export fel:', error);
      alert('Fel vid export: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const importFromGoogleDocs = async (fileId) => {
    setIsLoading(true);
    try {
      const response = await window.gapi.client.drive.files.get({
        fileId: fileId,
        alt: 'media'
      });

      const content = response.body;
      const htmlContent = convertGoogleDocsToHtml(content);
      
      if (editor) {
        editor.commands.setContent(htmlContent);
        alert('Dokument importerat framgångsrikt!');
      }
    } catch (error) {
      console.error('Import fel:', error);
      alert('Fel vid import: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const convertGoogleDocsToHtml = (content) => {
    // Enkel konvertering - kan förbättras
    return content.replace(/<[^>]*>/g, '').replace(/\n/g, '<br>');
  };

  if (!CLIENT_ID || !API_KEY) {
    return (
      <div className="google-drive-integration">
        <h3>Google Drive Integration</h3>
        <p>Google Drive integration är inte konfigurerad. Lägg till GOOGLE_CLIENT_ID och GOOGLE_API_KEY i miljövariablerna.</p>
      </div>
    );
  }

  return (
    <div className="google-drive-integration">
      <h3>Google Drive Integration</h3>
      
      {!isAuthenticated ? (
        <button onClick={signIn} className="sign-in-button">
          Logga in med Google
        </button>
      ) : (
        <div>
          <button onClick={signOut} className="sign-out-button">
            Logga ut
          </button>
          
          <div className="integration-buttons">
            <button
              onClick={exportToGoogleDocs}
              disabled={isLoading}
              className="export-button"
            >
              {isLoading ? 'Exporterar...' : 'Exportera till Google Drive'}
            </button>
          </div>
          
          {isLoading && <p>Laddar dokument...</p>}
          
          {documents.length > 0 && (
            <div className="documents-list">
              <h4>Dina Google Docs:</h4>
              <ul>
                {documents.map((doc) => (
                  <li key={doc.id}>
                    <span>{doc.name}</span>
                    <button
                      onClick={() => importFromGoogleDocs(doc.id)}
                      disabled={isLoading}
                      className="import-button"
                    >
                      Importera
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GoogleDriveIntegration;
