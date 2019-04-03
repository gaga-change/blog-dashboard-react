import React, { Component } from 'react'
import './App.scss'
import 'antd/dist/antd.css'
import getRouter from 'router'

class App extends Component {
  render() {
    return (
      <div className="App">
        {getRouter()}
      </div>
    )
  }
}

export default App
