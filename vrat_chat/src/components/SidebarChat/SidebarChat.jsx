import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Avatar } from '@material-ui/core';
import { navigate, Link } from '@reach/router';
import './SidebarChat.css';

export default function SidebarChat({ addNewChat, rooms }){
    const [seed, setSeed] = useState('');

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    const createChat = () => {
        const name = prompt('Please enter a name for chat')

        if (name){
            axios.post('http://localhost:8001/api/rooms',{
                name
            })
                .then(() => navigate('/'))
                .catch(err => console.log(err.response.data.errors))
        }
    };

    return !addNewChat ? (
        <>
        {rooms.map((room, idx) => {
        return <Link to={`/rooms/${room._id}`} key={idx}>
            <div  className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            <div className="sidebarChat_info">
                        <h2>{room.name}</h2>
                        <p>{rooms[2].message}</p>
                        <p>last message ...</p>
                    </div>
        </div>
                </Link>
                })}
                </>
    ) : (
        <div onClick={createChat}
        className="sidebarChat">
            <h2>Add New Chat</h2>
        </div>
    )
}