import React, { Component } from 'react';
import RootLayout from './components/root-layout'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <RootLayout />
        </header>
      </div>
    );
  }
}

export default App;
