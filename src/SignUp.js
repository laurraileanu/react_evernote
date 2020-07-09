import React, {useCallback} from 'react'
import {withRouter, Link} from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const firebase = require('firebase')

const SignUp = ({ history }) => {
    
    const styles = {
        margin:'30px',
        padding:'30px',
        border: '1px solid',
        borderRadius: '4px',
        display: 'inline-block'
    }

    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
            await firebase
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value);
            history.push("/");
        } catch (error) {
            alert(error);
        }
    }, [history]);

    return(
        <form style={styles} autoComplete="off" onSubmit={handleSignUp}>
            <h1>Register</h1>
            <div>
                <TextField type="email" name="email" label="Email" required/>
            </div>
            <div>
                <TextField type="password" name="password" label="Password" required/>
            </div>
            <br></br>
            <br></br>
            <Button variant="contained" color="primary" type="submit">
                Primary
            </Button>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </form>
    )
}

export default withRouter(SignUp)