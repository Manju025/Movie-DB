import {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import Pagination from '@mui/material/Pagination'
import Header from '../Header'
import Footer from '../Footer'
import Card from '../Card'
import {getSearchMoviesURL} from '../../utils/constants'
import './Search.css'

const Search = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const initialQuery = queryParams.get('q') || ''

  const [searchData, setSearchData] = useState([])
  const [query, setQuery] = useState(initialQuery)
  const [inputValue, setInputValue] = useState(initialQuery)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const currentQuery = queryParams.get('q') || ''
    if (currentQuery !== query) {
      setQuery(currentQuery)
      setInputValue(currentQuery)
      setPage(1)
    }
  }, [location.search])

  useEffect(() => {
    const fetchData = async () => {
      if (query === '') return

      const response = await fetch(getSearchMoviesURL(query, page))
      const data = await response.json()

      const filteredMovies = data.results.filter(
        movie => movie.poster_path !== null,
      )
      setSearchData(filteredMovies)
      setTotalPages(data.total_pages)
    }

    fetchData()
    window.scrollTo(0, 0)
  }, [query, page])

  return (
    <div className="search">
      <Header />
      <div className="search-head">
        <input
          type="search"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="Movie Search..."
          className="input"
        />
        <button
          type="button"
          className="search-button"
          onClick={() => {
            setPage(1)
            setQuery(inputValue.trim())
          }}
        >
          Search
        </button>
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
              imageUrl={movie.poster_path}
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
