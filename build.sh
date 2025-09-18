#!/bin/bash

# Build script for Behavior Observation Tools website using Vite

echo "🚀 Building Behavior Observation Tools website with Vite..."

# Clean previous build
echo "🧹 Cleaning previous build..."
bun run clean

# Install dependencies
echo "📦 Installing dependencies..."
bun install

# Build with Vite
echo "🏗️ Building with Vite..."
bun run build

# Verify build
echo "✅ Build verification:"
echo "Main page: $([ -f "dist/index.html" ] && echo "✅ Found" || echo "❌ Missing")"
echo "Privacy page: $([ -f "dist/privacy.html" ] && echo "✅ Found" || echo "❌ Missing")"
echo "Terms page: $([ -f "dist/terms.html" ] && echo "✅ Found" || echo "❌ Missing")"
echo "Contact page: $([ -f "dist/contact.html" ] && echo "✅ Found" || echo "❌ Missing")"
echo "Assets: $([ -d "dist/assets" ] && echo "✅ Found" || echo "❌ Missing")"

echo ""
echo "📊 Build size:"
du -sh dist/

echo ""
echo "🎉 Build completed successfully!"
echo "📁 Output directory: ./dist"
echo "🌐 To preview: bun run preview"