#!/bin/bash

# Vercel Deployment Script för Min Tiptap Editor

echo "🚀 Förbereder appen för Vercel deployment..."

# Kontrollera att vi är i rätt mapp
if [ ! -f "package.json" ]; then
    echo "❌ Fel: package.json hittades inte. Kör detta script från projektets rot."
    exit 1
fi

# Kontrollera att Vercel CLI är installerat
if ! command -v vercel &> /dev/null; then
    echo "📦 Installerar Vercel CLI..."
    npm install -g vercel
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
    echo "🎯 Deployar till Vercel..."
    echo ""
    echo "📝 Instruktioner:"
    echo "1. Om du inte är inloggad, logga in med: vercel login"
    echo "2. Kör: vercel --prod"
    echo "3. Följ instruktionerna på skärmen"
    echo ""
    echo "🔧 Miljövariabler som kommer att konfigureras:"
    echo "   REACT_APP_SUPABASE_URL=https://btbrdiaanylvjttuyyoq.supabase.co"
    echo "   REACT_APP_SUPABASE_ANON_KEY=sb_publishable_9t8tb-nCBTTqCqAylVDZcQ_T3T0yVcm"
    echo ""
    echo "🌐 Din app kommer att vara live på: https://your-project-name.vercel.app"
else
    echo "❌ Build misslyckades. Kontrollera felmeddelanden ovan."
    exit 1
fi
