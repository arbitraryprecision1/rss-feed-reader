import React from "react";

module.exports = class GenericFeed extends React.Component {
  render() {
    const items = this.props.data.items.map(i => (<p>({i.date_modified}): <a href={i.url}>{i.title}</a></p>));
    return (<div><h1>{this.props.data.title}</h1> {items}</div>);
  }
}