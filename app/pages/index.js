import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

export default function Home() {
  return (
    <>
      <Container>
        <h1>Some heading</h1>
        <p>some text</p>
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
    </>
  );
}