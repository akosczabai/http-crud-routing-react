import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

type Movie = {
  id: number;
  title: string;
  genres: string;
  releaseDate: string;
  description: string;
  country: string;
};

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await loadMovies();
    })();
  }, []);

  const loadMovies = async () => {
    const movies = await axios.get(
      "http://localhost:3000/movies?_order=desc&_sort=id"
    );
    setMovies(movies.data);
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:3000/movies/${id}`);
    await loadMovies();
  };

  const confirmDelete = (id: number) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      handleDelete(id);
    }
  };

  return (
    <div className="row flex-grow-1 justify-content-center align-items-top">
      <div className="col-8 text-center pt-4">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Genres</th>
              <th>Release Date</th>
              <th>Description</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody className="align-middle">
            {movies &&
              movies.map((movie: Movie) => {
                return (
                  <tr key={movie.id}>
                    <td>{movie.id}</td>
                    <td>{movie.title}</td>
                    <td>{movie.genres}</td>
                    <td>{movie.releaseDate}</td>
                    <td>{movie.description}</td>
                    <td>{movie.country}</td>
                    <td>
                      <button
                        className="btn btn-success me-2"
                        onClick={() => navigate(`/edit-movie/${movie.id}`)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => confirmDelete(movie.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
