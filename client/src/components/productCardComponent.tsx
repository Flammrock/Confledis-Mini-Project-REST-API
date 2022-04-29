import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "@backend/interfaces/product.interface";
import { Card, Button } from "react-bootstrap";
import "./3DCard.css";
import {
  handleCardMouseMove,
  handleCardMouseOut,
  handleCardMouseDown,
  handleCardMouseUp,
} from "./3DCard";

const ProductCardComponent: FC<{ product: Product; details?: boolean }> = ({
  product,
  details,
}) => {
  const navigate = useNavigate();

  const handleClickDetails = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Card
      style={{ margin: "0.5rem" }}
      onMouseMove={(e) => handleCardMouseMove(e)}
      onMouseOut={(e) => handleCardMouseOut(e)}
      onMouseDown={(e) => handleCardMouseDown(e)}
      onMouseUp={(e) => handleCardMouseUp(e)}
    >
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        {details ? (
          <ul>
            <li>
              <b>price:</b> {product.price}€
            </li>
            <li>
              <b>quantity:</b> {product.quantity}
            </li>
          </ul>
        ) : (
          ""
        )}
        <Button onClick={handleClickDetails} variant="primary">
          details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCardComponent;
