import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

type Car = {
  id: number;
  brand: string;
  model: string;
  year: number;
  country: string;
  damage: 0 | 1;
  color: string;
};

export default function Cars() {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await loadCars();
    })();
  }, []);

  const loadCars = async () => {
    const cars = await axios.get(
      "http://localhost:3000/cars?_order=desc&_sort=id"
    );
    setCars(cars.data);
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:3000/cars/${id}`);
    await loadCars();
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
              <th>Brand</th>
              <th>Model</th>
              <th>Year</th>
              <th>Country</th>
              <th>Damage</th>
              <th>Color</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody className="align-middle">
            {cars &&
              cars.map((car: Car) => {
                return (
                  <tr key={car.id}>
                    <td>{car.brand}</td>
                    <td>{car.model}</td>
                    <td>{car.year}</td>
                    <td>{car.country}</td>
                    <td>{car.damage === 0 ? "NotDamaged" : "Damaged"}</td>
                    <td>{car.color}</td>
                    <td>
                      <button
                        className="btn btn-success me-2"
                        onClick={() => navigate(`/edit-car/${car.id}`)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => confirmDelete(car.id)}
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
