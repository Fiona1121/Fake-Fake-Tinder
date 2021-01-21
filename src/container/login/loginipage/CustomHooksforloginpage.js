import { set } from 'mongoose';
import {useState, useRef} from 'react';
import client from "../../../client";

const useLoginForm = (initialValues, callback) => {
  const [inputs, setInputs] = useState(initialValues);
  const [toHomePage, setToHomePage] = useState(false);
  
  
  client.onmessage = (message) => {
    const { data } = message;
    const [task, payload] = JSON.parse(data);

    switch (task) {
        case "response_for_login": {
            const {msg} = payload; 
            console.log(msg);
            alert(`${msg}`);
            // if(msg==="Sign up sucessfully"){
            //   console.log("here")
            //   setInputs(initialValues)
            //   setPhoto(null)
            //   setPhotodata(null)
            // }

            if (msg==="Welcome"){
              setToHomePage(true)
            }

            break;
        }
    }
  };


  const sendData = (data) => {
    client.send(JSON.stringify(data));
  };
  const sendUserLogin = (userinfo)=> {
    let { id, password} = userinfo;
    let userdata={  "id":id, "password": password}
    sendData(  ["userLogin",userdata])
  }

  const handleSubmit = async(event) => {
    if (event) event.preventDefault();
      callback();
    console.log(inputs)
    sendUserLogin(inputs)
    setInputs(initialValues)
  }
  const handleInputChange = (event) => {
    event.persist();
    setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
  }
  
  return {
    handleSubmit,
    handleInputChange, 
    inputs,
    toHomePage
  };
}
export default useLoginForm;