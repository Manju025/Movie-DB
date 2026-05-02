import {useState, useEffect} from 'react'
import Pagination from '@mui/material/Pagination'
import Header from '../Header'
import Footer from '../Footer'
import Card from '../Card'
import {getTopRatedMoviesURL} from '../../utils/constants'
import './TopRated.css'

const TopRated = () => {
  const [topRated, setTopRated] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(getTopRatedMoviesURL(page))
      const data = await response.json()
      setTopRated(data.results)
      setTotalPages(data.total_pages)
    }
    fetchData()
    window.scrollTo(0, 0)
  }, [page])

  return (
    <div className="toprated">
      <Header />
      <h1 className="title">Top Rated</h1>
      <div className="home-cards">
        {topRated.map(movie => (
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

export default TopRated
