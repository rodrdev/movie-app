import { useEffect, useState } from "react";
import "./styles/App.css";
import axios from "axios";
function App() {
  const [movies, setMovies] = useState(null);
  const [isActive, setIsActive] = useState(null);

  const getMovies = async () => {
    const { data } = await axios.get(
      "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1"
    );
    setMovies(data);
  };
  useEffect(() => {
    getMovies();
  }, []);
  useEffect(() => {
    console.log(movies);
  }, [movies]);

  return (
    <div className="container">
      <div className="row">
        {movies && (
          <div className="col">
            <div
              onMouseEnter={() => setIsActive(true)}
              onMouseLeave={() => setIsActive(false)}
              className="container-card"
            >
              <div className="card">
                <img
                  src={`https://image.tmdb.org/t/p/w1280${movies.results[0].poster_path}`}
                  className="card-img-top"
                />
                <div className="card-body movie-name">
                  <div className="row" style={{ textAlign: "center" }}>
                    <div className="col" style={{ color: "#fff" }}>
                      {movies?.results[0].title}
                    </div>
                    <div className="col">
                      <div className="box-vote">
                        {movies.results[0].vote_average}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={isActive ? "overview" : "invisible"}>
                  {movies?.results[0].overview}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
