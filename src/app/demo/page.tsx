'use client';

import { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Box,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { getChatbotResponse } from '../services/chatbot.service';
import ChatIcon from '@mui/icons-material/Chat';
import CircularProgress from '@mui/material/CircularProgress';

interface Message {
  id: number;
  text: string;
  sentByUser: boolean;
}

export default function Demo() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [isFollowUp, setIsFollowUp] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendMessage = async () => {
    if (input.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: input,
        sentByUser: true,
      };
      setMessages([...messages, newMessage]);
      setIsLoading(true);
      const botResponse = await getChatbotResponse(input, isFollowUp);

      if (botResponse) {
        const responseMessage: Message = {
          id: messages.length + 2,
          text: botResponse.answer,
          sentByUser: false,
        };
        setMessages((prevMessages) => [...prevMessages, responseMessage]);
        setIsFollowUp(true);
        setIsLoading(false);
        setInput('');
      }
    }
  };

  return (
    <Container
      maxWidth='sm'
      style={{
        minHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'end',
        padding: '20px',
        position: 'relative',
      }}
    >
      {messages.length > 0 ? (
        <Button
          sx={{ position: 'absolute', top: 0, right: 0, color: 'white' }}
          onClick={() => {
            setMessages([]);
            setIsFollowUp(false);
            setIsLoading(false);
            setInput('');
          }}
          startIcon={<ChatIcon />}
        >
          Start a New Chat
        </Button>
      ) : (
        ''
      )}
      <List>
        {messages.map((msg) => (
          <ListItem key={msg.id}>
            <ListItemAvatar>
              <Avatar sx={{ background: 'none' }}>
                {msg.sentByUser ? (
                  <PersonIcon sx={{ color: 'white' }} />
                ) : (
                  <SmartToyIcon sx={{ color: 'royalblue' }} />
                )}{' '}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={msg.text}
              style={{ color: msg.sentByUser ? 'white' : 'royalblue' }}
            />
          </ListItem>
        ))}
        {isLoading ? <CircularProgress size={'20px'} /> : ''}
      </List>

      <Box display='flex' marginTop={2}>
        <TextField
          fullWidth
          variant='outlined'
          placeholder='Type your message...'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          sx={{ backgroundColor: 'white', borderRadius: '10px' }}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <Button
          variant='contained'
          color='inherit'
          onClick={sendMessage}
          style={{ marginLeft: '10px', borderRadius: '10px' }}
        >
          Send
        </Button>
      </Box>
    </Container>
  );
}
