import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import NavComponent from '../components/Navbar';


export default function Home() {
  const [data, setData] = useState('loading');

  async function getJson() {
    await fetch(
      'http://localhost:3000/?action=display&bridge=Twitter&context=By+username&u=3blue1brown&format=Json'
    )
    .then(r => r.json())
    .then(d => setData(d.title))
    .catch(err => err.toString())
  }

  useEffect(() => getJson());

  return (
    <div>
      <Head>
        <title>title</title>
      </Head>

      <Container class='container-fluid'>
        <Row>
          <Col>
            <NavComponent />
          </Col>
          <Col xs={8}>
            <Container>
              <h1>Some heading</h1>
              <p>some text</p>
              <p>{data}</p>
            </Container>
            <Container>
              <Row>
                <Col>
                  <Card>
                    <Card.Header>Card 1</Card.Header>
                    <Card.Body>
                    <Card.Title> Card Title </Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and make up the bulk
                      of the card's content.
                    </Card.Text>
                  </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <Card.Header>Card 2</Card.Header>
                    <Card.Body>
                    <Card.Title> Card Title </Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and make up the bulk
                      of the card's content.
                    </Card.Text>
                  </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <Card.Header>Card 3</Card.Header>
                    <Card.Body>
                    <Card.Title> Card Title </Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and make up the bulk
                      of the card's content.
                    </Card.Text>
                  </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col>
          </Col>
        </Row>
      </Container>
    </div>
  );
}