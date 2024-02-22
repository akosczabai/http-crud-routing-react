import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

type Movie = {
  id: number;
  title: string;
  genres: string;
  releaseDate: string;
  description: string;
  country: string;
};

type FormState = {
  id: number;
  title: string;
  genres: string;
  releaseDate: string;
  description: string;
  country: string;
};

export default function MovieForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormState>();

  useEffect(() => {
    (async () => {
      if (id) {
        const movie = await axios.get<Movie>(
          `http://localhost:3000/movies/${id}`
        );
        const data = movie.data;
        setValue("id", data.id);
        setValue("title", data.title);
        setValue("genres", data.genres);
        setValue("releaseDate", data.releaseDate);
        setValue("description", data.description);
        setValue("country", data.country);
      } else {
        reset();
      }
    })();
  }, [id]);

  const onSubmit = async (data: FormState) => {
    console.log(data);
    if (id) {
      await axios.put(`http://localhost:3000/movies/${id}`, data);
    } else {
      await axios.post("http://localhost:3000/movies", data);
    }
    navigate("/movies");
  };

  return (
    <div className="row flex-grow-1 justify-content-center align-items-top mb-4">
      <div className="col-6 pt-4">
        <form className="shadow p-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="model" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control mb-2"
              id="title"
              aria-describedby="title"
              {...register("title", {
                required: true,
              })}
            />
          </div>
          {errors.title && (
            <span className="text-danger">Title field is required!!!</span>
          )}
          <div className="mb-3">
            <label htmlFor="year" className="form-label">
              Genres
            </label>
            <input
              type="string"
              className="form-control mb-2"
              id="genres"
              aria-describedby="genres"
              {...register("genres", {
                required: true,
                valueAsNumber: true,
              })}
            />
          </div>
          {errors.genres && (
            <span className="text-danger">Genres field is required!!!</span>
          )}
          <div className="mb-3">
            <label htmlFor="country" className="form-label">
              Release Date
            </label>
            <input
              type="text"
              className="form-control mb-2"
              id="releaseDate"
              aria-describedby="releaseDate"
              {...register("releaseDate", {
                required: true,
              })}
            />
          </div>
          {errors.releaseDate && (
            <span className="text-danger">
              Release Date field is required!!!
            </span>
          )}

          <div className="mb-3">
            <label htmlFor="color" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control mb-2"
              id="description"
              aria-describedby="description"
              {...register("description", {
                required: true,
              })}
            />
          </div>
          {errors.description && (
            <span className="text-danger">
              Description field is required!!!
            </span>
          )}
          <div className="mb-3">
            <label htmlFor="color" className="form-label">
              Country
            </label>
            <input
              type="text"
              className="form-control mb-2"
              id="country"
              aria-describedby="country"
              {...register("country", {
                required: true,
              })}
            />
          </div>
          {errors.country && (
            <span className="text-danger">Country field is required!!!</span>
          )}
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
