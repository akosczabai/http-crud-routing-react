import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

type Car = {
  id: number;
  brand: string;
  model: string;
  year: number;
  country: string;
  damage: 0 | 1;
  color: string;
};

type FormState = {
  brand: string;
  model: string;
  year: number;
  country: string;
  damage: number;
  color: string;
};

export default function CarForm() {
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
        const car = await axios.get<Car>(`http://localhost:3000/cars/${id}`);
        const data = car.data;
        setValue("brand", data.brand);
        setValue("model", data.model);
        setValue("year", data.year);
        setValue("color", data.color);
        setValue("country", data.country);
        setValue("damage", data.damage);
      } else {
        reset();
      }
    })();
  }, [id]);

  const onSubmit = async (data: FormState) => {
    console.log(data);
    if (id) {
      await axios.put(`http://localhost:3000/cars/${id}`, data);
    } else {
      await axios.post("http://localhost:3000/cars", data);
    }
    navigate("/cars");
  };

  return (
    <div className="row flex-grow-1 justify-content-center align-items-top mb-4">
      <div className="col-6 pt-4">
        <form className="shadow p-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="brand" className="form-label">
              Brand
            </label>
            <input
              type="text"
              className="form-control mb-2"
              id="brand"
              aria-describedby="brand"
              {...register("brand", {
                required: true,
              })}
            />
          </div>
          {errors.brand && (
            <span className="text-danger">Brand field is required!!!</span>
          )}
          <div className="mb-3">
            <label htmlFor="model" className="form-label">
              Model
            </label>
            <input
              type="text"
              className="form-control mb-2"
              id="model"
              aria-describedby="model"
              {...register("model", {
                required: true,
              })}
            />
          </div>
          {errors.model && (
            <span className="text-danger">Model field is required!!!</span>
          )}
          <div className="mb-3">
            <label htmlFor="year" className="form-label">
              Year
            </label>
            <input
              type="number"
              min="1800"
              max="2023"
              className="form-control mb-2"
              id="year"
              aria-describedby="year"
              {...register("year", {
                required: true,
                valueAsNumber: true,
              })}
            />
          </div>
          {errors.year && (
            <span className="text-danger">Year field is required!!!</span>
          )}
          <div className="mb-3">
            <label htmlFor="country" className="form-label">
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
          <div className="mb-3">
            <label htmlFor="damage" className="form-label">
              Damage status
            </label>
            <select
              className="form-control"
              {...register("damage", {
                required: true,
                valueAsNumber: true,
              })}
            >
              <option value="1">Damaged</option>
              <option value="0">Not damaged</option>
            </select>
          </div>
          {errors.damage && (
            <span className="text-danger">Damage field is required!!!</span>
          )}
          <div className="mb-3">
            <label htmlFor="color" className="form-label">
              Color
            </label>
            <input
              type="text"
              className="form-control mb-2"
              id="color"
              aria-describedby="color"
              {...register("color", {
                required: true,
              })}
            />
          </div>
          {errors.color && (
            <span className="text-danger">Color field is required!!!</span>
          )}
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
