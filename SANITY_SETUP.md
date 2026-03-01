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
