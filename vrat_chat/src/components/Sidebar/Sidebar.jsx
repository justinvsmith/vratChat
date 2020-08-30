import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './sidebar.css';
import { Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertical from '@material-ui/icons/MoreVert';
import  SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SidebarChat from '../SidebarChat/SidebarChat';
import { useStateValue } from '../../StateProvider';

export default function Sidebar(){

    const [rooms, setRooms] = useState([]);
    const [{user}, dispatch] = useStateValue();

    useEffect(() => {
        axios.get('http://localhost:8001/api/rooms')
            .then(res => {
                setRooms(res.data)
            })
    }, [rooms])

    return(
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar src={user?.photoURL} />
                <div className="sidebar_headerRight">
                    <IconButton>
                        <DonutLargeIcon className="iconColor" />
                    </IconButton>
                    <IconButton>
                        <ChatIcon className="iconColor" />
                    </IconButton>
                    <IconButton>
                        <MoreVertical className="iconColor" />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                    <SearchOutlinedIcon />
                    <input type="text" placeholder="Search or start new chat"/>
                </div>
            </div>
            <div className="sidebar_chats">
                <SidebarChat addNewChat />
                <SidebarChat rooms={rooms} />
            </div>
        </div>
    )
}