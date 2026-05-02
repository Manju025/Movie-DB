import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import './MovieDetails.css'

const MovieDetails = () => {
  const [movieData, setMovieData] = useState({})
  const [cast, setCast] = useState([])
  const {id} = useParams()

  const genres = movieData.genres?.map(g => g.name).join(', ')
  const duration = movieData.runtime
    ? `${Math.floor(movieData.runtime / 60)}h ${movieData.runtime % 60}m`
    : ''
  const companies = movieData.production_companies?.map(c => c.name).join(', ')
  const countries = movieData.production_countries?.map(c => c.name).join(', ')
  const languages = movieData.spoken_languages
    ?.map(l => l.english_name)
    .join(', ')

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = `https://api.themoviedb.org/3/movie/${id}?api_key=4695068ae1f5065e4fd2ae5b40e0ff23&language=en-US`
      const apiToken =
        'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Njk1MDY4YWUxZjUwNjVlNGZkMmFlNWI0MGUwZmYyMyIsIm5iZiI6MTc3NzM3MTI5Ni4wOTUsInN1YiI6IjY5ZjA4OGEwNWRhYWY2YTc3OWE5ZTc1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gm72BX2-K0eStv1VRm8LYnQ2K3G8oPwUsHLJtASq2Zs'
      const response = await fetch(apiKey, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      setMovieData(data)
    }

    const fetchCast = async () => {
      const apiKey = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`
      const apiToken =
        'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Njk1MDY4YWUxZjUwNjVlNGZkMmFlNWI0MGUwZmYyMyIsIm5iZiI6MTc3NzM3MTI5Ni4wOTUsInN1YiI6IjY5ZjA4OGEwNWRhYWY2YTc3OWE5ZTc1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gm72BX2-K0eStv1VRm8LYnQ2K3G8oPwUsHLJtASq2Zs'
      const response = await fetch(apiKey, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      setCast(data.cast)
    }

    fetchData()
    fetchCast()
    window.scrollTo(0, 0)
  }, [id])

  return (
    <div className="md">
      <div
        className="md-backdrop"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movieData.backdrop_path})`,
        }}
      >
        <Header />
        <div className="overlay" />

        <div className="md-hero">
          <img
            src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
            alt="poster"
            className="poster"
          />

          <div className="md-info">
            <h1>{movieData.title}</h1>
            <p className="tagline">{movieData.tagline}</p>

            <div className="meta">
              <span>⭐ {movieData.vote_average?.toFixed(1) || 'N/A'}</span>
              <span>{duration}</span>
              <span>{genres}</span>
              <span>{movieData.release_date}</span>
            </div>

            <p className="overview">{movieData.overview}</p>

            <div className="extra">
              <p>
                <strong>Languages:</strong> {languages}
              </p>
              <p>
                <strong>Countries:</strong> {countries}
              </p>
              <p>
                <strong>Production:</strong> {companies}
              </p>
              <p>
                <strong>Votes:</strong> {movieData.vote_count}
              </p>
              <p>
                <strong>Adult:</strong> {movieData.adult ? 'Yes' : 'No'}
              </p>
            </div>

            <div className="links">
              <a href={movieData.homepage} target="_blank" rel="noreferrer">
                ▶ Watch
              </a>
              <a
                href={`https://www.imdb.com/title/${movieData.imdb_id}`}
                target="_blank"
                rel="noreferrer"
              >
                IMDb
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="cast-section">
        <h2>Top Cast</h2>

        <div className="cast-grid">
          {cast.map(each => (
            <div key={each.id} className="cast-card">
              <img
                src={
                  each.profile_path !== null
                    ? `https://image.tmdb.org/t/p/w200${each.profile_path}`
                    : 'https://i.pinimg.com/736x/76/01/f5/7601f57a17473be024d6638225cd2d90.jpg'
                }
                alt={each.name}
              />
              <h4>{each.name}</h4>
              <p>{each.character}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default MovieDetails
