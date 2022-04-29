import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Product } from "@backend/interfaces/product.interface";
import ProductCard from "./productCardComponent";
import { Row, Col, Container, Button, Form, Alert } from "react-bootstrap";
import _ from "lodash";
import { getBackendURI } from "../utils/misc";

const ProductSearchComponent = () => {
  const [error, setError] = useState<Error | null>(null);
  const [searchProducts, setSearchProducts] = useState<Array<Product> | null>(
    null
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const rawObjFormData = Object.fromEntries(formData.entries());
    const objFormData: any = {};
    const keys = Object.keys(rawObjFormData);
    keys.forEach((key) => {
      _.set(objFormData, key, rawObjFormData[key]);
    });
    const keysobj = Object.keys(objFormData);
    keysobj.forEach((key) => {
      if (
        typeof objFormData[key].value === "string" &&
        objFormData[key].value === ""
      ) {
        delete objFormData[key];
      }
      if (typeof objFormData[key] === "string" && objFormData[key] === "") {
        delete objFormData[key];
      }
    });
    axios({
      method: "post",
      url: `${getBackendURI()}/api/v1/products/search`,
      data: objFormData,
    })
      .then((res) => {
        setError(null);
        setSearchProducts(res.data);
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

  return (
    <Container>
      <Row>
        <Col>
          <div className="text-center m-3 fs-3">Search</div>
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
          <Form.Group className="mb-3" controlId="form-product-search-name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="part of name (suffix, prefix, ...)"
              name="name"
            />
            <Form.Text className="text-muted">
              Can be empty and this will search for all products which the name
              contain this value
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="form-product-search-id">
            <Form.Label>ID</Form.Label>
            <Row>
              <Col xs="auto">
                <Form.Select name="id.operator" defaultValue={"="}>
                  {["=", "<", ">", "<=", ">=", "!="].map((op, i) => (
                    <option key={`id-op-${op}`} value={op}>
                      {op}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <Form.Control
                  type="number"
                  placeholder="ID (ex: 1, 4, 15, ...)"
                  name="id.value"
                  step="1"
                  min="0"
                />
              </Col>
            </Row>
            <Form.Text className="text-muted">Can be empty</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="form-product-search-price">
            <Form.Label>Price</Form.Label>
            <Row>
              <Col xs="auto">
                <Form.Select name="price.operator" defaultValue={"="}>
                  {["=", "<", ">", "<=", ">=", "!="].map((op, i) => (
                    <option key={`price-op-${op}`} value={op}>
                      {op}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <Form.Control
                  type="number"
                  placeholder="Price (ex: 1.99, 15, 8.50, ...)"
                  name="price.value"
                  step="any"
                  min="0"
                />
              </Col>
            </Row>
            <Form.Text className="text-muted">Can be empty</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="form-product-search-quantity">
            <Form.Label>Quantity</Form.Label>
            <Row>
              <Col xs="auto">
                <Form.Select name="quantity.operator" defaultValue={"="}>
                  {["=", "<", ">", "<=", ">=", "!="].map((op, i) => (
                    <option key={`quantity-op-${op}`} value={op}>
                      {op}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <Form.Control
                  type="number"
                  placeholder="Quantity (ex: 1, 4, 15, ...)"
                  name="quantity.value"
                  step="1"
                  min="0"
                />
              </Col>
            </Row>
            <Form.Text className="text-muted">Can be empty</Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit">
            Search
          </Button>
        </Form>
      </Row>
      {searchProducts != null ? <hr /> : ""}
      {searchProducts != null ? (
        <Row className="m-2">
          {searchProducts.length === 0
            ? "No product"
            : searchProducts.map((product) => (
                <Col xs={12} sm={6} md={4} lg={3} key={`product_${product.id}`}>
                  <ProductCard product={product} details={true}></ProductCard>
                </Col>
              ))}
        </Row>
      ) : (
        ""
      )}
    </Container>
  );
};

export default ProductSearchComponent;
