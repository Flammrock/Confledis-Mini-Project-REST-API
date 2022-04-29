import { useState } from "react";
import axios from "axios";
import { Product } from "@backend/interfaces/product.interface";
import ProductComponent from "../components/productComponent";
import { Row, Col, Container, Button, Form, Alert } from "react-bootstrap";
import { getBackendURI } from "../utils/misc";

const ProductCreateComponent = () => {
  const [error, setError] = useState<Error | null>(null);
  const [createdProduct, setCreatedProduct] = useState<Product | null>(null);

  const handleClickNewCreate = () => {
    setError(null);
    setCreatedProduct(null);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    axios({
      method: "post",
      url: `${getBackendURI()}/api/v1/products`,
      data: Object.fromEntries(formData.entries()),
    })
      .then((res) => {
        setError(null);
        setCreatedProduct(res.data);
      })
      .catch((err) => {
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

  if (createdProduct == null) {
    return (
      <Container>
        <Row>
          <Col>
            <div className="text-center m-3 fs-3">Create a product</div>
          </Col>
        </Row>
        {error != null ? (
          <Row>
            <Col>
              <Alert key="form-product-create-error" variant="danger">
                Error: {error.message}
              </Alert>
            </Col>
          </Row>
        ) : (
          ""
        )}
        <Row>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className="mb-3" controlId="form-product-create-name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the name of the product"
                name="name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="form-product-create-price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Price (ex: 1.99, 15, 8.50, ...)"
                name="price"
                step="any"
                min="0"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="form-product-create-quantity"
            >
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Quantity (ex: 1, 4, 15, ...)"
                name="quantity"
                step="1"
                min="0"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Create
            </Button>
          </Form>
        </Row>
      </Container>
    );
  } else {
    return (
      <Container>
        <Row>
          <Col>
            <div className="text-center m-3 fs-3">
              Success, product <b>{createdProduct.name}</b> created!
            </div>
          </Col>
        </Row>
        <Row className="m-3">
          <Col className="d-flex justify-content-center">
            <Button variant="primary" onClick={handleClickNewCreate}>
              Create an other product
            </Button>
          </Col>
        </Row>
        <Row className="m-t-3 m-b-1">
          <Col className="d-flex justify-content-center">
            <i>Preview:</i>
          </Col>
        </Row>
        <div style={{ border: "1px solid #000" }}>
          <ProductComponent
            id={createdProduct.id}
            preview={true}
          ></ProductComponent>
        </div>
      </Container>
    );
  }
};

export default ProductCreateComponent;
