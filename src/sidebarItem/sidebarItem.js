import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeHTMLTags } from '../helpers';

const SidebarItemComponent = (props) => {
    const {note, index, selectedNoteIndex, classes} = props
    const selectNote = (n,i) => props.selectNote(n, i)
    const deleteNote = (n) => {
        if(window.confirm(`Are you sure you want to delete: ${n.title}`)) {
            props.deleteNote(n)
        }
    }
    return(
        <div key={index} >
            <ListItem 
                className={classes.listItem}
                selected={selectedNoteIndex === index}
                alignItems='flex-start'
            >
                <div 
                    className={classes.textSection} 
                    onClick={() => selectNote(note, index)}
                >
                    <ListItemText
                        primary={note.title}
                        secondary={removeHTMLTags(note.body.substring(0,30)) + '...'}
                    >
                    </ListItemText>
                </div>
                <DeleteIcon className={classes.deleteIcon} onClick={() => deleteNote(note)}></DeleteIcon>
            </ListItem>
        </div>
    )
}

export default withStyles(styles)(SidebarItemComponent)