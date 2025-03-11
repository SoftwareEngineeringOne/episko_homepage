# Notizen Präsentation

#### Summe
- Simon:    5,5min
- Max:      5,5min 
- Paul:     4min -->    Ich denke Tendenz bei Beiträge/Posts ist länger,
                        falls unter 4, Admin Dashboard mit Max teilen
- Ben:      5min

## 1. Einleitung
- Willkommen und so
### Ablauf
- Basierend auf Inhalt -> Seite durchgehen und auf verschieden Aspekte eingehen

| Punkt                        | Dauer     | Timer       | Wer?  |
| ---------------------------- | --------- | ----------- | ----- |
| 1. Einleitung                | max. 1min | *bis 01:00* | Max   |
| 2. Homepage                  | 3min (+)  | *bis 04:00* | Ben   |
| 3. Snackbar                  | 2min (+)  | *bis 06:00* | Ben   |
| 4. Statische Seiten          | 2min      | *bis 08:00* | Max   |
| 5. User & Session Management | min. 3min | *bis 11:00* | Simon |
| 6. Beiträge/Posts            | 4min (+)  | *bis 15:00* | Paul  |
| 7. Admin Dashboard           | 2,5min    | *bis 17:30* | Max   |
| 8. Deployment                | 2,5min    | *bis 20:00* | Simon |


## 2. Homepage
- Thema der Webseite
    - "Produktseite" für Projekt aus Software Engineering
    - Verwaltung und Übersicht von Software Projekten
        - ?Projekte im Sinne von Code, nicht Projekt Management?
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
_SplitView mit beiden Dateien_
- in Layout \<head>
- blöcke/componenten
    - header/footer (nicht snackbar erwähnen)
    - block main nur von index.pug, alle anderen vernweden block content
        - block heißt quasi, kann überschrieben werden (erwähnen?)
    - Kapselung und Uniformität von Komponenten
- kurz index.pug mit Inhalt
- Dann snackbar erwähnen, übgergang

## 3. Snackbar
[!WEBSEITE 3: Snackbar (Webkonsole)]
- Snackbar aufrufbar von Client-Side JS
- Verbesserung UX, Feedback bei z.B. Fehlern
[!CODE 2: components/snackbar.pug + public/js/snackbar.js]
_Beide Dateien seperat offen (TAB)_
- Zu Pug: Komponente sehr simpel
    - `div` (das nur mit #) + `p` + `a`
- Zu JavaScript:
    1. Elemente "holen??"
    2. ggf. Farbe hinzufügen
    3. Anzeigen (hinzufügen der "show" Klasse)
    4. Nach 5,5s oder click Klassen wieder entfernen
        - 5,5s da:
            - Nach 5 Sekunden beginngt Animation zum "verschwinden"
            - Dauert 0,5s

## 4. Statische Seiten
[!WEBSEITE 4: About]
- Kurz auf About Seite eingehen
- About genau wie Homepage statische Seite
    - Nicht während Runtime von Template zu html rendern
- Statische Seiten werden über GitHub Actions vor Start der Anwendung zu html Dateien kompiliert
    - (natürlich auch manuell mit Befehl `npm run static` möglich)
    - nginx kann diese direkt bereitstellen, node nicht benötigt

[!CODE 3: app.js + router/static.js]
_SplitView mit beiden Dateien_
- Für Entwicklungsumgebung kann auch node bereitstellen
- if statement (app.js)
- routes/static.js
    - express.static(..) für sonstige statische Dateien
        - (CSS, JS, img, ...)
    - mapping von bspw. /about -> about.html mit Hilfsfunktion

## 5. Users & Session Management
- Session mithilfe von express-session gemanaged
    - benutzt cookie
    - lokaler Session Store
    - Achtung! Nicht "Production Ready"
        - Leakt Memory (Deutsch?!)
        - Begrenzt auf 1 Prozess

[!WEBSEITE 5: Nutzer einloggen]
--> (Vorher auf Posts seite)

- Diagramm in Präsentation!
- Model-View-Controller
[!CODE 4: models/user.js + controllers/auth/loginController.js]
_SplitView mit beiden Dateien_

## 6. Posts
[!WEBSEITE 6: Post Seiten (Alle, Autor, Einer)]
[!WEBSEITE 7: Post Erstellen]
- Nur Autor, Post wird nicht angezeigt! (trotzdem auf Posts Seite gehen zum zeigen) -> Auf später verweisen

- Sequenzdiagramm in Präsentation!
[!CODE 5: protectionMiddleware.js + routes/posts.js]
- Zuerst routes/posts.js
    - route ist `router.post("/", ... )`
    - router "sitzt auf" `/posts` Route
    - zunächst adminAuthorOnly Callback dann PostController
- adminAuthorOnly -> protectionMiddleware
    - Zusammengefasst:
        - Wenn nicht angemeldet:
            - Wenn "GET" request
                -> Weiterleitung zu `/auth/login`
            - Sonst:
                -> Enden mit `401 Unauthorized`
        - Wenn angemeldet & nicht erlaubt:
            -> Weiterleitung an ErrorHandler mit `403 Forbidden`
        - Wenn angemelet und erlaubt:
            --> Weiter wie erwartet (hier controller)
_SplitView mit beiden Dateien_
[!CODE 6: controllers/postController.js + models/post.js + posts.json]
_SplitView mit beiden Dateien_
- postController.js -> `createPost: async(req, res) => ....`
    - title und content aus request
    - erstellen von Post Object
    - Speicher -> post.js (Model)
- post.js -> constructor
    - id zufällig
    - zuweisung von attributen
    -> Deshalb nicht sichtbar:
        Wenn nicht von ADMIN erstellt, Status zunächst "PENDING"

-> Übergang, wie veröffentlichen?

## 7. Admin
[!WEBSEITE 8: Admin Dashboard]
1. Aufrufen mit author angemeldet
    -> Forbidden zeigen
2. Anmelden als admin und `/admin` aufrufen

- Funktionalität über Aussehen (nur für Administratoren zugänglich)
- Nutzerverwaltung
[!WEBSEITE 9: Nutzer erstellen]
- Post Verwaltung
[!WEBSEITE 10: Post von vorher veröffentlichen + zeigen]

## 8. Deployment
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
