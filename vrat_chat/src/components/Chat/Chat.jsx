import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Avatar, IconButton } from '@material-ui/core';
import './chat.css';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import MoreVertical from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-dom';

export default function Chat({roomId}){

    const [input, setInput] = useState("");
    const [room, setRoom] = useState("");

    useEffect(() => {
        axios.get('http://localhost:8000/api/rooms/' + roomId)
            .then(res => {
                setRoom(res.data)
            });
    }, [roomId])

    console.log(roomId);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log('you typed:', input)
        setInput('');
    }

    return(
        <div className="chat"> 
            <div className="chat_header">
                <Avatar />
                <div className="chat_headerInfo">
                    <h3>{room.name}</h3>
                    <p>Last seen at...</p>
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlinedIcon className="iconColor" />
                    </IconButton>
                    <IconButton>
                        <AttachFileOutlinedIcon className="iconColor" />
                    </IconButton>
                    <IconButton>
                        <MoreVertical className="iconColor" />
                    </IconButton>
                </div>
            </div>
            <div className="chat_body">
                <p className={`chat_message ${true && "chat_receiver"}`}>
                    <span className="chat_name">Justin Smith</span>
                    Hey Guys
                    <span className="chat_timestamp">3:50pm</span>
                </p>
            </div>
            <div className="chat_footer">
                <IconButton>
                    <InsertEmoticonIcon className="iconColor" />
                </IconButton>
                <form>
                    <input type="text" 
                        placeholder="Type a message" 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)} />
                    <button onClick={sendMessage} type="submit">Send Message</button>
                </form>
                <IconButton>
                    <MicIcon className="iconColor" />
                </IconButton>
            </div>
        </div>
    )
}