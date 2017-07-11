import React, { Component } from 'react';

import Header from './header';

// app is always shown no matter what
// perfect for header

// needs this to render nestes routes
// parent route gets nested routes as props.children
export default class App extends Component {
  render() {
    return (
      <div>
      <Header />
      {this.props.children}
      </div>
    );
  }
}
