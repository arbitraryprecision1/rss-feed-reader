import { Navbar, Nav, Container, NavDropdown, Dropdown, ListGroup } from 'react-bootstrap';
import styles from '../styles/Navbar.module.css'

export default function NavComponent() {
  return (
    <Nav defaultActiveKey="/home" className="flex-column">
      <ListGroup variant='flush'>
        <ListGroup.Item>
          <Nav.Item>Hacker News</Nav.Item>
          <ul>
            <Nav.Link eventKey="link-1">Link</Nav.Link>
            <Nav.Link eventKey="link-1">Link</Nav.Link>
            
          </ul>
        </ListGroup.Item>
        <ListGroup.Item>
          <Nav.Item>Youtube</Nav.Item>
          <ul>
            <Nav.Link eventKey="link-1">Link</Nav.Link>
            <Nav.Link eventKey="link-1">Link</Nav.Link>
            
          </ul>
        </ListGroup.Item>
        <ListGroup.Item>
          <Nav.Item>Reddit</Nav.Item>
          <ul>
            <Nav.Link eventKey="link-1">Link</Nav.Link>
            <Nav.Link eventKey="link-1">Link</Nav.Link>
            
          </ul>
        </ListGroup.Item>
        <ListGroup.Item>
          <Nav.Item>Twitter</Nav.Item>
          <ul>
            <Nav.Link eventKey="link-1">Link</Nav.Link>
            <Nav.Link eventKey="link-1">Link</Nav.Link>
            
          </ul>
        </ListGroup.Item>
        <ListGroup.Item>
          <Nav.Item>Blogs</Nav.Item>
          <ul>
            <Nav.Link eventKey="link-1">Link</Nav.Link>
            <Nav.Link eventKey="link-1">Link</Nav.Link>
            
          </ul>
        </ListGroup.Item>
      </ListGroup>
    </Nav>
  );
}