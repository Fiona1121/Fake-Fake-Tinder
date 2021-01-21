import './chatscreen.css'
import React, { useEffect, useRef, useState } from 'react'
import useChat from './useChat'
import { Button, Input, message, Tag } from 'antd'

function Chatscreen() {
  const { status, opened, messages, chatuserlist, fromId, toId, handleFromidchange, handleToidchange, sendMessage, clearMessages, getchatuserlist } = useChat()




  const [username, setUsername] = useState('')
  const [body, setBody] = useState('')
  
  const bodyRef = useRef(null)




 
   
  
  const displayStatus = (s) => {
    if (s.msg) {
      const { type, msg } = s
      const content = {
        content: msg,
        duration: 0.5
      }

      switch (type) {
        case 'success':
          message.success(content)
          break
        case 'info':
          message.info(content)
          break
        case 'danger':
        default :
          message.error(content)
          break
      }
    }
  }
  
  
  

  useEffect(() => {
    displayStatus(status)
  }, [status])

  

  return (
    <div className="App-chatscreen">
      <button onClick={getchatuserlist}> getchatuserlist   </button>
        
      <div className="App-title">
        <h1>Chat Room</h1>
        <Button type="primary" danger onClick={clearMessages}>
          Clear
        </Button>
      </div>
      
      <p> From Id : {fromId}</p>
      <p> To Id : {toId}</p>
      <div className="App-messages">
      
        {messages.length === 0 ? (
          <p style={{ color: '#ccc' }}>
            {opened? 'No messages...' : 'Loading...'}
          </p>
        ) : (
          messages.map((message, i) => (
            message.fromId === fromId ? (
            <p className="App-message" key={i}>
              <Tag color="blue">{fromId + ":"}</Tag> {message.body}
            </p>
            ):(
              <p className="App-message" key={i}>
              <Tag color="blue">{message.fromId + ":"}  </Tag> {message.body}
            </p>

            )
          ))
        )}
      </div>
      
      {/* <Input
        
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: 10 }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            bodyRef.current.focus()
          }
        }}
      ></Input> */}
      <div className="control">
          <select onChange={e => handleToidchange(e.target.value)}>
              {chatuserlist.map((chatuser, i) => {
                  return <option key={i}>{chatuser.id}</option>;
                  })}
          </select>
      </div>
      <div className="control">
          <select onChange={e => handleFromidchange(e.target.value)}>
              {chatuserlist.map((chatuser, i) => {
                  return <option key={i}>{chatuser.id}</option>;
                  })}
          </select>
      </div>
      
      <Input.Search
        rows={4}
        value={body}
        ref={bodyRef}
        enterButton="Send"
        onChange={(e) => setBody(e.target.value)}
        placeholder="Type a message here..."
        onSearch={(msg) => {
          // if (!msg || !username) {
          //   displayStatus({
          //     type: 'error',
          //     msg: 'Please enter a username and a message body.'
          //   })
          //   return
          // }
        
          sendMessage({ fromId:fromId , toId:toId, body:body})
          setBody('')
        }}
      ></Input.Search>
    </div>
  )
}

export default Chatscreen
