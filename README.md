# 🛍️ Sklep Internetowy Modern - E-commerce z Automatyzacją Testów

Witaj w repozytorium **Sklep Internetowy Modern**. Jest to nowoczesna, responsywna aplikacja e-commerce stworzona jako demonstracja umiejętności frontendowych oraz zaawansowanej automatyzacji testów E2E (End-to-End).

Projekt łączy w sobie estetyczny interfejs użytkownika, dynamiczne zarządzanie stanem oraz kompletne środowisko Quality Assurance oparte na **Playwright**.

---

## 🚀 Kluczowe Funkcjonalności

### Frontend (React + Vite)
- **Responsywny Interfejs (RWD)**: Pełna obsługa urządzeń mobilnych, tabletów i desktopów.
- **Dynamiczne Filtrowanie**: Filtrowanie produktów w czasie rzeczywistym po kategorii, cenie, stanie i lokalizacji.
- **Koszyk Zakupowy**: Zarządzanie stanem koszyka z wykorzystaniem React Context.
- **Backend Integration**: Pobieranie danych (produkty, szczegóły, filtrowanie) z bazy danych **Supabase**.
- **Konto Użytkownika**: Symulacja logowania, rejestracji i panelu użytkownika.
- **Dynamiczne Podstrony**: Podstrony produktów generowane na podstawie ID z bazy danych.
- **Ulubione**: Funkcjonalność dodawania do ulubionych z persistencją danych.
- **Nowoczesny Design**: Wykorzystanie TailwindCSS dla spójnego i estetycznego wyglądu.

### Quality Assurance (Playwright)
- **Visual Regression Testing**: Automatyczne wykrywanie zmian wizualnych w interfejsie.
- **Testy Funkcjonalne**: Weryfikacja interakcji użytkownika, ładowania zasobów i braku błędów w konsoli.
- **Testy Mobilne**: Dedykowane scenariusze dla widoków mobilnych (emulacja iPhone 13).
- **Raportowanie**: Generowanie szczegółowych raportów HTML z wynikami testów, nagraniami wideo i zrzutami ekranu.

---

## 🛠️ Stack Technologiczny

| Kategoria | Technologie |
|-----------|-------------|
| **Core** | React 18, TypeScript, Vite |
| **Backend** | **Supabase** (Database, API) |
| **Styling** | TailwindCSS, Lucide React (ikony) |
| **State** | React Context API |
| **Testing** | **Playwright** (TypeScript) |
| **DevOps** | Git, npm |

---

## ⚙️ Instalacja i Uruchomienie

Aby uruchomić projekt lokalnie, upewnij się, że masz zainstalowane **Node.js** (wersja 16+)

### 1. Klonowanie repozytorium
```bash
git clone https://github.com/przemekbladowski/wdrozenie-allegro.git
cd wdrozenie-allegro
```

### 2. Instalacja zależności
```bash
npm install
```
*To polecenie zainstaluje zarówno biblioteki frontendowe, jak i wymagane pakiety Playwright.*

### 3. Instalacja przeglądarek dla Playwright
Przed pierwszym uruchomieniem testów należy pobrać silniki przeglądarek:
```bash
npx playwright install --with-deps
```

### 4. Uruchomienie aplikacji (Tryb Deweloperski)
```bash
npm run dev
```
Aplikacja będzie dostępna pod adresem: `http://localhost:3000`

---

## 🧪 Automatyzacja Testów (Playwright)

W projekcie zaimplementowano kompleksową strategię testowania. Testy znajdują się w katalogu `tests/`.

### Rodzaje Testów

| Plik testowy | Opis |
|--------------|------|
| `tests/visual.spec.ts` | **Visual Regression**. Porównuje aktualny wygląd strony głównej ze wzorcem (snapshotem). Wykrywa nawet najmniejsze przesunięcia pikseli czy zmiany kolorów. |
| `tests/interactions.spec.ts` | **Smoke & Functional**. Sprawdza czy kluczowe elementy (przyciski, linki) działają, czy zasoby ładują się z kodem 200 oraz czy konsola przeglądarki jest wolna od błędów krytycznych. |
| `tests/mobile.spec.ts` | **RWD**. Weryfikuje układ strony na emulowanym urządzeniu mobilnym (np. ukryty sidebar, hamburger menu) w porównaniu do wersji desktopowej. |

### Uruchamianie Testów

#### Uruchom wszystkie testy
```bash
npx playwright test
```
*Domyślnie testy uruchamiają się w trybie headless (bez okna przeglądarki).*

#### Uruchom z podglądem (UI Mode)
Idealne do debugowania i pisania nowych testów.
```bash
npx playwright test --ui
```

#### Aktualizacja Snapshotów Wizualnych
Jeśli zmienisz wygląd aplikacji celowo, musisz zaktualizować wzorce testów wizualnych:
```bash
npx playwright test --update-snapshots
```

### 📂 Artefakty i Raporty

Wyniki testów są automatycznie kategoryzowane i zapisywane w strukturze katalogów:

- **`tests/dokumentacja_testow/`**: Tutaj znajdziesz **Raport HTML** (`index.html`). Otwórz go w przeglądarce, aby zobaczyć szczegółowe wyniki.
- **`tests/screeny/`**:
    - Zrzuty ekranu z błędów (failure screenshots).
    - Zrzuty porównawcze (diffs) dla testów wizualnych.
- **`tests/video/`**: Nagrania wideo z przebiegu każdego testu (skonfigurowane w `playwright.config.ts`).

---

## 📁 Struktura Projektu

```text
/
├── src/                  # Kod źródłowy aplikacji React
│   ├── components/       # Komponenty UI (Header, ProductCard, etc.)
│   ├── pages/            # Główne widoki (HomePage, AccountPage)
│   ├── context/          # Zarządzanie stanem (UserContext, etc.)
│   ├── hooks/            # Custom Hooks (useProduct, useProducts)
│   ├── lib/              # Konfiguracja bibliotek (supabase.ts)
│   └── data/             # Typy danych (wcześniej mockowane dane)
├── tests/                # Testy Playwright
│   ├── visual.spec.ts        # Testy wizualne
│   ├── interactions.spec.ts  # Testy interakcji
│   ├── mobile.spec.ts        # Testy RWD
│   ├── screeny/              # Artefakty: Screenshoty
│   └── video/                # Artefakty: Nagrania wideo
├── playwright.config.ts  # Główna konfiguracja testów
├── tailwind.config.js    # Konfiguracja stylów
└── package.json          # Zależności projektu
```

---

## 👤 Autor

Projekt zrealizowany w ramach wdrożenia. Skupia się na czystości kodu, nowoczesnych praktykach React oraz profesjonalnym podejściu do QA.
