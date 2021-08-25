import React from "react";

module.exports = class GenericFeed extends React.Component {
  render() {
    const items = this.props.data.items.map(i => (
      <li key={i.title}>
        ({i.date_modified}): <a href={i.url}>{i.title}</a>
      </li>
      )
    );
    
    return (
      <>
        <h1>{this.props.data.title}</h1> 
        <ul>
          {items}
        </ul>
      </>
    );
  }
}