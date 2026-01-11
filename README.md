# Sklep Internetowy Modern - Projekt Testowy

## Opis Projektu
Nowoczesna aplikacja e-commerce zbudowana w React + Vite, zawierająca mechanizmy logowania, filtrowania produktów oraz responsywny design. Projekt służy jako baza do demonstracji automatyzacji testów E2E.

## Technologie
- **Frontend**: React, TypeScript, Vite, TailwindCSS
- **Testy**: Playwright
- **Kontrola wersji**: Git

## Instalacja i Uruchomienie

1. Zainstaluj zależności:
   ```bash
   npm install
   ```

2. Uruchom serwer deweloperski:
   ```bash
   npm run dev
   ```

## Testy Automatyczne (Playwright)

W projekcie skonfigurowano środowisko testowe Playwright pokrywające:
- **Visual Regression Testing**: Weryfikacja wyglądu strony głównej.
- **Interactions**: Sprawdzenie interakcji (przyciski, nawigacja) oraz błędów w konsoli.
- **RWD**: Testy responsywności na urządzeniach mobilnych (iPhone 13) i desktopowych.

### Uruchomienie Testów

Aby uruchomić wszystkie testy:
```bash
npx playwright test
```

### Artefakty Testowe

Wyniki testów zapisywane są w katalogu `tests/`:
- `tests/screeny/`: Zrzuty ekranu z błędami oraz visual regression snapshots.
- `tests/video/`: Nagrania wideo z przebiegu testów.
- `tests/dokumentacja_testow/`: Raport HTML oraz JSON.

## Autor
Zrealizowano w ramach zadania rekrutacyjnego / wdrożeniowego.