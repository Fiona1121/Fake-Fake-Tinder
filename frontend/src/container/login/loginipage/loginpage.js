import React from "react";
import { useState, useRef } from "react";
import useLoginForm from "./CustomHooksforloginpage";
import { Link, useHistory } from "react-router-dom";
import { Redirect } from "react-router";
import "./loginpage.css";

const Loginpage = () => {
    const login = () => {
        //     alert(`User Created!
        // Name: ${inputs.Name}
        // Sex: ${inputs.Sex}`);
    };

    const { inputs, toHomePage, handleInputChange, handleSubmit } = useLoginForm({ id: "", password: "" }, login);

    return toHomePage ? (
        <Redirect to="/" />
    ) : (
        <div className="section is-fullheight">
            <div className="container">
                <div className="column is-4 is-offset-4">
                    <div className="box">
                        <form onSubmit={handleSubmit} autoComplete="off">
                            <div className="field">
                                <label className="label has-text-centered">id</label>
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
                                <label className="label has-text-centered">Password</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="password"
                                        name="password"
                                        onChange={handleInputChange}
                                        value={inputs.password}
                                    />
                                </div>
                            </div>

                            <button className="button is-block is-fullwidth is-success" type="submit">
                                Log in
                            </button>
                            <p>Has no account?</p>
                            <Link to="/signuppage">
                                <button>Sign up Page</button>
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loginpage;

{
    /* <div className="field">
                <label className="label has-text-centered">Email Address</label>
                <div className="control">
                  <input className="input" type="email" name="email" onChange={handleInputChange} value={inputs.email} required />
                </div>
              </div> */
}
