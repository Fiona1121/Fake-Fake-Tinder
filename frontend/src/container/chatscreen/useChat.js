import { useState } from 'react'
// import { w3cwebsocket as W3CWebSocket } from 'websocket'

// const client = new W3CWebSocket('ws://localhost:4000')
const client = new WebSocket('ws://localhost:4000')

const useChat = () => {
  const [messages, setMessages] = useState([])
  const [status, setStatus] = useState({})
  const [opened, setOpened] = useState(false)
  

  // const chatuser1 = { id:"3"}
  // const chatuser2 = { id:"891206"}
  // const chatuser3 = { id: "123"}

  const [chatuserlist,setChatuserlist] = useState([])
  const [chatuserid,setChatuserid]=useState("")
  const [fromId,setFromId] = useState('891206')
  const [toId,setToId] = useState('')

  

  const handleToidchange = (newid) => {
    //setChatuserid(newid)
    setToId(newid)
  }
  const handleFromidchange = (newid) => {
    
    setFromId(newid)
  }

  const getchatuserlist = () => {
    //console.log("getchatuserlist")
    sendData(["getchatuserlist",{fromId:fromId}])
  }






  client.onmessage = (message) => {
    const { data } = message
    const [task, payload] = JSON.parse(data)
    //console.log(task, payload)
    switch (task) {
      case 'initMsg': {
        setMessages(() => payload)
        break
      }
      case 'resOfSendMessage': {
        setMessages( (messages) => [...messages, ...payload])
        
        break
      }
      case `broadcast${fromId}`: {
        setMessages( (messages) => [...messages, ...payload])
        
        break
      }
      case "initchatuserlist":{
        console.log("initchatuserlist")
        console.log(payload)
        setChatuserlist(payload)
      }
      case 'status': {
        setStatus(payload)
        //console.log('status')
        break
      }
      case 'cleared': {
        //console.log('cleared')
        setMessages([])
        break
      }
      
      default:
        break
    }
  }

  const sendData = (data) => {
    // TODO
    client.send(JSON.stringify(data))
  }

  const sendMessage = (msg) => {
    // TODO
    sendData(['messageInput', msg]);
  };

  //console.log('frontend intoChat 1')
  client.onopen = () => {
    //console.log('frontend intoChat 2')
    setOpened(true)
    sendData(['intoChat',{msg : 'intoChatInit'}])
    
  }

  const clearMessages = () => {
    // TODO
    client.send(JSON.stringify(['clear','']))
  }

  return {
    status,
    opened,
    messages,

    chatuserlist,
    fromId,
    toId,
    handleFromidchange,
    handleToidchange,

    sendMessage,
    clearMessages,

    getchatuserlist
  }
}

export default useChat

