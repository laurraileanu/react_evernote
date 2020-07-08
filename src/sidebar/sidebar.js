import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItemComponent from '../sidebarItem/sidebarItem';

class SidebarComponent extends React.Component {
    constructor() {
        super()
        this.state = {
            addingNote: false,
            title: null
        }
    }

    newNoteBtnclick = () => {
        this.setState({
            title:null,
            addingNote: !this.state.addingNote
        })
    }

    updateTitle = (event) => {
        const {value} = event.target
        this.setState({
            title: value
        })
    }

    newNote = () => {
        this.props.newNote(this.state.title)
        this.setState({
            addingNote: false,
            title: null
        })
    }

    selectNote = (n, i) => {
        this.props.selectNote(n,i)
    }

    deleteNote = (n) => {
        this.props.deleteNote(n)
    }

    render() {

        const {notes, selectedNoteIndex, classes} = this.props
        const btnText = this.state.addingNote ? 'Cancel' : 'New Note'
        const notesList = notes.map((note,index) => {
            return(
                <div key={index}>
                    <SidebarItemComponent 
                        note={note} 
                        index={index} 
                        selectedNoteIndex={selectedNoteIndex}
                        selectNote={this.selectNote}
                        deleteNote={this.deleteNote}
                    />
                    <Divider></Divider>
                </div>
            )
        })

        return(
            <div className={classes.sidebarContainer}>
                <Button 
                    onClick={this.newNoteBtnclick}
                    className={classes.newNoteBtn}
                >
                    {btnText}
                </Button>
                {
                    this.state.addingNote &&

                    <div>
                        <input 
                            type="text" 
                            className={classes.newNoteInput} 
                            placeholder="Enter note title" 
                            onKeyUp={this.updateTitle}
                        />
                        <Button 
                            className={classes.newNoteSubmitBtn}
                            onClick={this.newNote}
                        >
                            Submit note
                        </Button>
                    </div>
                }
                <List>
                    {notesList}
                </List>
            </div>
        )
    }
}

export default withStyles(styles)(SidebarComponent)