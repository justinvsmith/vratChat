import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Avatar, IconButton } from '@material-ui/core';
import './chat.css';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import MoreVertical from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import moment from 'moment';
import { useStateValue } from '../../StateProvider';
import io from 'socket.io-client';
import { set } from 'mongoose';

export default function Chat({roomId}){

    const [message, setMessage] = useState("");
    const [room, setRoom] = useState("");
    const [messages, setMessages] = useState([]);
    const[{user}, dispatch] = useStateValue("");
    const [socket] = useState(() => io(':8001'));

    useEffect(() => {
        axios.get('http://localhost:8001/api/rooms/' + roomId)
            .then(res => {
                setRoom(res.data)
            });
        
        axios.get('http://localhost:8001/api/rooms/' + roomId + '/messages')
            .then(res => {
                setMessages(res.data)
            });
    }, [roomId])

    useEffect(() => {
        console.log(socket);
        socket.emit('join', room.name)

        return () => socket.disconnect();
    }, [socket])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        })
    }, [messages])

    const sendMessage = (e) => {
        e.preventDefault();
        console.log('you typed:', message)
        setMessage('');

        if(message){
        socket.emit('sendMessage', message, () => setMessage(''));
        }

        axios.post('http://localhost:8001/api/rooms/' + roomId, {
            user: user.displayName,
            message
        })
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
                {messages.map((message, idx) => (
                    <p key={idx} className={`chat_message ${message.user === user.displayName && "chat_receiver"}`}>
                    <span className="chat_name">{message.user}</span>
                    {message.message}
                    <span className="chat_timestamp">{moment(message.createdAt).format('h:mm:ss a')}</span>
                </p>
                ))}
            </div>
            <div className="chat_footer">
                <IconButton>
                    <InsertEmoticonIcon className="iconColor" />
                </IconButton>
                <form>
                    <input type="text" 
                        placeholder="Type a message" 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)} />
                    <button onClick={sendMessage} type="submit">Send Message</button>
                </form>
                <IconButton>
                    <MicIcon className="iconColor" />
                </IconButton>
            </div>
        </div>
    )
}