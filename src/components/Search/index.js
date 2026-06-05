import {useState, useEffect} from 'react'
import {useLocation, useHistory} from 'react-router-dom'
import Pagination from '@mui/material/Pagination'
import Header from '../Header'
import Footer from '../Footer'
import Card from '../Card'
import {getSearchMoviesURL} from '../../utils/constants'
import './Search.css'

const Search = () => {
  const location = useLocation()
  const history = useHistory()
  const queryParams = new URLSearchParams(location.search)
  const initialQuery = queryParams.get('q') || ''
  const initialPage = parseInt(queryParams.get('page')) || 1

  const [searchData, setSearchData] = useState([])
  const [query, setQuery] = useState(initialQuery)
  const [inputValue, setInputValue] = useState(initialQuery)
  const [page, setPage] = useState(initialPage)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const currentQuery = queryParams.get('q') || ''
    const currentPage = parseInt(queryParams.get('page')) || 1
    setQuery(currentQuery)
    setInputValue(currentQuery)
    setPage(currentPage)
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

  const handlePageChange = (event, value) => {
    history.push(`/search?q=${query}&page=${value}`)
  }

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
            history.push(`/search?q=${inputValue.trim()}&page=1`)
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
            page={page}
            variant="outlined"
            onChange={handlePageChange}
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
