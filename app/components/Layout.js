import Head from 'next/head';
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavComponent from "../components/Navbar.js"

module.exports = class Layout extends React.Component {
  render() {
    const blogs = ["a", "b"]; 

    return (
          <>
            <Head>
              <title>title</title>
            </Head>

            <Container class='container-fluid'>
              <Row>
                <Col>
                  <NavComponent blogs={blogs} />
                </Col>
                <Col xs={8}>
                  {this.props.children}
                </Col>
                <Col>
                </Col>
              </Row>
            </Container>
          </>
        );
    }
}