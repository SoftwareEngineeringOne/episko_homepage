# Notizen Präsentation

## Ablauf - Entlang Inhalt
1. Homepage
    - Auf Dekstop
    - Auf Mobile (Navigation Drawer)

2. Static Pages
    - nginx or node depending on env

3. Sessions
    - Session Cookies (express Session)

4. Users
    - Login/Register

5. Posts
    - See/Read
    - Create

6. Admin

7. Deployment

## Homepage
- Auf Desktop zeigen
- Auf Mobil zeigen
- Nutzung von Pug als Template Engine

- Pug code zeigen
    - layout.pug
    - index.pug
    - components (header/footer)

## Statische Seiten
- About, Terms...
- Compilen von templates vorher
- nginx für statische Dateien
    - node in dev
- Diagramm aufbau

## Session
- Verwendung von express-session
- Diagramm Middleware

## Users
- Nur "Background"
- Registration zeigen
    - auth controller
    - middleware
    - json als Datenspeicherung

- Hier Model-View-Controller beispielhaft belegen

## Posts
- Anschauen/Erstellen
    1. Alle anzeigen
    2. Von einem Autor anzeigen
    3. Neuen erstellen
- CodeEinblick
    - ProtectionMiddleware
    - PostController
    - postModel
- Hier voller Ablauf reguest Diagramm

## Admin
- Nur kurz zeigen, nicht optimiert

## Deployment
- nginx/docker config
- https/ssl
