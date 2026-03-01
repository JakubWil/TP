# Sanity CMS – konfiguracja

## Zmienne środowiskowe

1. Skopiuj `.env.example` do `.env.local`.
2. Załóż projekt w [sanity.io/manage](https://www.sanity.io/manage) i skopiuj **Project ID**.
3. W `.env.local` ustaw:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID=twój_project_id`
   - `NEXT_PUBLIC_SANITY_DATASET=production` (lub inna nazwa datasetu)

## Panel Studio (edycja treści)

Studio nie jest wbudowane w Next.js pod `/admin` (ze względu na konflikt Sanity z React 19). Uruchom je lokalnie:

```bash
# Z katalogu projektu, z ustawionym .env.local:
npx sanity@latest dev
```

Studio otworzy się pod adresem **http://localhost:3333** z tymi samymi schematami (Testimonial, Quote, Service). Możesz też edytować treści w [sanity.io/manage](https://www.sanity.io/manage) → wybrany projekt → Sanity Studio.

Strona Next.js pobiera dane z Sanity – zmienne w `.env.local` muszą być ustawione.

## Schematy w Studio

- **Testimonial** – opinie (tekst, autor, inicjały, kolejność).
- **Quote** – sekcja cytatu (linie tekstu, przycisk).
- **Service** – usługi (slug, tytuł, opis, lista cech, zdjęcie).

Po pierwszym uruchomieniu Studia dodaj dokumenty tych typów; bez nich strona używa wbudowanych treści zastępczych.

## Preview Mode i Visual Editing (Presentation Tool)

- W Studio jest włączony **Presentation Tool** – w lewym pasku wybierz **Presentation**, żeby zobaczyć podgląd strony na żywo.
- **Draft mode:** uruchom Next.js (`npm run dev`) i Studio (`npx sanity dev`). W Presentation wpisz adres strony (np. `http://localhost:3000`), włącz **Preview mode** – zmiany w Studio (wersje robocze) będą widoczne od razu na stronie.
- **Połączenie z iframe:** aplikacja Next.js renderuje komponent `VisualEditing` (next-sanity) gdy draft mode jest włączony; bez niego Studio pokaże „Unable to connect”. Iframe po włączeniu preview ładuje `/api/draft` (ustawienie ciasteczka) i przekierowuje na `/` – wtedy połączenie się nawiązuje.
- **API:** `GET /api/draft` włącza tryb podglądu (cookie), `GET /api/disable-draft` go wyłącza. W development bez `SANITY_PREVIEW_SECRET` draft i tak działa; w produkcji ustaw `SANITY_PREVIEW_SECRET` w `.env` i (opcjonalnie) dodaj go do URL w Studio.
- **Lokalizacje:** przy każdym dokumencie (Testimonial, Quote, Service) w Studio widać „Used on” → strona główna `/`.
