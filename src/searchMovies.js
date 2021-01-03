import React, {useState} from 'react'
import './CSS/searchMovies.css'
import MovieCard from './MovieCard'

export default function SearchMovies() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const searchMovies = async (e) => {
    e.preventDefault()

    const url = `https://api.themoviedb.org/3/search/movie?api_key=5dcf7f28a88be0edc01bbbde06f024ab&language=en-US&query=${query}&page=1&include_adult=false`;

    //? Filter Button
    const btn = document.createElement('button')
    btn.classList.add('filter-button');
    btn.setAttribute('type', 'button')
    btn.innerHTML = `Filter by rating`;
    document.querySelector('.card-list').appendChild(btn)

    try {
      //? Fetch Data from movie API
      const response = await fetch(url)
      const data = await response.json()
      setMovies(data.results)

      //? filter data by rating
      document.querySelector('.filter-button').onclick = function() {
        btn.style.display = 'block'
        const filter = data.results.map(movie => movie).sort((a,b) => a.vote_average - b.vote_average).reverse()
        setMovies(filter)
      }
    } catch (err) {
      console.error(err)
    }
    //? reset Input Value
    setQuery('')
  }
  return (
    <>
      <form className="form" onSubmit={searchMovies}>
        <label className="label" htmlFor="query">Movie Name</label>
        <input className="input" type="text" name="query"
          placeholder="i.e. Jurassic Park"
            value={query} onChange={(e) => setQuery(e.target.value)}
            />
        <button className="button" type="submit">Search</button>
      </form>
      <div className="card-list">
        {movies.filter(movie => movie.poster_path && movie.overview && (movie.vote_average !== 0)).map(movie => (
          <MovieCard movie={movie} key={movie.id}/>
        ))}
      </div>
    </>
  )
  }

