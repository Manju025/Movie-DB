export const getPopularMoviesURL = page =>
  `https://api.themoviedb.org/3/movie/popular?api_key=4695068ae1f5065e4fd2ae5b40e0ff23&language=en-US&page=${page}`

export const getTopRatedMoviesURL = page =>
  `https://api.themoviedb.org/3/movie/top_rated?api_key=4695068ae1f5065e4fd2ae5b40e0ff23&language=en-US&page=${page}`

export const getUpcomingMoviesURL = page =>
  `https://api.themoviedb.org/3/movie/upcoming?api_key=4695068ae1f5065e4fd2ae5b40e0ff23&language=en-US&page=${page}`

export const getSearchMoviesURL = (query, page) =>
  `https://api.themoviedb.org/3/search/movie?api_key=4695068ae1f5065e4fd2ae5b40e0ff23&query=${encodeURIComponent(
    query,
  )}&page=${page}`
