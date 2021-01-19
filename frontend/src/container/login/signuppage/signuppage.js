import React from 'react';
import { useState, useRef} from 'react'
import useSignUpForm from './CustomHooks';
import { Link, useHistory } from "react-router-dom";
import { Redirect } from 'react-router'

const Signuppage = () => {
  const signup = () => {
//     alert(`User Created! 
// Name: ${inputs.Name}
// Sex: ${inputs.Sex}`);
  }
  const {inputs, photo, photodata, toHomePage, handleInputChange, handlePhotoInputChange, handleSubmit} = useSignUpForm({Name: '', Sex: '', id: '', password1: '', password2: ''}, signup);
  const selectfilebtnRef = useRef( {} );
  const clickselectphoto = ()=>{
    //selectfilebtnRef.current.click();
    console.log("clickselectphoto")
}
  return (
    toHomePage?<Redirect to='/'/>:
    <div className="section is-fullheight">
      <div className="container">
        <div className="column is-4 is-offset-4">
          <div className="box">
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="field">
                <label className="label has-text-centered">Name</label>
                <div className="control">
                  <input className="input" type="text" name="Name" onChange={handleInputChange} value={inputs.Name} required />
                </div>
              </div>
              
              <div className="field">
                <label className="label has-text-centered">Sex</label>
                <div className="control">
                  <input className="input" type="text" name="Sex" onChange={handleInputChange} value={inputs.Sex} required />
                </div>
              </div>
              
              <div className="field">
                <label className="label has-text-centered">id</label>
                <div className="control">
                  <input className="input" type="text" name="id" onChange={handleInputChange} value={inputs.id} required />
                </div>
              </div>

              <div className="field">
                <label className="label has-text-centered">Password</label>
                <div className="control">
                  <input className="input" type="password" name="password1" onChange={handleInputChange} value={inputs.password1}/>
                </div>
              </div>
              <div className="field">
                <label className="label has-text-centered">Re-enter Password</label>
                <div className="control">
                  <input className="input" type="password" name="password2" onChange={handleInputChange} value={inputs.password2}/>
                </div>
              </div>
              <div className="field">
                <label className="label has-text-centered">Photo</label>
                <div className="control">
                  <input className="input" 
                    style={{display: ''}}
                    type="file"  
                    onChange={handlePhotoInputChange}
                    ref={selectfilebtnRef}
                  /> 
                  {/*<button className="btn_for_select_photo" onClick={clickselectphoto}>Pick Photo </button>*/}
                </div>
              </div>
              <button className="button is-block is-fullwidth is-success" type="submit">Sign Up</button>
              <p>Has no account?</p> 
              <Link to="/loginpage">
                    <button>Log in Page</button>
              </Link>
            </form>
            {photodata? <img src={photodata} className='rounded mx-auto d-block' alt='figure' /> : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signuppage;


{/* <div className="field">
                <label className="label has-text-centered">Email Address</label>
                <div className="control">
                  <input className="input" type="email" name="email" onChange={handleInputChange} value={inputs.email} required />
                </div>
              </div> */}