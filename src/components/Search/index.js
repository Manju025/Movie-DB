import {useState, useEffect} from 'react'
import Pagination from '@mui/material/Pagination'
import Header from '../Header'
import Footer from '../Footer'
import Card from '../Card'
import './Search.css'

const Search = () => {
  const [searchData, setSearchData] = useState([])
  const [text, setTest] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      if (text === '') return

      const url = `https://api.themoviedb.org/3/search/movie?api_key=4695068ae1f5065e4fd2ae5b40e0ff23&query=${text}&page=${page}`

      const response = await fetch(url)
      const data = await response.json()

      const filteredMovies = data.results.filter(
        movie => movie.poster_path !== null,
      )
      setSearchData(filteredMovies)
      setTotalPages(data.total_pages)
    }

    fetchData()
    window.scrollTo(0, 0)
  }, [text, page])

  return (
    <div className="search">
      <Header />
      <div className="search-head">
        <input
          type="search"
          value={text}
          onChange={e => setTest(e.target.value)}
          placeholder="Movie Search..."
          className="input"
        />
      </div>
      {searchData.length === 0 ? (
        <div className="search-empty">
          <p className="empty-text">Try Searching a Movie...</p>
        </div>
      ) : (
        <div className="home-cards search-res">
          {searchData.map(movie => (
            <Card
              key={movie.id}
              id={movie.id}
              imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              name={movie.title}
              rating={movie.vote_average}
            />
          ))}
        </div>
      )}
      <div className="paging-container">
        {totalPages === 1 ? null : (
          <Pagination
            count={totalPages}
            variant="outlined"
            onChange={(event, value) => setPage(value)}
            color="secondary"
            sx={{
              '& .MuiPaginationItem-root': {
                color: 'gray',
                borderColor: 'gray',
              },
              '& .Mui-selected': {
                backgroundColor: '#fff',
                color: 'gray',
              },
            }}
          />
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Search
