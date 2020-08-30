import React from 'react';
import './login.css';
import { Button  } from '@material-ui/core';
import { auth, provider } from '../firebase';
import { actionTypes } from '../../reducer';
import { useStateValue } from '../../StateProvider';

export default function Login() {

    const [{}, dispatch] = useStateValue();
    const signIn = () => {
        auth.signInWithPopup(provider)
            .then((result) =>  {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                });
            })
            .catch(err => alert(err.message));
    };

    return(
        <div className="login">
            <div className="login_container">

                <div className="login_text">
                    <h1>login to vratChat</h1>
                </div>

                <Button onClick={signIn}>
                    Sign In With Google
                </Button>
            </div>
        </div>
    );
}