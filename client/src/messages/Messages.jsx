import React, { useState, useEffect, useRef } from 'react';
import ThreadList from './ThreadList.jsx';
import ChatList from './ChatList.jsx';
import DetailPane from './DetailPane.jsx';
import { useUserAuth } from '../context/UserAuthContext.jsx';
import './MessageStyles.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../App.css';

const Messages = ( props ) => {

  const [ threads, updateThreads ] = useState([]);
  const [ activeThread, changeThread ] = useState(0);
  const [ threadAdded, updateThreadAdded ] = useState(false);
  const [ threadsLoading, changeThreadsLoading ] = useState(true);
  // const [ userData, changeUserData ] = useState({});

  // const { user } = useUserAuth();
  const threadRef = useRef([]);
  const location = useLocation();
  const currentId = parseInt( localStorage.getItem( 'currentId' ));

  let itemID = null;
  // let userEmail = null;
  if ( location.state ) {
    itemID = location.state.itemID;
    // userEmail = location.state.userEmail;
  }

  useEffect(() => {
    // if ( currentId ) {
    //   getUserInfo();
    // }
    if ( itemID && !threadAdded ) {
      updateThreadAdded(true);
      addThread();
    }
    if ( threads.length === 0 && currentId ) {
      getThreads();
    }
    props.socketIO.on('message', ( message ) => {
      addMessage( message );
    });
  }, []);

  // const getUserInfo = async () => {
  //   const result = await axios.get(`/messages/threads/user?id=${ currentId }`);
  //   changeUserData( result.data );
  //   return;
  // };

  const addThread = async () => {
    await axios.post('/messages/threads', {
      itemId: itemID,
      renterId: currentId,
      timeUpdated: Date.now()
    });
    window.history.replaceState({}, document.title);
    getThreads();
  };

  const getThreads = async () => {
    const result = await axios.get(`/messages/threads?id=${ currentId }`);
    threadRef.current = result.data;
    updateThreads ( result.data );
    changeThreadsLoading( false );
  };

  const addMessage = ( message ) => {
    let newThreads = [ ...threadRef.current ];

    for (let newThread of newThreads) {
      if ( message.threadId === newThread.threadId &&
           message.timeCreated > newThread.timeUpdated ) {

        newThread.messages.push( message );
        newThread.timeUpdated = message.timeCreated;
        newThread.lastMessage = message.text;
      }
    }
    threadRef.current = newThreads;
    updateThreads( newThreads );
  };

  const sendMessage = ( message ) => {
    if ( threads.length === 0 ) {
      return;
    }
    let newMessage = {
      threadId: threads[ activeThread ].threadId,
      userId: currentId,
      text: message,
      imageUrl: null,
      timeCreated: Date.now()
    };
    props.socketIO.emit( 'message', newMessage );
  };

  if ( threadsLoading ) {
    return (
      <div id='messages-loading'>
        <img
          id='messages-loading-icon'
          src='https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator.gif'
        />
      </div>
    );
  }

  return (
    <section>

      <div id='messages-row'>

        {/* <input type='button' value='create thread' onClick={addThread}/> */}

        <div id='thread-column'>
          <ThreadList
            threads={ threads }
            activeThread={ activeThread }
            changeThread={ changeThread }
            userId={ currentId }
          />
        </div>

        <div id='chat-column'>
          <ChatList
            threads={ threads }
            messages={ threads.length > 0 ? threads[ activeThread ].messages : [] }
            sendMessage={ sendMessage }
            userId={ currentId }
          />
        </div>

        <div id='detail-column'>
          <DetailPane
            threads={ threads }
            activeThread={ activeThread }
            userId={ currentId }
          />
        </div>

      </div>
    </section>
  );
};

export default Messages;