import React from "react";
import { useState, useRef } from "react";
import useSignUpForm from "./CustomHooks";
import { Link, useHistory } from "react-router-dom";
import { Redirect } from "react-router";
import "./signuppage.css";

const Signuppage = () => {
    const signup = () => {
        //     alert(`User Created!
        // Name: ${inputs.Name}
        // Sex: ${inputs.Sex}`);
    };
    const {
        inputs,
        photo,
        photodata,
        toHomePage,
        selectsex,
        selectsexes,
        handleInputChange,
        handlePhotoInputChange,
        handleSubmit,
        handleSelectsexChange,
    } = useSignUpForm({ Name: "", Sex: "", id: "", password1: "", password2: "" }, signup);
    const selectfilebtnRef = useRef({});
    const clickselectphoto = () => {
        //selectfilebtnRef.current.click();
        console.log("clickselectphoto");
    };
    return toHomePage ? (
        <Redirect to="/" />
    ) : (
        <div className="section is-fullheight">
            <div className="container">
                <div className="column is-4 is-offset-4">
                    <div className="box">
                        <form onSubmit={handleSubmit} autoComplete="off">
                            <div className="field">
                                <h3 className="h3 has-text-centered">Name</h3>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="text"
                                        name="Name"
                                        onChange={handleInputChange}
                                        value={inputs.Name}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="field">
                                {/* <h3 className="h3 has-text-centered">Sex</h3>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="text"
                                        name="Sex"
                                        onChange={handleInputChange}
                                        value={inputs.Sex}
                                        required
                                    />
                                </div> */}
                                <h3 className="h3 has-text-centered">Sex</h3>
                                <div className="control">
                                    <select onChange={e => handleSelectsexChange(e.target.value)}>
                                        {selectsexes.map((selectsex, i) => {
                                            return <option key={i}>{selectsex}</option>;
                                            })}
                                    </select>
                                </div>
                            </div>

                            <div className="field">
                                <h3 className="h3 has-text-centered">id</h3>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="text"
                                        name="id"
                                        onChange={handleInputChange}
                                        value={inputs.id}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <h3 className="h3 has-text-centered">Password</h3>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="password"
                                        name="password1"
                                        onChange={handleInputChange}
                                        value={inputs.password1}
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <h3 className="h3 has-text-centered">Re-enter Password</h3>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="password"
                                        name="password2"
                                        onChange={handleInputChange}
                                        value={inputs.password2}
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <h3 className="h3 has-text-centered">Photo</h3>
                                <div className="control">
                                    <input
                                        className="input"
                                        style={{ display: "" }}
                                        type="file"
                                        onChange={handlePhotoInputChange}
                                        ref={selectfilebtnRef}
                                    />
                                    {/*<button className="btn_for_select_photo" onClick={clickselectphoto}>Pick Photo </button>*/}
                                </div>
                            </div>
                            <br></br>
                            <br></br>
                            <button className="btn-one" type="submit">
                                Sign Up
                            </button>
                            <h3>Already has an account?</h3>
                            <Link to="/loginpage">
                                <button className="btn">Login</button>
                            </Link>
                        </form>
                        {photodata ? <img src={photodata} className="rounded mx-auto d-block" alt="figure" /> : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signuppage;

{
    /* <div className="field">
                <label className="label has-text-centered">Email Address</label>
                <div className="control">
                  <input className="input" type="email" name="email" onChange={handleInputChange} value={inputs.email} required />
                </div>
              </div> */
}
