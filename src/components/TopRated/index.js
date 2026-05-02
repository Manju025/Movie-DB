import {useState, useEffect} from 'react'
import Pagination from '@mui/material/Pagination'
import Header from '../Header'
import Footer from '../Footer'
import Card from '../Card'
import './TopRated.css'

const TopRated = () => {
  const [topRated, setTopRated] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = `https://api.themoviedb.org/3/movie/top_rated?api_key=4695068ae1f5065e4fd2ae5b40e0ff23&language=en-US&page=${page}`
      const apiToken =
        'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Njk1MDY4YWUxZjUwNjVlNGZkMmFlNWI0MGUwZmYyMyIsIm5iZiI6MTc3NzM3MTI5Ni4wOTUsInN1YiI6IjY5ZjA4OGEwNWRhYWY2YTc3OWE5ZTc1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gm72BX2-K0eStv1VRm8LYnQ2K3G8oPwUsHLJtASq2Zs'

      const response = await fetch(apiKey, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${apiToken}`,
          'Content-Type': 'Application/json',
        },
      })

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
      <h1 className="title">Top Rated Movies</h1>
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
