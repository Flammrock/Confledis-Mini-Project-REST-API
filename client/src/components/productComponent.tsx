import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Product } from "@backend/interfaces/product.interface";
import {
  Row,
  Col,
  Container,
  Button,
  ButtonGroup,
  Table,
  Form,
} from "react-bootstrap";
import { getBackendURI } from "../utils/misc";

const ProductComponent: FC<{
  id: number;
  edit?: boolean;
  preview?: boolean;
}> = ({ id, edit, preview }) => {
  const navigate = useNavigate();

  const [error, setError] = useState<Error | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    axios
      .get(`${getBackendURI()}/api/v1/products/${id}`)
      .then((res) => {
        setIsLoaded(true);
        setProduct(res.data);
      })
      .catch((err) => {
        setIsLoaded(true);
        if (
          typeof err !== "undefined" &&
          typeof err.response !== "undefined" &&
          typeof err.response.data !== "undefined" &&
          typeof err.response.data.error !== "undefined"
        ) {
          setError({ message: err.response.data.error } as Error);
        } else {
          setError(err);
        }
      });
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    axios({
      method: "put",
      url: `${getBackendURI()}/api/v1/products/${id}`,
      data: Object.fromEntries(formData.entries()),
    })
      .then((res) => {
        setIsLoaded(true);
        navigate(`/product/${id}`);
      })
      .catch((err) => {
        setIsLoaded(true);
        if (
          typeof err !== "undefined" &&
          typeof err.response !== "undefined" &&
          typeof err.response.data !== "undefined" &&
          typeof err.response.data.error !== "undefined"
        ) {
          setError({ message: err.response.data.error } as Error);
        } else {
          setError(err);
        }
      });
  };

  const handleClickDelete = () => {
    setIsLoaded(false);
    axios
      .delete(`${getBackendURI()}/api/v1/products/${id}`)
      .then((res) => {
        setIsLoaded(true);
        navigate(`/`);
      })
      .catch((err) => {
        setIsLoaded(true);
        if (
          typeof err !== "undefined" &&
          typeof err.response !== "undefined" &&
          typeof err.response.data !== "undefined" &&
          typeof err.response.data.error !== "undefined"
        ) {
          setError({ message: err.response.data.error } as Error);
        } else {
          setError(err);
        }
      });
  };

  const handleClickEdit = () => {
    navigate(`/product/edit/${id}`);
  };

  const field = (
    name: keyof Product,
    type: string,
    value: any,
    suffix?: string,
    step?: string
  ) => {
    if (edit) {
      return (
        <tr>
          <td>{name}</td>
          <td>
            {type==='number'?<Form.Group controlId={`form-product-edit-${name as string}`}>
              <Form.Control
                name={name as string}
                type={type}
                step={step?step:'any'}
                defaultValue={value}
              />
            </Form.Group>:<Form.Group controlId={`form-product-edit-${name as string}`}>
              <Form.Control
                name={name as string}
                type={type}
                defaultValue={value}
              />
            </Form.Group>}
            
          </td>
        </tr>
      );
    } else {
      return (
        <tr>
          <td>{name}</td>
          <td>
            {value}
            {suffix}
          </td>
        </tr>
      );
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (product == null) {
    return <div>No product</div>;
  } else {
    return (
      <Container>
        <Row>
          <Col>
            <div className="text-center m-3 fs-3">Product - {product.name}</div>
          </Col>
        </Row>
        {!edit && !preview ? (
          <Row>
            <Col className="d-flex justify-content-center">
              <ButtonGroup>
                <Button variant="primary" onClick={handleClickEdit}>
                  Edit
                </Button>
                <Button variant="danger" onClick={handleClickDelete}>
                  Delete
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        ) : (
          ""
        )}
        <Row className="m-4">
          <Col>
            <Form onSubmit={(e) => handleSubmit(e)}>
              <Table striped bordered hover>
                <tbody>
                  {field("name", "text", product.name)}
                  {field("price", "number", product.price, "€", "any")}
                  {field("quantity", "number", product.quantity)}
                </tbody>
              </Table>
              {edit && !preview ? (
                <Button variant="primary" type="submit">
                  Save
                </Button>
              ) : (
                ""
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
};

export default ProductComponent;
