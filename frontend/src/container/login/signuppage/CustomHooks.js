import { useState, useRef } from "react";
import client from "../../../client";

const useSignUpForm = (initialValues, callback) => {
    const [inputs, setInputs] = useState(initialValues);
    const [photo, setPhoto] = useState(null);
    const [photodata, setPhotodata] = useState(null);
    const [toHomePage, setToHomePage] = useState(false);

    const [selectsex, setSelectsex] = useState("male");
    const [selectsexes, setSelectsexes] = useState(["none", "male", "female"]);

    const handleSelectsexChange = (value) => {
        setSelectsex(value);
    };

    client.onmessage = (message) => {
        const { data } = message;
        const [task, payload] = JSON.parse(data);

        switch (task) {
            case "response_for_signup": {
                const { msg } = payload;
                console.log(msg);
                alert(`${msg}`);
                // if(msg==="Sign up sucessfully"){
                //   console.log("here")
                //   setInputs(initialValues)
                //   setPhoto(null)
                //   setPhotodata(null)
                // }
                if (msg === "Sign up sucessfully") {
                    setToHomePage(true);
                }
                break;
            }
        }
    };

    const sendData = (data) => {
        client.send(JSON.stringify(data));
    };
    const sendUserSignup = (userinfo, photodata) => {
        let { Name, Sex, id, password1 } = userinfo;
        let userdata = { name: Name, sex: selectsex, id: id, password: password1, photodata: photodata };
        sendData(["setUser", userdata]);
    };

    const handleSubmit = async (event) => {
        if (event) event.preventDefault();
        callback();
        console.log(inputs, photodata);

        // await searchid(inputs.id);

        sendUserSignup(inputs, photodata);

        //console.log("her777777e");
        setInputs(initialValues);
        setPhoto(null);
        setPhotodata(null);
    };
    const handleInputChange = (event) => {
        event.persist();
        setInputs((inputs) => ({ ...inputs, [event.target.name]: event.target.value }));
    };
    const handlePhotoInputChange = (event) => {
        event.persist();
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend = () => {
            setPhoto(file);
            setPhotodata(reader.result);
        };
        reader.readAsDataURL(file);
    };
    return {
        handleSubmit,
        handleInputChange,
        handlePhotoInputChange,
        handleSelectsexChange,
        selectsex,
        selectsexes,
        inputs,
        photo,
        photodata,
        toHomePage,
    };
};
export default useSignUpForm;
