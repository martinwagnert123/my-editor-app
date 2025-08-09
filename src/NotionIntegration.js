// Notion Integration Component
import React, { useState, useEffect } from 'react';
import { Client } from '@notionhq/client';

const NotionIntegration = ({ editor }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notion, setNotion] = useState(null);
  const [currentPageId, setCurrentPageId] = useState('');
  const [pageTitle, setPageTitle] = useState('');
  const [syncStatus, setSyncStatus] = useState('');

  // Notion API konfiguration
  const NOTION_TOKEN = process.env.REACT_APP_NOTION_TOKEN || '';
  const DATABASE_ID = process.env.REACT_APP_NOTION_DATABASE_ID || '';

  useEffect(() => {
    if (NOTION_TOKEN) {
      const notionClient = new Client({ auth: NOTION_TOKEN });
      setNotion(notionClient);
      setIsConnected(true);
    }
  }, []);

  // Skapa en ny Notion-sida
  const createNotionPage = async () => {
    if (!notion || !DATABASE_ID) return;

    setIsLoading(true);
    setSyncStatus('Skapar Notion-sida...');

    try {
      const content = editor ? editor.getHTML() : '<p>Nytt dokument</p>';
      const title = pageTitle || `Dokument ${new Date().toLocaleDateString()}`;

      const response = await notion.pages.create({
        parent: { database_id: DATABASE_ID },
        properties: {
          title: {
            title: [
              {
                text: {
                  content: title
                }
              }
            ]
          }
        },
        children: [
          {
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: stripHtml(content)
                  }
                }
              ]
            }
          }
        ]
      });

      setCurrentPageId(response.id);
      setSyncStatus('Notion-sida skapad!');
      
      // Spara page ID i localStorage
      localStorage.setItem('notionPageId', response.id);
      localStorage.setItem('notionPageTitle', title);

    } catch (error) {
      console.error('Fel vid skapande av Notion-sida:', error);
      setSyncStatus('Fel vid skapande: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Synka innehåll till Notion
  const syncToNotion = async () => {
    if (!notion || !currentPageId) return;

    setIsLoading(true);
    setSyncStatus('Synkar till Notion...');

    try {
      const content = editor ? editor.getHTML() : '';
      const plainText = stripHtml(content);

      // Uppdatera sidans innehåll
      await notion.blocks.children.append({
        block_id: currentPageId,
        children: [
          {
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: plainText
                  }
                }
              ]
            }
          }
        ]
      });

      setSyncStatus('Synkad till Notion!');
      
      // Rensa status efter 3 sekunder
      setTimeout(() => setSyncStatus(''), 3000);

    } catch (error) {
      console.error('Fel vid synkning till Notion:', error);
      setSyncStatus('Fel vid synkning: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Hämta innehåll från Notion
  const syncFromNotion = async () => {
    if (!notion || !currentPageId) return;

    setIsLoading(true);
    setSyncStatus('Hämtar från Notion...');

    try {
      // Hämta sidans innehåll
      const response = await notion.blocks.children.list({
        block_id: currentPageId
      });

      let content = '';
      response.results.forEach(block => {
        if (block.type === 'paragraph' && block.paragraph.rich_text.length > 0) {
          content += block.paragraph.rich_text.map(text => text.plain_text).join('') + '\n';
        }
      });

      if (editor && content) {
        editor.commands.setContent(`<p>${content.replace(/\n/g, '</p><p>')}</p>`);
        setSyncStatus('Hämtat från Notion!');
      } else {
        setSyncStatus('Inget innehåll att hämta');
      }

      // Rensa status efter 3 sekunder
      setTimeout(() => setSyncStatus(''), 3000);

    } catch (error) {
      console.error('Fel vid hämtning från Notion:', error);
      setSyncStatus('Fel vid hämtning: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Ladda sparad page ID från localStorage
  useEffect(() => {
    const savedPageId = localStorage.getItem('notionPageId');
    const savedPageTitle = localStorage.getItem('notionPageTitle');
    
    if (savedPageId) {
      setCurrentPageId(savedPageId);
      setPageTitle(savedPageTitle || '');
    }
  }, []);

  // Ta bort HTML-taggar
  const stripHtml = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  if (!NOTION_TOKEN || !DATABASE_ID) {
    return (
      <div className="notion-integration">
        <h3>Notion Integration</h3>
        <p>Notion integration är inte konfigurerad. Lägg till NOTION_TOKEN och NOTION_DATABASE_ID i miljövariablerna.</p>
        <div className="integration-help">
          <p><strong>Setup:</strong></p>
          <ol>
            <li>Skapa en Notion integration på <a href="https://www.notion.so/my-integrations" target="_blank" rel="noopener noreferrer">notion.so/my-integrations</a></li>
            <li>Kopiera Integration Token</li>
            <li>Skapa en database i Notion och kopiera Database ID</li>
            <li>Lägg till miljövariabler i .env.local och Vercel</li>
          </ol>
        </div>
      </div>
    );
  }

  return (
    <div className="notion-integration">
      <h3>Notion Integration</h3>
      
      {!isConnected ? (
        <p>Ansluter till Notion...</p>
      ) : (
        <div>
          <div className="integration-controls">
            {!currentPageId ? (
              <div className="create-page-section">
                <input
                  type="text"
                  placeholder="Sidtitel (valfritt)"
                  value={pageTitle}
                  onChange={(e) => setPageTitle(e.target.value)}
                  className="page-title-input"
                />
                <button
                  onClick={createNotionPage}
                  disabled={isLoading}
                  className="create-page-button"
                >
                  {isLoading ? 'Skapar...' : 'Skapa Notion-sida'}
                </button>
              </div>
            ) : (
              <div className="sync-controls">
                <button
                  onClick={syncToNotion}
                  disabled={isLoading}
                  className="sync-to-notion-button"
                >
                  {isLoading ? 'Synkar...' : 'Synka till Notion'}
                </button>
                
                <button
                  onClick={syncFromNotion}
                  disabled={isLoading}
                  className="sync-from-notion-button"
                >
                  {isLoading ? 'Hämtar...' : 'Hämta från Notion'}
                </button>
                
                <button
                  onClick={() => {
                    setCurrentPageId('');
                    localStorage.removeItem('notionPageId');
                    localStorage.removeItem('notionPageTitle');
                  }}
                  className="disconnect-button"
                >
                  Koppla från
                </button>
              </div>
            )}
          </div>
          
          {syncStatus && (
            <div className="sync-status">
              {syncStatus}
            </div>
          )}
          
          {currentPageId && (
            <div className="page-info">
              <p><strong>Aktuell sida:</strong> {pageTitle || 'Namnlös sida'}</p>
              <p><strong>Page ID:</strong> {currentPageId}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotionIntegration;
