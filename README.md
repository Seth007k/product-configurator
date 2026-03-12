# Produkt Konfigurator (Probearbeit)

Ein Full-Stack-Prototyp für einen Produktkonfigurator. Dieses Projekt ermöglicht das Anlegen von Produkten und deren zugehörigen Varianten (inklusive Zuweisungen wie Baureihe und Modelle). 

Das Projekt besteht aus einem **Next.js** Frontend, einem **NestJS** Backend und einer **MongoDB** Datenbank. Alles ist für eine einfache lokale Umgebung mithilfe von Docker Compose konfiguriert.

## 🛠 Tech-Stack

- **Frontend:** Next.js, React, TypeScript
- **Backend:** NestJS, TypeScript
- **Datenbank:** MongoDB
- **Containerisierung:** Docker & Docker Compose

## 📋 Voraussetzungen

Um das Projekt lokal auszuführen, benötigst du:
- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/install/)
- Optional: Node.js (falls du die App ohne Docker lokal starten möchtest)

## 🚀 Lokale Installation & Start

Am einfachsten lässt sich das Projekt über Docker starten. Der folgende Befehl baut die Container auf und startet die gesamte Infrastruktur inkl. Datenbank, Backend und Frontend.

1. **Repository klonen** (falls nicht bereits geschehen)
2. **Ins Hauptverzeichnis wechseln**
3. **Docker Compose ausführen:**

```bash
docker compose up --build
```

Sobald die Container laufen, sind die Dienste unter folgenden Adressen erreichbar:
- **Frontend:** http://localhost:3001
- **Backend API:** http://localhost:3000
- **MongoDB:** `localhost:27017`

Zum Stoppen der Container drücke `Strg + C` oder nutze folgenden Befehl in einem neuen Terminalfenster:

```bash
docker compose down
```

## 📂 Projektstruktur

Das Projekt ist in zwei separate Hauptordner unterteilt:

- `/Frontend`: Die Next.js-Anwendung. Beinhaltet die Benutzeroberfläche zur Auflistung und Erstellung neuer Produkte und Varianten. Basiert auf dem neuen App Router (`app/`).
- `/Backend`: Die NestJS-API. Beinhaltet die REST-Endpunkte für die Verwaltung von Produkten und Varianten und fungiert als Schnittstelle zur MongoDB.

## 🔗 Grundlegende API Endpunkte

Das NestJS-Backend stellt verschiedene REST-Schnittstellen bereit:

### Produkte
- `GET /products` - Gibt eine Liste aller verfügbaren Produkte zurück.
- `POST /products` - Erstellt ein neues Produkt.

### Varianten
- `GET /variants/:productId` - Gibt alle Varianten für eine bestimmte Produkt-ID zurück.
- `POST /variants` - Erstellt eine neue Variante für ein Produkt.

*(Weitere Details siehe im Quellcode des Backends unter `src/modules/products` und `src/modules/variants`)*
