import { Row, Col, Container, Table } from "react-bootstrap";

const AboutPage = () => {
  return (
    <Container>
      <Row>
        <Col>
          <div className="text-center m-3 fs-3">About</div>
        </Col>
      </Row>
      <Row className="m-4">
        <Col>Author: <b>Lemmy Briot</b></Col>
      </Row>
      <Row className="m-4">
        <Col>
          Simple REST API using NodeJS (typescript + express + sequelize) as
          backend and ReactJS (typescript + axios + bootstrap) as frontend
        </Col>
      </Row>
      <Row className="m-4">
        <Col>API endpoints :</Col>
      </Row>
      <Row className="m-4">
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Method</th>
                <th>Path</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>GET</td>
                <td>/api/v1/products</td>
                <td>Get the products list</td>
              </tr>
              <tr>
                <td>GET</td>
                <td>/api/v1/products/:id</td>
                <td>
                  Get the product which have the corresponding <b>id</b> param
                </td>
              </tr>
              <tr>
                <td>POST</td>
                <td>/api/v1/products</td>
                <td>Creates a product</td>
              </tr>
              <tr>
                <td>PUT</td>
                <td>/api/v1/products/:id</td>
                <td>
                  Updates the product which have the corresponding <b>id</b>{" "}
                  param
                </td>
              </tr>
              <tr>
                <td>DELETE</td>
                <td>/api/v1/products/:id</td>
                <td>
                  Deletes the product which have the corresponding <b>id</b>{" "}
                  param
                </td>
              </tr>
              <tr>
                <td>POST</td>
                <td>/api/v1/products/search</td>
                <td>Searches products</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutPage;
