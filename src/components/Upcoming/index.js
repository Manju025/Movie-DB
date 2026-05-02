import {useState, useEffect} from 'react'
import {FaRegCalendarAlt} from 'react-icons/fa'
import Pagination from '@mui/material/Pagination'
import Header from '../Header'
import Card from '../Card'
import Footer from '../Footer'
import {getUpcomingMoviesURL} from '../../utils/constants'
import './Upcoming.css'

const Upcoming = () => {
  const [upcoming, setUpComing] = useState([])
  const [maxDate, setMaxDate] = useState('')
  const [minDate, setMinDate] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(getUpcomingMoviesURL(page))
      const data = await response.json()
      setUpComing(data.results)
      setMaxDate(data.dates.maximum)
      setMinDate(data.dates.minimum)
      setTotalPages(data.total_pages)
    }
    fetchData()
    window.scrollTo(0, 0)
  }, [page])

  return (
    <div className="upcoming">
      <Header />
      <div className="upcoming-head">
        <h2 className="title">Upcoming</h2>
        <div className="upcoming-dates">
          <p>
            <FaRegCalendarAlt /> {new Date(minDate).toLocaleDateString('en-GB')}{' '}
            - {new Date(maxDate).toLocaleDateString('en-GB')}
          </p>
        </div>
      </div>
      <div className="home-cards">
        {upcoming.map(movie => (
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

export default Upcoming
