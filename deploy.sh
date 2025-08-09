#!/bin/bash

# Deployment Script för Min Tiptap Editor

echo "🚀 Förbereder appen för deployment..."

# Kontrollera att vi är i rätt mapp
if [ ! -f "package.json" ]; then
    echo "❌ Fel: package.json hittades inte. Kör detta script från projektets rot."
    exit 1
fi

# Installera dependencies om de saknas
if [ ! -d "node_modules" ]; then
    echo "📦 Installerar dependencies..."
    npm install
fi

# Bygg appen för produktion
echo "🔨 Bygger appen för produktion..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build lyckades!"
    echo ""
    echo "🎯 Din app är redo för deployment!"
    echo ""
    echo "📁 Build-mappen finns i: ./build"
    echo ""
    echo "🌐 Deployment-alternativ:"
    echo "1. Vercel (Rekommenderat):"
    echo "   - Gå till https://vercel.com"
    echo "   - Dra och släpp build-mappen"
    echo "   - Konfigurera miljövariabler:"
    echo "     REACT_APP_SUPABASE_URL=https://btbrdiaanylvjttuyyoq.supabase.co"
    echo "     REACT_APP_SUPABASE_ANON_KEY=sb_publishable_9t8tb-nCBTTqCqAylVDZcQ_T3T0yVcm"
    echo ""
    echo "2. Netlify:"
    echo "   - Gå till https://netlify.com"
    echo "   - Dra och släpp build-mappen"
    echo ""
    echo "3. GitHub Pages:"
    echo "   - Kör: npm install --save-dev gh-pages"
    echo "   - Lägg till scripts i package.json"
    echo "   - Kör: npm run deploy"
    echo ""
    echo "📖 Se DEPLOYMENT.md för detaljerade instruktioner"
else
    echo "❌ Build misslyckades. Kontrollera felmeddelanden ovan."
    exit 1
fi
