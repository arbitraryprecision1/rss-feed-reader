import Head from 'next/head';
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavComponent from "../components/Navbar.js"

module.exports = class Layout extends React.Component {
  render() {
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
                  {this.props.mainComponent}
                </Col>
                <Col>
                </Col>
              </Row>
            </Container>
          </div>
        );
    }
}