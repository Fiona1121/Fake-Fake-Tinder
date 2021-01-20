import { useCallback, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded"; // setting button

const client = new WebSocket("ws://localhost:4000");

function Accountinterface() {
    const [imagebuffer, setImagebuffer] = useState(null);

    client.onmessage = (message) => {
        const { data } = message;
        const [task, payload] = JSON.parse(data);

        switch (task) {
            case "Image": {
                console.log("receive: Image");
                const { imagebuffer } = payload; // {imagebuffer:image.buffer}
                setImagebuffer(imagebuffer);

                break;
            }
        }
    };

    const sendData = (data) => {
        client.send(JSON.stringify(data));
    };

    var Hi_url = "60040f3741ef153e7cd5e71f";
    //sendData(['getImageByID',{_id: Hi_url}])
    const getphoto = async () => {
        sendData(["getImageByID", { ImageID: Hi_url }]);
        console.log(imagebuffer);
    };

    return (
        <div className="App-accountinterface">
            <div className="profile">
                {/*imagebuffer? <img src={imagebuffer} className='rounded mx-auto d-block' alt='figure' /> : null*/}
            </div>
            <div className="setting">
                <Link to="/loginpage">
                    <IconButton>
                        <SettingsRoundedIcon style={{ fontSize: 40 }} className="header__logo" />
                    </IconButton>
                </Link>
                {imagebuffer ? (
                    <img src={imagebuffer} className="rounded mx-auto d-block" alt="figure" />
                ) : (
                    <p>imagebuffer is null</p>
                )}
            </div>

            <button onClick={getphoto}> get photo</button>
        </div>
    );
}

export default Accountinterface;
