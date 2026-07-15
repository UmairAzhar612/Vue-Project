# MovieApp — Project Summary

**A Vue 3 Client-Side Single-Page Application**
**Semester Project — Deliverable 1 (Client-Side Architecture)**

## What is MovieApp?

MovieApp is a simple movie website I built using Vue 3. It lets a user:

- browse a list of movies
- filter movies by genre
- search for a movie by its name
- open a movie to see its full details
- save movies to a personal "watchlist" that stays saved even after refreshing the page

This deliverable only covers the **client side** — the part of the app that runs in the browser. It's a front-end-only app, so instead of getting data from a server or the internet, it uses a small list of movies already stored inside the project itself (`src/data/movies.js`). Because of this, the app doesn't need an API key or an internet connection to run. The backend (Express.js + MongoDB) will be added in a later phase.

## Tools I Used

| Tool | Why I used it |
|---|---|
| **Vue 3** | The main framework, written using the modern `<script setup>` style |
| **Vite** | The build tool and local dev server |
| **Vue Router** | Moves the user between pages without reloading the browser |
| **Pinia** | Stores the shared watchlist data in one central place |
| **HTML / CSS** | Basic page structure and simple styling |

## How Routing Works (Single-Page Application)

A Single-Page Application loads one HTML page just once, and then swaps the content in and out as the user moves around — the page never fully reloads. Vue Router is what makes this happen.

All the routes (pages) are listed in one file: `src/router/index.js`. Each route connects a URL to a page component:

| URL | Page | What it shows |
|---|---|---|
| `/` | `HomePage.vue` | All movies + genre filter |
| `/search` | `SearchPage.vue` | Search results by title |
| `/movie/:id` | `MovieDetailPage.vue` | Full details of one movie |
| `/watchlist` | `WatchlistPage.vue` | The user's saved movies |
| anything else | redirects to `/` | Catch-all for unknown URLs |

**A few routing details worth explaining:**

- The `:id` in `/movie/:id` is a placeholder that changes for each movie (like `/movie/1` or `/movie/5`). The detail page reads it using `useRoute().params.id` to know which movie to show.
- The catch-all route sends users back to the home page if they type a URL that doesn't exist, instead of showing a broken page.
- The router uses `createWebHistory()`, which gives clean URLs without a `#` symbol.

**Two important Vue Router tags:**

- `<RouterView>` — placed inside `App.vue`. It acts like a window that shows whichever page matches the current URL, while the Navbar above it stays fixed.
- `<RouterLink>` — used instead of a normal `<a>` tag, so clicking it changes pages without reloading the whole browser. It's used in the Navbar and inside every movie card.

## Component Structure

Instead of writing the whole app in one giant file, I split the interface into small, reusable pieces called **components**. Each component is a `.vue` file with its own template (HTML) and its own logic (JavaScript), which keeps the code clean and easy to follow.

```
src/
├── data/
│   └── movies.js          # the built-in list of movies
├── components/
│   ├── Navbar.vue         # the top menu
│   └── MovieCard.vue      # one movie card
├── pages/                 # one component per page (route)
│   ├── HomePage.vue
│   ├── SearchPage.vue
│   ├── MovieDetailPage.vue
│   └── WatchlistPage.vue
├── stores/
│   └── watchlist.js       # Pinia store for saved movies
├── router/
│   └── index.js           # the list of routes
├── App.vue                # layout: Navbar + current page
└── main.js                # starts the app
```

There are two levels of components in this project:

- **Components** — small, reusable building blocks, like `Navbar.vue` (shown on every page) and `MovieCard.vue` (reused on both the Home and Watchlist pages).
- **Pages** — each one is a full page tied to a route, built by combining smaller components with data.

## How Components Talk to Each Other (Props & Emits)

In Vue, data can move in two directions:

- **Props** — send data DOWN, from a parent component to a child component
- **Emits (custom events)** — send messages UP, from a child component back to its parent

`MovieCard.vue` is the best example of both directions working together in this project.

**Props (going down):** the card receives the `movie` object and a boolean `isSaved`, both defined with type-checking so Vue makes sure the right kind of data is passed in.

**Emits (going up):** when the "Add to watchlist" / "Remove from watchlist" button is clicked, the card doesn't decide what happens — it just emits a `toggle` event and passes the movie along with it. The parent page (Home or Watchlist) listens for that event and tells the Pinia watchlist store to add or remove the movie.

## Input Handling & Empty States

Even though there's no backend yet, the app still checks and handles a few basic cases on the client side so it doesn't break or look empty for no reason:

- **Search box** — if the user searches for a movie that doesn't exist, the Search page shows a "No movies found" message instead of a blank page.
- **Empty watchlist** — if the user hasn't saved anything yet, the Watchlist page shows a short message telling them to add movies, instead of just showing nothing.
- **Invalid movie ID** — if someone types a `/movie/:id` URL for a movie that doesn't exist (like `/movie/999`), the Movie Detail page shows a "movie not found" message instead of crashing.

These aren't full form validations (there are no input forms yet, just search), but they make sure the app handles bad or missing input gracefully — this will grow into proper validation once the backend is connected.

## Other Vue Features I Used

- **Pinia store (`stores/watchlist.js`)** — keeps the saved movies in one place. Every part of the app that uses it (Navbar count, Watchlist page) updates instantly, and everything is saved to `localStorage` so the watchlist survives a page refresh.
- **Computed properties** — the Home page's filtered movie list and the Search page's results list both use `computed()`, so they update automatically.
- **Watchers** — the Search page uses `watch()` to keep the search box synced with the URL, and the Movie Detail page uses `watchEffect()` to update the browser tab title.
- **Template refs** — used on the Home page to auto-focus the search box when the page loads.
- **Template directives** — `v-for`, `v-if`/`v-else`, `v-model`, `v-bind` (`:`), `v-html`, and `{{ }}` text interpolation are all used across the templates.

## Architecture Overview

```
App.vue (overall layout)
├── Navbar.vue (top menu — shown on every page)
└── <RouterView> (shows the current page)
      ├── HomePage.vue
      │     └── MovieCard.vue (×N)
      ├── SearchPage.vue
      ├── MovieDetailPage.vue
      └── WatchlistPage.vue
            └── MovieCard.vue (×N)
```

## How to Run It

```
npm install     # install Vue, Vue Router, Pinia and Vite
npm run dev     # start the app
```

Then open the printed address (usually `http://localhost:5173`) in a browser. Press `Ctrl + C` to stop the server. Running `npm run build` creates a `dist/` folder that can be hosted anywhere.

## What's Next (Deliverable 2)

Right now the movie data is hardcoded in `src/data/movies.js`. In the next phase, I'll connect the app to a real backend:

- **Express.js + MongoDB** backend to store movies, users, and watchlists in a real database instead of a local file
- **Axios** to send requests from the Vue app to the backend (GET to fetch movies, POST/PUT to update a user's watchlist on the server instead of just `localStorage`)
- **Proper form validation** once there are real input forms (like login/signup), not just the search box
- Loading and error states while waiting for data from the server

## Conclusion

This deliverable gives a complete, working client-side Vue 3 app. It uses Vue Router for smooth navigation across four routes, a clean and modular component structure split into reusable pieces and full pages, and clear parent-to-child communication using type-safe props and custom events. The `MovieCard` component ties these ideas together, and the Pinia store keeps the watchlist consistent across the whole app. The project also handles empty and invalid input gracefully so it doesn't break with bad data. It's well organized and ready for the backend (Express.js + MongoDB) to be added in a later phase.
