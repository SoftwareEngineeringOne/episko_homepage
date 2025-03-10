#import "@preview/supercharged-dhbw:3.4.1": *
#import "acronyms.typ": acronyms
#import "glossary.typ": glossary

#show: supercharged-dhbw.with(
  title: "Dokumentation Projekt Webengineering",
  authors: (
    (name: "Simon Blum", student-id: "7654321", course: "TIT23", course-of-studies: "Informationstechnik"),
    (name: "Ben Oeckl", student-id: "7654321", course: "TIT23", course-of-studies: "Informationstechnik"),
    (name: "Paul Stöckle", student-id: "7654321", course: "TIT23", course-of-studies: "Informationstechnik"),
    (name: "Maximilian Rodler", student-id: "7654321", course: "TIT23", course-of-studies: "Informationstechnik"),
  ),
  city: "Friedrichshafen",
  acronyms: acronyms, // displays the acronyms defined in the acronyms dictionary
  at-university: true, // if true the company name on the title page and the confidentiality statement are hidden
  bibliography: bibliography("sources.bib"),
  date: datetime.today(),
  glossary: glossary, // displays the glossary terms defined in the glossary dictionary
  language: "de", // en, de
  supervisor: (university: "Prof. Dr. Jürgen Schneider"),
  university: "Cooperative State University Baden-Württemberg",
  university-location: "Ravensburg Campus Friedrichshafen",
  university-short: "DHBW",
  // for more options check the package documentation (https://typst.app/universe/package/supercharged-dhbw)
)

// Edit this content to your liking

= Einleitung

== Aufgabenstellung

== Herangehensweiße

= Architektur

= Programmablauf

= Funktionalitäten

== Sessions

== Nutzer/Rollen

== Posts

== Admin



