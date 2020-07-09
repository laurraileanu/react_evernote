import React, { useCallback, useContext } from "react";
import { withRouter, Redirect, Link } from "react-router-dom";
import { AuthContext } from "./auth.js";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const firebase = require('firebase')

const Login = ({history}) => {

    const styles = {
        margin:'30px',
        padding:'30px',
        border: '1px solid',
        borderRadius: '4px',
        display: 'inline-block'
    }

    const handleLogin = useCallback(
        async event => {
          event.preventDefault()
          const { email, password } = event.target.elements
          try {
            await firebase
              .auth()
              .signInWithEmailAndPassword(email.value, password.value)
            history.push("/")
          } catch (error) {
            alert(error)
          }
        },
        [history]
    );

    const { currentUser } = useContext(AuthContext)

    if (currentUser) {
        return <Redirect to="/"/>;
    }

    return(
        <form style={styles} autoComplete="off" onSubmit={handleLogin}>
            <h1>Login</h1>
            <div>
                <TextField type="email" name="email" label="Email" required/>
            </div>
            <div>
                <TextField type="password" name="password" label="Password" required/>
            </div>
            <br></br>
            <br></br>
            <Button variant="contained" color="primary" type="submit">
                Login
            </Button>
            <p>Dont have an account yet? <Link to="/signup">Signup</Link></p>
        </form>
    )
}

export default withRouter(Login)