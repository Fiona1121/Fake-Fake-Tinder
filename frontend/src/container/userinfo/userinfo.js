import { useCallback, useState, useRef, useEffect } from 'react'

import IconButton from "@material-ui/core/IconButton";
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';// setting button

const client = new WebSocket('ws://localhost:4000')

function Userinfo(){ 
    const [selectedFile, setSelectedFile] = useState(null)
    const [filedata,setFiledata] = useState(null)

    const selectfilebtnRef = useRef( {} );

    const sendData = (data) => {
        client.send(JSON.stringify( data ))
    }
    
    const sendFile = (file)=>{// actually send image
        sendData(  ["sendfile",file])
    }

    const fileselectedHandler = async(event)=>{
        //console.log(event.target.files[0])
        //setSelectedFile(event.target.files[0])
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend = () =>{
            setSelectedFile(file)
            setFiledata(reader.result)
        }
        reader.readAsDataURL(file);
    }

    const testclick = ()=>{
        selectfilebtnRef.current.click();
        console.log("clicks")
    }


    const fileUploadHandler = ()=>{
        console.log('Filedata: ',filedata)
        //console.log(selectedFile)
        //console.log("clicks")
        if (!filedata) {
            console.log('filedata not found')
            return };
        sendFile({"filedata": filedata})
        console.log("done")
        setSelectedFile(null)
        setFiledata(null)
        selectfilebtnRef.current.value=null;

        
    };

    
    return(
        <div className="App-userinfo">
            <input 
              style={{display: 'none'}} 
              type="file" 
              onChange={(e)=> fileselectedHandler(e)}
              ref={selectfilebtnRef}
              />
            
            <button onClick={testclick}>Pick files </button>
            <button onClick={fileUploadHandler}>Upload </button>

            {filedata? <img src={filedata} className='rounded mx-auto d-block' alt='figure' /> : null}
        </div>
    )
    


}




export default Userinfo;