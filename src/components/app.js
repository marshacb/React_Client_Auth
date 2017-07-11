import React, { Component } from 'react';

import Header from './header';

// app is always shown no matter what
// perfect for header
export default class App extends Component {
  render() {
    return (
      <div>
      <Header />
      React simple starter
      </div>
    );
  }
}
