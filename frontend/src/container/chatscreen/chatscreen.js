import './chatscreen.css'
import React, { useEffect, useRef, useState } from 'react'
import useChat from './useChat'
import { Button, Input, message, Tag } from 'antd'

function Chatscreen({user}) {
  const {id, name, photo} = user
  const haveFriend = false
  const manSelect  = false

  const { status, opened, messages, sendMessage, clearMessages } = useChat()

  const [username, setUsername] = useState('')
  const [body, setBody] = useState('')
  const [fromId,setFromId] = useState('')
  const [toId,setToId] = useState('9')
  const bodyRef = useRef(null)

  const testclick = ()=> {
    setFromId(username)
  }
   
  const testclicktoId = ()=> {
    setToId(username)
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
  
  const test = () =>{
    console.log('length of msg', messages.length)
  }
  

  useEffect(() => {
    displayStatus(status)
  }, [status])

  //console.log('length of msg', messages.length)

  return (
    <div className="App-chatscreen">
        <button onClick={test}></button>
       
      <img src="https://reurl.cc/V33ZY5"></img> {/* 顯示本人頭貼    */}
      <div className="App-title">
        <h1> {name}'s Room </h1> {/*設定名字 */}
        <Button type="primary" danger onClick={clearMessages}>
          Clear
        </Button>
      </div>
      
      <button onClick={testclick}></button>
      <p> From Id : {fromId}</p>
      <p> To Id : {toId}</p>
      <div className="App-messages">
      <button onClick={testclicktoId}></button>
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
      
      <Input
        placeholder="Username"
        value= 'Select'
        //*** 這邊改成下拉式選單 也要修正toId 之後拿到他的資料 manSelect改成true 預設給9*/
        
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: 10, color:"black" }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            bodyRef.current.focus()
          }
        }}
      ></Input>
      
      <Input.Search
        rows={4}
        value={body}
        ref={bodyRef}
        enterButton="Send"
        style = {{background: "black"}}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Type a message here..."
        onSearch={(msg) => {
          if (!msg || !username) {
            displayStatus({
              type: 'error',
              msg: 'Please enter a username and a message body.'
            })
            return
          }
          sendMessage({ fromId:id , toId:toId, body:body})
          setBody('')
        }}
      ></Input.Search>
    </div>
  )
}

export default Chatscreen
