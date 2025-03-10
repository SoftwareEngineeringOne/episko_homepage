#!/usr/bin/env bash

set -euo pipefail

echo "WARNING: As of now this script is untested!"
echo ""

echo "Setting up nginx..."

echo "Hint: root permissions may be required to setup the necessary configs"
echo ""


echo "Copying nginx config..."
sudo mkdir -p /etc/nginx/sites-enabled
sudo mkdir -p /etc/nginx/sites-available
sudo cp ./nginx/episko.conf /etc/nginx/sites-available/episko.conf
sudo ln -s /etc/nginx/sites-available/episko.conf /etc/nginx/sites-enabled/episko.conf

echo "Copying ssl certificates... (these are not secure)"
sudo mkdir -p /etc/ssl/nginx/episko
sudo cp ./certs/* /etc/ssl/nginx/episko

echo "(Re)Compiling static homepage"
npm ci --omit dev
node compile_static.js

echo "Copying static files..."
sudo mkdir -p /var/www/episko
sudo chown $USER /var/www/episko
cp -r ./public/* /var/www/episko

echo "Testing nginx config..."
sudo nginx -t || echo "Nginx config invalid"; exit 1;

echo "Restarting nginx service..."
sudo systemctl restart nginx

echo "Setting up nginx complete!"
echo "Make sure there are no conflicting ports in /etc/nginx/sites-enabled"
echo "You can now run \"npm run\" and access the application"


