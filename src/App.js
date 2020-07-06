import React from 'react'
import './App.css'
import SidebarComponent from './sidebar/sidebar'
import EditorComponent from './editor/editor'

const firebase = require('firebase')

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedNodeIndex:null,
      selectedNode:null,
      notes:[]
    }
  }
  render() {
    return(
      <div className="app-container">
        <SidebarComponent 
          selectedNodeIndex={this.state.selectedNodeIndex} 
          notes={this.state.notes} 
        />
        <EditorComponent />
      </div>
    )
  }

  componentDidMount = () => {
    firebase
      .firestore()
      .collection('notes')
      .onSnapshot(serverUpdate => {
        const notes = serverUpdate.docs.map(_doc => {
          const data = _doc.data()
          data['id'] = _doc.id
          return data
        })
        console.log(notes)
        this.setState({
          notes: notes
        })
      })
  }

}

export default App;
