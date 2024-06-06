import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import './Chat.css';

const Chat = () => {
    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);
    const [userMessage, setUserMessage] = useState('');
    const token = localStorage.getItem('token');
    const [userName, setUserName] = useState(null);
    const [chatVisible, setChatVisible] = useState(false);
    const [hasNewMessage, setHasNewMessage] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (!token) {
                    throw new Error('Token not found');
                }

                const response = await fetch('http://localhost:5000/api/Auth/profileInfo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({ token })
                });
                if (response.ok) {
                    const data = await response.json();
                    setUserName(data.first + " " + data.last);
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchUser();
    }, [token]);

    useEffect(() => {
        if (userName) {
            const newConnection = new signalR.HubConnectionBuilder()
                .withUrl('http://localhost:5000/chathub', {
                    accessTokenFactory: () => token
                })
                .withAutomaticReconnect()
                .build();

            setConnection(newConnection);
        }
    }, [userName, token]);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected!');
                    connection.on('ReceiveMessage', (user, message) => {
                        setMessages(messages => [...messages, { user, message }]);
                        if (!chatVisible) {
                            setHasNewMessage(true);
                        }
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection, chatVisible]);

    const sendMessage = async () => {
        if (connection._connectionStarted) {
            try {
                await connection.send('SendMessage', userName, userMessage);
                setUserMessage('');
            } catch (e) {
                console.log(e);
            }
        } else {
            alert('No connection to server yet.');
        }
    };

    const toggleChat = () => {
        setChatVisible(!chatVisible);
        if (chatVisible) {
            setHasNewMessage(false);
        }
    };

    if (!userName) {
        return null; // Не показываем чат, если имя пользователя не загружено
    }

    return (
        <>
            <button className="open-button" onClick={toggleChat}>
                Chat {hasNewMessage && <span className="new-message-indicator">•</span>}
            </button>
            {chatVisible && (
                <div className="chat-popup" id="myForm">
                    <form className="form-container">
                        <h1>Chat</h1>

                        <div className="chat-messages">
                            {messages.map((m, index) => (
                                <div key={index}><strong>{m.user}:</strong> {m.message}</div>
                            ))}
                        </div>

                        <textarea 
                            placeholder="Type message.." 
                            name="msg" 
                            required 
                            value={userMessage}
                            onChange={e => setUserMessage(e.target.value)}
                        ></textarea>

                        <button type="button" className="btn" onClick={sendMessage}>Send</button>
                        <button type="button" className="btn cancel" onClick={() => setChatVisible(false)}>Close</button>
                    </form>
                </div>
            )}
        </>
    );
};

export default Chat;