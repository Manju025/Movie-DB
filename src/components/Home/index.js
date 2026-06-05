import {useState, useEffect} from 'react'
import {useLocation, useHistory} from 'react-router-dom'
import Pagination from '@mui/material/Pagination'
import Header from '../Header'
import Card from '../Card'
import Footer from '../Footer'
import {getPopularMoviesURL} from '../../utils/constants'
import './Home.css'

const Home = () => {
  const location = useLocation()
  const history = useHistory()
  const queryParams = new URLSearchParams(location.search)
  const initialPage = parseInt(queryParams.get('page')) || 1

  const [popularMovies, setPopularMovies] = useState([])
  const [page, setPage] = useState(initialPage)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(getPopularMoviesURL(page))
      const result = await response.json()
      setPopularMovies(result.results)
      setTotalPages(result.total_pages)
    }
    fetchData()
    window.scrollTo(0, 0)
  }, [page])

  const handlePageChange = (event, value) => {
    setPage(value)
    history.push(`/?page=${value}`)
  }

  return (
    <div className="home">
      <Header />
      <h2 className="title">Popular</h2>
      <div className="home-cards">
        {popularMovies.map(movie => (
          <Card
            key={movie.id}
            id={movie.id}
            imageUrl={movie.poster_path}
            name={movie.title}
            rating={movie.vote_average}
          />
        ))}
      </div>
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

export default Home
