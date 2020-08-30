import React, { useState } from 'react';
import { Router } from '@reach/router';
import { useStateValue } from '../../StateProvider';
import Login from '../../components/Login/Login';
import Sidebar from '../../components/Sidebar/Sidebar';
import Chat from '../../components/Chat/Chat';
import './Main.css';
import '../../components/Chat/chat.css';

export default function Main() {
    const [{user}, dispatch] = useStateValue();

    return(
        <div className="container">
            {!user ? (
                <Login />
            ): (
            <>
            <Sidebar />
            <Router className="chat">
                <Chat path="/rooms/:roomId" />
            </Router>
            </>

            )}
        </div>
    )
}