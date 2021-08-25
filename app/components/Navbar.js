import { Navbar, Nav, Container, NavDropdown, Dropdown, ListGroup } from 'react-bootstrap';
import styles from '../styles/Navbar.module.css'
import Sources from '../public/sources.json'
import React from 'react';

module.exports = class NavComponent extends React.PureComponent {
  render() {
    const bloglinks = Sources.blogs.map(b => (<li key={b.name}> <Nav.Link href={"/blogs/"+b.name}>{b.name}</Nav.Link> </li>));
    const hnlinks = Sources.hackernews.map(h => (<li key={h.name}> <Nav.Link href={"/hn/"+h.name}>{h.name}</Nav.Link> </li>));
    const ytlinks = Sources.youtube.map(b => (<li key={b.name}> <Nav.Link href={"/yt/"+b.name}>{b.name}</Nav.Link> </li>));
    const redditlinks = Sources.reddit.map(b => (<li key={b.name}> <Nav.Link href={"/reddit/"+b.name}>{b.name}</Nav.Link> </li>));
    const twitterlinks = Sources.twitter.map(b => (<li key={b.name}> <Nav.Link href={"/twitter/"+b.name}>{b.name}</Nav.Link> </li>));

    return (
      <Nav defaultActiveKey="/home" className="flex-column">
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <Nav.Item>Hacker News</Nav.Item>
            <ul>
              {hnlinks}
            </ul>
          </ListGroup.Item>
          <ListGroup.Item>
            <Nav.Item>Youtube</Nav.Item>
            <ul>
              {ytlinks}
            </ul>
          </ListGroup.Item>
          <ListGroup.Item>
            <Nav.Item>Reddit</Nav.Item>
            <ul>
              {redditlinks}
            </ul>
          </ListGroup.Item>
          <ListGroup.Item>
            <Nav.Item>Twitter</Nav.Item>
            <ul>
              {twitterlinks}
            </ul>
          </ListGroup.Item>
          <ListGroup.Item>
            <Nav.Item>Blogs</Nav.Item>
            <ul>
              {bloglinks}
            </ul>
          </ListGroup.Item>
        </ListGroup>
      </Nav>
    );
  }
}