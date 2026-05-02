import {useHistory} from 'react-router-dom'
import './Card.css'

const Card = ({id, imageUrl, name, rating}) => {
  const history = useHistory()

  const onClickBtn = () => {
    history.push(`/movie/${id}`)
  }

  return (
    <div className="card">
      <img
        src={`https://image.tmdb.org/t/p/w500${imageUrl}`}
        alt={name}
        className="card-img"
      />
      <div className="card-details">
        <h2 className="card-name">{name}</h2>
        <p className="card-rating">Rating: {rating?.toFixed(1) || 'N/A'}</p>
        <button type="button" className="card-btn" onClick={onClickBtn}>
          View Details
        </button>
      </div>
    </div>
  )
}

export default Card
