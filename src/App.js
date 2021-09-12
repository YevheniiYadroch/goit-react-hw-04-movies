import { lazy, Suspense } from 'react';
import { NavLink, Route, Switch, Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import './App.css';

const HomePage = lazy(() => import('./components/HomePage/HomePage'));
const MoviesPage = lazy(() => import('./components/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() => import('./components/MovieDetailsPage/MovieDetailsPage'));


function App() {
  return (
    <div className="App">
      <nav className="Navigation">
        <NavLink to="/" exact className="NavLink" activeClassName="ActiveNavLink">
          Home
        </NavLink>
        <NavLink to="/movies" className="NavLink" activeClassName="ActiveNavLink"> 
          Movies
        </NavLink>
      </nav>
      <Suspense fallback={<Loader
        type="Puff"
        color="#00BFFF"
        height={200}
        width={200}
        className="Loader"
      />}>
        <Switch>
          <Route path="/"  exact component={HomePage} />
          <Route path="/movies" exact component={MoviesPage} />
          <Route path="/movies/:movieId" component={MovieDetailsPage} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;