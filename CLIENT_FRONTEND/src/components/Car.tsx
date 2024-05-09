import { ICar } from "../types/types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import FetchBaseError from "./FetchBaseError";
import {
  useDeleteCarAdminPriviledgeMutation,
  useDeleteCarMutation,
} from "../features/cars/carsApiSlice";

/**
 *
 * @param car a car object / an object with the properties of a car
 * @returns A component which displays properties of a car.
 */
function Car({ car }: { car: ICar }) {
  const navigate = useNavigate();

  const [deleteCar, { error: regularUserError }] = useDeleteCarMutation();
  const [deleteCarAdminPriviledge, { error: adminError }] =
    useDeleteCarAdminPriviledgeMutation();

  const currentUser = useAppSelector((state) => state.auth.user);

  /**
   * Navigate to to edit car page when the user clicks the "Edit" button.
   */
  function handleGoToEditCarPage(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    navigate(`edit/${car.carId}`);
  }

  /**
   * Make a DELETE request to delete a car note when the user clicks the "Delete" button.
   */
  async function handleDeleteCar(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    await deleteCar(car.carId).unwrap();
  }

  /**
   * Make a DELETE request to delete a car note when an admin clicks the "Delete" button.
   */
  async function handleDeleteCarAdminPriviledge(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    await deleteCarAdminPriviledge(car.carId).unwrap();
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>{car.model}</Card.Title>
        <Card.Text>{car.brand}</Card.Text>
        <Card.Text>{car.fuel}</Card.Text>
        {currentUser?.roles.includes("admin") && (
          <Card.Text>User ID: {car.userId}</Card.Text>
        )}
        {car.userId === currentUser?.userId && (
          <Button
            variant="primary"
            onClick={handleGoToEditCarPage}
            style={{ marginRight: "9px" }}
          >
            Edit
          </Button>
        )}
        {!currentUser?.roles.includes("admin") ? (
          <Button
            variant="danger"
            onClick={handleDeleteCar}
            style={{ marginRight: "9px" }}
          >
            Delete
          </Button>
        ) : (
          <Button
            variant="danger"
            onClick={handleDeleteCarAdminPriviledge}
            style={{ marginRight: "9px" }}
          >
            Delete
          </Button>
        )}
        {regularUserError && <FetchBaseError error={regularUserError} />}
        {adminError && <FetchBaseError error={adminError} />}
      </Card.Body>
    </Card>
  );
}

export default Car;
