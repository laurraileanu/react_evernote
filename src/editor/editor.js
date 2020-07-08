import React from 'react'
import ReactQuill from 'react-quill'
import debounce from '../helpers'
import BorderColorIcon from '@material-ui/icons/BorderColor'
import {withStyles} from '@material-ui/core/styles'
import styles from './styles'

class EditorComponent extends React.Component {
    constructor() {
        super()
        this.state = {
            text: '',
            title: '',
            id: ''
        }
    }

    componentDidMount = () => {
        this.setState({
            text: this.props.selectedNote.body,
            title: this.props.selectedNote.title,
            id:this.props.selectedNote.id
        })
    }

    componentDidUpdate = () => {
        if(this.props.selectedNote.id !== this.state.id) {
            this.setState({
                text: this.props.selectedNote.body,
                title: this.props.selectedNote.title,
                id:this.props.selectedNote.id
            })
        }
    }

    updateBody = (val) => {
        this.setState({
            text: val
        })
        this.update()
    } 

    update = debounce(() => {
        this.props.noteUpdate(this.state.id, {
            title: this.state.title,
            body: this.state.text
        })
    }, 1500)

    updateTitle = async (event) => {
        const {value} = event.target
        await this.setState({
            title: value
        })
        this.update()
    }

    render() {
        const {classes} = this.props
        return(
            <div className={classes.editorContainer}>
                <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
                <input
                    className={classes.titleInput}
                    placeholder="note title..."
                    value={this.state.title ? this.state.title : ''}
                    onChange={this.updateTitle}
                />
                <ReactQuill 
                    value={this.state.text} 
                    onChange={this.updateBody}
                />
            </div>
        )
    }
}

export default withStyles(styles)(EditorComponent)