// A simple list of movies used by the app (instead of a database/API).

export const movies = [
  {
    id: 1,
    title: 'Inception',
    year: 2010,
    rating: 8.4,
    runtime: '2h 28m',
    genres: ['Sci-Fi', 'Action'],
    director: 'Christopher Nolan',
    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page'],
    overview:
      'A thief who steals secrets from people while they dream is given a job to plant an idea instead of stealing one.',
  },
  {
    id: 2,
    title: 'The Dark Knight',
    year: 2008,
    rating: 9.0,
    runtime: '2h 32m',
    genres: ['Action', 'Crime'],
    director: 'Christopher Nolan',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
    overview:
      'Batman faces the Joker, a criminal who wants to bring chaos to Gotham City.',
  },
  {
    id: 3,
    title: 'Interstellar',
    year: 2014,
    rating: 8.4,
    runtime: '2h 49m',
    genres: ['Sci-Fi', 'Drama'],
    director: 'Christopher Nolan',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
    overview:
      'A team of explorers travel through a wormhole in space to find a new home for humanity.',
  },
  {
    id: 4,
    title: 'The Matrix',
    year: 1999,
    rating: 8.2,
    runtime: '2h 16m',
    genres: ['Sci-Fi', 'Action'],
    director: 'The Wachowskis',
    cast: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss'],
    overview:
      'A hacker learns that his world is a simulation and joins a fight to free people from the machines.',
  },
  {
    id: 5,
    title: 'Parasite',
    year: 2019,
    rating: 8.5,
    runtime: '2h 12m',
    genres: ['Drama', 'Thriller'],
    director: 'Bong Joon-ho',
    cast: ['Song Kang-ho', 'Lee Sun-kyun', 'Cho Yeo-jeong'],
    overview:
      'A poor family slowly gets jobs working for a rich family, but things do not go as planned.',
  },
  {
    id: 6,
    title: 'The Godfather',
    year: 1972,
    rating: 9.2,
    runtime: '2h 55m',
    genres: ['Crime', 'Drama'],
    director: 'Francis Ford Coppola',
    cast: ['Marlon Brando', 'Al Pacino', 'James Caan'],
    overview:
      'The head of a crime family slowly hands over control to his youngest son.',
  },
  {
    id: 7,
    title: 'Pulp Fiction',
    year: 1994,
    rating: 8.5,
    runtime: '2h 34m',
    genres: ['Crime', 'Drama'],
    director: 'Quentin Tarantino',
    cast: ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson'],
    overview:
      'Several stories about criminals in Los Angeles connect in surprising ways.',
  },
  {
    id: 8,
    title: 'Forrest Gump',
    year: 1994,
    rating: 8.5,
    runtime: '2h 22m',
    genres: ['Drama', 'Romance'],
    director: 'Robert Zemeckis',
    cast: ['Tom Hanks', 'Robin Wright', 'Gary Sinise'],
    overview:
      'A kind man from Alabama accidentally takes part in many big historical events.',
  },
  {
    id: 9,
    title: 'The Avengers',
    year: 2012,
    rating: 8.0,
    runtime: '2h 23m',
    genres: ['Action', 'Sci-Fi'],
    director: 'Joss Whedon',
    cast: ['Robert Downey Jr.', 'Chris Evans', 'Scarlett Johansson'],
    overview:
      'A group of superheroes team up to stop a villain from taking over the planet.',
  },
  {
    id: 10,
    title: 'Spirited Away',
    year: 2001,
    rating: 8.6,
    runtime: '2h 5m',
    genres: ['Animation', 'Fantasy'],
    director: 'Hayao Miyazaki',
    cast: ['Rumi Hiiragi', 'Miyu Irino', 'Mari Natsuki'],
    overview:
      'A young girl enters a world of spirits and must find a way to save her parents.',
  },
  {
    id: 11,
    title: 'Joker',
    year: 2019,
    rating: 8.2,
    runtime: '2h 2m',
    genres: ['Drama', 'Crime'],
    director: 'Todd Phillips',
    cast: ['Joaquin Phoenix', 'Robert De Niro', 'Zazie Beetz'],
    overview:
      'A failed comedian slowly turns to crime in a city that has given up on him.',
  },
  {
    id: 12,
    title: 'Avatar',
    year: 2009,
    rating: 7.9,
    runtime: '2h 42m',
    genres: ['Sci-Fi', 'Adventure'],
    director: 'James Cameron',
    cast: ['Sam Worthington', 'Zoe Saldana', 'Sigourney Weaver'],
    overview:
      'A soldier on an alien planet must choose between his orders and the people he comes to care about.',
  },
]

// a list of all the genres (used by the dropdown on the home page)
export const allGenres = ['Action', 'Adventure', 'Animation', 'Crime', 'Drama', 'Fantasy', 'Romance', 'Sci-Fi', 'Thriller']

// find one movie by its id (used by the movie details page)
export function getMovieById(id) {
  return movies.find((m) => m.id === Number(id))
}
