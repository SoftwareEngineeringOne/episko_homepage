#!/usr/bin/env bash

set -euo pipefail

confirm() {
    echo "$1"
    while true; do
        read -r -p "Are you sure, you want to continue? [y/n]: " response
        case "$response" in
            [yY]) return 0 ;;
            [nN]) return 1 ;;
            *) echo "Invalid response. Please type y or n." ;;
        esac
    done
}

echo "WARNING: As of now this script is untested!"
echo ""

echo "Setting up nginx..."
if ! confirm "This action may override existing nginx settings!"; then
    echo "You can setup nginx manually using the files located in ./nginx!"
    exit 0
fi
echo ""

echo "Hint: root permissions may be required to setup the necessary configs"
echo ""


echo "Copying nginx config..."
sudo mkdir -p /etc/nginx
sudo cp -r ./nginx/* /etc/nginx

echo "Copying ssl certificates... (these are not secure)"
sudo mkdir -p /etc/ssl/nginx
sudo cp ./certs/* /etc/ssl/nginx

echo "(Re)Compiling static homepage"
npm ci --omit dev
node compile.js

echo "Copying static files..."
mkdir -p /var/www/episko
cp -r ./public /var/www/episko

echo "Setting up nginx complete!"
echo "You can now run \"npm run\" and access the application"


