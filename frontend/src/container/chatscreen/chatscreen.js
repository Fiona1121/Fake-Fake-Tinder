import './chatscreen.css'
import React, { useEffect, useRef, useState } from 'react'
import useChat from './useChat'
import { Button, Input, message, Tag } from 'antd'
import client from '../../client'

// function Chatscreen({user}) {
  // const {id, name, photo} = user
  // const haveFriend = false
  // const manSelect  = false

  // const chatuser1={name:"123",id:"123"}
  // const chatuser2={name:"456",id:"456"}

function Chatscreen() {
  const { status, opened, messages, chatuserlist, fromId, toId, handleFromidchange, handleToidchange, sendMessage, clearMessages } = useChat()

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
  
  
  
  const sendData = (data) => {
    // TODO
    client.send(JSON.stringify(data))
  }

  useEffect(() => {
    displayStatus(status)
  }, [status])

  

  return (
    <div className="App-chatscreen">
        {/* <button onClick={getinitchatusers}></button><p>getinitchatusers</p> */}
       
      {/* </div><img src="https://reurl.cc/V33ZY5"></img> 顯示本人頭貼    */}
        
      <div className="App-title">
        {/* <h1> {name}'s Room </h1> 設定名字 */}
        <Button type="primary" danger onClick={clearMessages}>
          Clear
        </Button>
      </div>
      
      <p> From Id : {fromId}</p>
      <p> To Id : {toId}</p>
      {/* <p> chatuser: {chatuser}</p> */}
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
        value= 'Select'
        //*** 這邊改成下拉式選單 也要修正toId 之後拿到他的資料 manSelect改成true 預設給9
        
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: 10, color:"black" }}
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
        style = {{background: "black"}}
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
