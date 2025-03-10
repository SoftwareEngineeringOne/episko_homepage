# Installationsanleitung

## Entwicklungsumgebung (ohne NGINX)
Um die Webseite in einer Entwicklungsumgebung ohne einen separaten
NGINX Webserver zu nutzen:
```bash
# Abhängigkeiten installieren
npm install

# Run in development mode (with livereload using nodemon)
npm run dev
```
> [!NOTE]
> Die Umgebungsvariable `NODE_ENV` darf nicht auf `production` gesetzt
> sein, wenn kein NGINX Webserver läuft, da die node Anwendung dann
> keine statischen Dateien bereitstellt.

## "Production"- Umgebung (mit NGINX)
Um die Webseite in einer Produktions ähnlichen Umbegung mit NGINX zu nutzen gibt 
es 2 Möglichkeiten:
### Mit Docker
_Achtung: Abhängig von Systemeinstellung, kann es sein, dass Docker als "root" Nutzer
ausgeführt werden muss, um die priveligierten Ports 80 und 443 nutzen zu können._
- Die verwendeten Ports können in der `docker-compose.yml` Datei angepasst werden
```bash
# sudo ist ggf. nötig; "-d" erlaubt es die Container im Hintergrund laufen zu lassen
docker compose up
```

### Ohne Docker
Die Anwendung kann auch ohne Docker mit dem NGINX Webserver genutzt werden.

#### Vorraussetzungen
Die folgenden Schritte gehen davon aus, das der Anwender sich auf einem FHS-Konformen
Linux System befindet, welches `systemd` als init System nutzt.
Desweiteren wird davon ausgegangen, dass NGINX installiert ist und als `systemd-service`
läuft.
Auf den meisten verbreiteten Linux-Distributionen wie Debian, Ubuntu, Arch, etc. sollten diese
Anforderungen ohne Probleme erfüllt sein.

#### Mit Script
Das script `setup_nginx.sh` kann in den meisten Fällen genutzt werden um konfiguration von nginx
für die Anwendung zu erleichtern.
```bash
# Andere Seiten welche Ports 80 und 443 nutzen deaktivieren
# (Vorher sichergehen, dass es sich in sites-enabled um symlinks handelt / backups existieren)
sudo rm /etc/nginx/sites-enabled/*

# Skript ausführen
./setup_nginx.sh
```

#### Manuell
Sollte es mit dem Skript zu Problemen führen oder eine manuelle Konfiguration erwüncht sein,
ist auch das möglich:
1. Konfiguration aus `./nginx/episko.conf` an gewünchter Stelle einfügen
2. Certifikate aus `./certs` (diese sind nicht sicher!) nach `/etc/ssl/nginx/episko` kopieren
3. Statische Dateien aus `./public` nach `/var/www/episko` kopieren
4. NGINX neustarten

