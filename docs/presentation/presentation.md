# Notizen Präsentation

## Einleitung
### Ablauf
- Inhaltgesteuert -> Seite durchgehen und auf verschieden Aspekte eingehen

| Punkt                        | Zeit | Wer?  |
| ---------------------------- | ---- | ----- |
| 1. Homepage                  |      |       |
| 2. Statische Seiten          |      |       |
| 3. User & Session Management |      | Simon |
| 4. Beiträge/Posts            |      |       |
| 5. Admin Dashboard           |      |       |
| 6. Deployment                |      |       |

## Homepage
- Thema der Webseite
    - "Produktseite" für Projekt aus Software Engineering
    - Verwaltung und Übersicht von Software Projekten
    - Von alt griechischen Wort episkopos, heißt c.a. "Aufseher"
- Verwendete Technologien
    - JavaScript
        - node runtime für Server
        - express als Mini-Framework
        - express-session für einfaches Session Management
    - HTML/CSS
        - Pug als Template Engine
    - nginx als Webserver

[!WEBSEITE 1: Homepage auf Desktop]
[!WEBSEITE 2: Homepage auf Mobil (Navigation Drawer)]

[!CODE 1: layout.pug + index.pug]
- Aufteilung dank Pug
- Layout, Header, Footer, Snackbar überall gleich

## Snackbar
[!WEBSEITE 3: Snackbar (Webkonsole)]
- Snackbar aufrufbar von Client-Side JS
- Verbesserung UX, Feedback bei z.B. Fehlern
[!CODE 2: public/js/snackbar.js]

## Statische Seiten
[!WEBSEITE 4: About]
- About genau wie Homepage statische Seite
- Statische Seiten werden über GitHub Actions vor Start der Anwendung zu html Dateien kompiliert
    - (natürlich auch manuell mit Befehl `npm run static` möglich)
    - nginx kann diese direkt bereitstellen, node nicht benötigt

[!CODE 3: app.js + router/static.js]
- Für Entwicklungsumgebung kann auch node bereitstellen

## Users & Session Management
- Session mithilfe von express-session gemanaged
    - benutzt cookie
    - lokaler Session Store
    - Achtung! Nicht "Production Ready"
        - Leakt Memory
        - Begrenzt auf 1 Prozess

[!WEBSEITE 5: Nutzer einloggen]
--> (Vorher auf Posts seite)

- Diagramm in Präsentation!
- Model-View-Controller
[!CODE 4: models/user.js + controllers/auth/loginController.js]

## Posts
[!WEBSEITE 6: Post Seiten (Alle, Autor, Einer)]
[!WEBSEITE 7: Post Erstellen]
- Nur Autor, Post wird nicht angezeigt! (trotzdem auf Posts Seite gehen zum zeigen) -> Auf später verweisen

- Sequenzdiagramm in Präsentation!
[!CODE 5: protectionMiddleware.js + routes/posts.js]
[!CODE 6: controllers/postController.js + models/post.js + posts.json]

## Admin
[!WEBSEITE 8: Admin Dashboard]
- Funktionalität über Aussehen (nur für Administratoren zugänglich)
- Nutzerverwaltung
[!WEBSEITE 9: Nutzer erstellen]
- Post Verwaltung
[!WEBSEITE 10: Post von vorher veröffentlichen + zeigen]

## Deployment
- Entwicklungsumgebung
    - Bereits gezeigt nur mit node möglich
- "Produktionsumgebung"
[!CODE 7: nginx/episko.conf]
- Aspekte nennen:
    - https/ssl (kein "richtiges" Zertifikat)
    - Automatische Weiterleitung http -> https
    - Statische Dateien kurz wieder erwähnen

[!CODE 8: docker-compose.yml]
- docker compose für einfaches deployment
    - nutzt gebautes docker image von nodejs Anwendung
    - automatische Verknüpfungen für Zertifikate, Statische Dateien und nginx Config

[!WEBSEITE 11: Bereitstellung über `sudo docker-compose up`]
