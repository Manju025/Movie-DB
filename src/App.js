import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import TopRated from './components/TopRated'
import Upcoming from './components/Upcoming'
import Search from './components/Search'
import MovieDetails from './components/MovieDetails'
import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/top-rated" component={TopRated} />
      <Route path="/upcoming" component={Upcoming} />
      <Route path="/search" component={Search} />
      <Route path="/movie/:id" component={MovieDetails} />
    </Switch>
  </BrowserRouter>
)

export default App
