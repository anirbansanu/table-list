import * as genresAPI from "./fakeGenreService";

const movies = [
  {
    _id: "1",
    title: "Terminator",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    numberInStock: 6,
    dailyRentalRate: 2,
    publishDate: "2018-01-03T19:04:28.809Z",
    like: false
  },
  {
    _id: "2",
    title: "Die Hard",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    numberInStock: 5,
    dailyRentalRate: 2,
    like: false
  },
  {
    _id: "3",
    title: "Get Out",
    genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
    numberInStock: 8,
    dailyRentalRate: 3,
    like: false
  },
  {
    _id: "4",
    title: "Trip to Italy",
    genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
    numberInStock: 7,
    dailyRentalRate: 3,
    like: false
  },
  {
    _id: "5",
    title: "Airplane",
    genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
    numberInStock: 7,
    dailyRentalRate: 3,
    like: false
  },
  {
    _id: "6",
    title: "Wedding Crashers",
    genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
    numberInStock: 7,
    dailyRentalRate: 3,
    like: false
  },
  {
    _id: "7",
    title: "Gone Girl",
    genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
    numberInStock: 7,
    dailyRentalRate: 4,
    like: false
  },
  {
    _id: "8",
    title: "The Sixth Sense",
    genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
    numberInStock: 4,
    dailyRentalRate: 3,
    like: false
  },
  {
    _id: "9",
    title: "The Avengers",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    numberInStock: 7,
    dailyRentalRate: 3,
    like: false
  },
  {
    _id: "10",
    title: "End Game",
    genre: { _id: "5b21ca3eeb7f6fbccd471819", name: "Action" },
    numberInStock: 5,
    dailyRentalRate: 4,
    like: false
  },
  {
    _id: "11",
    title: "Man Of Steel",
    genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Action" },
    numberInStock: 7,
    dailyRentalRate: 4,
    like: false
  },
  {
    _id: "12",
    title: "Interstellar",
    genre: { _id: "5b21ca3eeb7f6fbccd47182a", name: "Action" },
    numberInStock: 7,
    dailyRentalRate: 5,
    like: false
  },
  {
    _id: "13",
    title: "Spider-Man: Far from Home",
    genre: { _id: "5b21ca3eeb7f6fbccd47182b", name: "Action" },
    numberInStock: 6,
    dailyRentalRate: 3,
    like: false
  },
  {
    _id: "14",
    title: "Ant-Man",
    genre: { _id: "5b21ca3eeb7f6fbccd47182c", name: "Action" },
    numberInStock: 2,
    dailyRentalRate: 3,
    like: false
  },
  {
    _id: "15",
    title: "Deepwater Horizon",
    genre: { _id: "5b21ca3eeb7f6fbccd47182d", name: "Action" },
    numberInStock: 3,
    dailyRentalRate: 2,
    like: false
  }
];

export function getMovies() {
  return movies;
}

export function getMovie(id) {
  return movies.find(m => m._id === id);
}

export function saveMovie(movie) {
  let movieInDb = movies.find(m => m._id === movie._id) || {};
  movieInDb.name = movie.name;
  movieInDb.genre = genresAPI.genres.find(g => g._id === movie.genreId);
  movieInDb.numberInStock = movie.numberInStock;
  movieInDb.dailyRentalRate = movie.dailyRentalRate;

  if (!movieInDb._id) {
    movieInDb._id = Date.now();
    movies.push(movieInDb);
  }

  return movieInDb;
}

export function deleteMovie(id) {
  let movieInDb = movies.find(m => m._id === id);
  movies.splice(movies.indexOf(movieInDb), 1);
  return movieInDb;
}
