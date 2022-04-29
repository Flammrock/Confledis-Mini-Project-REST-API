import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Product } from "@backend/interfaces/product.interface";
import { Row, Col, Container, Button, ButtonGroup } from "react-bootstrap";
import ProductCard from "../components/productCardComponent";
import { getBackendURI } from "../utils/misc";

const HomePage = () => {
  const navigate = useNavigate();

  const [error, setError] = useState<Error | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [products, setProducts] = useState<Array<Product>>([]);

  const handleClickCreate = () => {
    navigate("/product/create");
  };
  const handleClickSearch = () => {
    navigate("/product/search");
  };

  useEffect(() => {
    axios
      .get(`${getBackendURI()}/api/v1/products`)
      .then((res) => {
        setIsLoaded(true);
        setProducts(res.data);
      })
      .catch((err) => {
        setIsLoaded(true);
        setError(error);
      });
  }, []);

  if (error) {
    return (
      <Container>
        <div>Error: {error.message}</div>
      </Container>
    );
  } else if (!isLoaded) {
    return (
      <Container>
        <div>Loading...</div>
      </Container>
    );
  } else {
    return (
      <Container>
        <Row>
          <Col>
            <div className="text-center m-3 fs-3">Products List</div>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center">
            <ButtonGroup>
              <Button variant="primary" onClick={handleClickCreate}>
                Create a product
              </Button>
              <Button variant="info" onClick={handleClickSearch}>
                Search a product
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
        <Row className="m-2">
          {products.length === 0
            ? "No product"
            : products.map((product) => (
                <Col xs={12} sm={6} md={4} lg={3} key={`product_${product.id}`}>
                  <ProductCard product={product} details={true}></ProductCard>
                </Col>
              ))}
        </Row>
      </Container>
    );
  }
};

export default HomePage;
