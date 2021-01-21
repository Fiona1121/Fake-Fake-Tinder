import './chatscreen.css'
import React, { useEffect, useRef, useState } from 'react'
import useChat from './useChat'
import { Button, Input, message, Tag } from 'antd'
import client from '../../client'

function Chatscreen({user}) {
  const {id, name, photo} = user
  const haveFriend = false
  const manSelect  = false

  const chatuser1={name:"123",id:"123"}
  const chatuser2={name:"456",id:"456"}

  const { status, opened, messages, sendMessage, clearMessages } = useChat()

  const [username, setUsername] = useState('')
  const [body, setBody] = useState('')
  const [fromId,setFromId] = useState('')
  const [toId,setToId] = useState('9')
  const bodyRef = useRef(null)

  const [chatuser,setChatuser]= useState("")
  const [chatuserlist,setChatuserlist] = useState([chatuser1,chatuser2])//init from backend

  const handleChatuserChange = (value) => {
    setChatuser(value)//value is chatuser
    setToId(value)
  }
  const SelectFrom = (value) => {
    //setChatuser(value)//value is chatuser
    setFromId(value)
  }

  
   
  const getinitchatusers = ()=>{
    console.log("init chatusers")
    sendData(['getchatusers',{userID: "1"}])
  }

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
  
  // const test = () =>{
  //   console.log('length of msg', messages.length)
  // }
  
  const sendData = (data) => {
    // TODO
    client.send(JSON.stringify(data))
  }

  useEffect(() => {
    displayStatus(status)
  }, [status])

  //console.log('length of msg', messages.length)

  return (
    <div className="App-chatscreen">
        <button onClick={getinitchatusers}></button><p>getinitchatusers</p>
       
      <img src="https://reurl.cc/V33ZY5"></img> {/* 顯示本人頭貼    */}
      <div className="App-title">
        <h1> {name}'s Room </h1> {/*設定名字 */}
        <Button type="primary" danger onClick={clearMessages}>
          Clear
        </Button>
      </div>
      
      <p> From Id : {fromId}</p>
      <p> To Id : {toId}</p>
      <p> chatuser: {chatuser}</p>
      <div className="App-messages">
      
        {messages.length === 0 ? (
          <p style={{ color: '#ccc' }}>
            {opened? 'No messages...' : 'Loading...'}
          </p>
        ) : (
          messages.map(({ body, fromId, toId }, i) => {
            console.log(id, body, fromId, toId)
            if(id === fromId || id === toId ){
            <p className="App-message" key={i} style={{color : "black"}}>
               <Tag color="black"><img src="https://reurl.cc/V33ZY5"></img></Tag> {body}{/* 每條訊息都要有人頭圖片 */}
            </p>
            }
          })
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
      <div>
        <select onChange = {e =>handleChatuserChange(e.target.value)}>
          {chatuserlist.map((chatuser, i)=>{
              return <option key= {i}> {chatuser.name}</option>
          })}
        </select>  
      </div>
      <div>
        <select onChange = {e =>SelectFrom(e.target.value)}>
          {chatuserlist.map((chatuser, i)=>{
              return <option key= {i}> {chatuser.name}</option>
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
          console.log("sendmessage")
          sendMessage("messageInput",{ fromId:7, toId:5, body:body})
          console.log(id, toId, body)
          setBody('')
        }}
      ></Input.Search>
    </div>
  )
}

export default Chatscreen
