import React from 'react'
import SidebarComponent from './sidebar/sidebar'
import EditorComponent from './editor/editor'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';

const firebase = require('firebase')

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedNoteIndex:null,
      selectedNote:null,
      notes:[]
    }
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

  newNote = async (title) => {
    const note = {
      title: title,
      body: ''
    }
    const newFromDB = await firebase
      .firestore()
      .collection('notes')
      .add({
        title: note.title,
        body: note.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
    const newID = newFromDB.id
    await this.setState({
      notes: [
        ...this.state.notes, 
        note
      ]
    })
    const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(note => note.id === newID)[0])
    this.setState({
      selectedNote: this.state.notes[newNoteIndex],
      selectedNoteIndex: newNoteIndex
    })
  }

  selectNote = (note, index) => {
    this.setState({
      selectedNoteIndex: index,
      selectedNote: note
    })
  }

  deleteNote = async (note) => {
    const noteIndex = this.state.notes.indexOf(note)
    await this.setState({ notes : this.state.notes.filter(_note => _note !== note) })
    if(this.state.selectedNoteIndex === noteIndex) {
      this.setState({
        selectedNoteIndex:null,
        selectedNote:null
      })
    } else if(this.state.notes.length >= 1) {
      this.state.selectedNoteIndex < noteIndex ?
        this.selectNote(this.state.notes[this.state.selectedNoteIndex], this.state.selectedNoteIndex) 
      :
        this.selectNote(this.state.notes[this.state.selectedNoteIndex - 1], this.state.selectedNoteIndex - 1)
    } else {
      this.setState({ selectedNote: null, selectedNoteIndex: null })
    }
    firebase
      .firestore()
      .collection('notes')
      .doc(note.id)
      .delete()
  }

  noteUpdate = (id, noteObj) => {
    firebase
      .firestore()
      .collection('notes')
      .doc(id)
      .update({
        title: noteObj.title,
        body: noteObj.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
  }

  render() {
    return(
      <div className="app-container">
        <SidebarComponent 
          selectedNoteIndex={this.state.selectedNoteIndex} 
          notes={this.state.notes} 
          newNote={this.newNote}
          selectNote={this.selectNote}
          deleteNote={this.deleteNote}
        />
        {
          this.state.selectedNote &&
          <EditorComponent
            selectedNote={this.state.selectedNote}
            selectedNoteIndex={this.state.selectedNoteIndex}
            notes={this.state.notes}
            noteUpdate={this.noteUpdate}
          />
        }
        <Button
          variant="contained"
          color="secondary"
          className="logout-btn"
          startIcon={<ExitToAppIcon />}
          onClick={() => {firebase.auth().signOut()}}
        >
          Sign out
        </Button>
      </div>
    )
  }
}

export default Home;