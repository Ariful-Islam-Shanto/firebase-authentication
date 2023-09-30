import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import auth from "../Firebase/firebase.config";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Register = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleRegister = (e) => {

    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepted = e.target.terms.checked;

    //? Reset the error and success
    setError("");
    setSuccess("");


    //? password validation
    if (password.length < 6) {
      setError("Password must be 6 characters or longer");
      return;
    }else if(!accepted) {
        setError('You"ve to accept the terms and condition to continue');
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const user = res.user;


        //? update profile at the same time when register
        updateProfile(user, {
          displayName: name || null,
        })
        .then(() => {})
        .catch(error => {
          setError(error.message);
        })


        //? send a verification email to new user
        sendEmailVerification(auth.currentUser)
        .then(() => {
          alert("Please check your email to verify.")
        })
        setSuccess("Successfully created account.")
        
      })

      .catch((error) => setError(error.message));
  };
  return (
    <div className="h-[100vh]">
      <form
        onSubmit={handleRegister}
        className=" w-1/3 border-blue-400 flex flex-col rounded-md p-6  bg-blue-50 border-2 mx-auto"
      >
        <h1 className="text-4xl mb-6 text-black text-center font-bold">
          Register
        </h1>
        <input
          type="text"
          placeholder="Name.."
          name="name"
          autoFocus
          className="h-10 p-3 rounded-md bg-white border-2"
        />
        <br />
        <input
          type="text"
          placeholder="Email.."
          name="email"
          autoFocus
          className="h-10 p-3 rounded-md bg-white border-2"
        />
        <br />
        <div className="relative w-full">
        <input
          type={`${showPass ? 'text' : "password"}`}
          placeholder="Password.."
          name="password"
          className="h-10 p-3 rounded-md w-full bg-white border-2"
        />
        <p onClick={() => setShowPass(!showPass)} className="absolute top-1/3 right-2 text-black">
        {showPass ? <FaEyeSlash ></FaEyeSlash> : <FaEye></FaEye>}
        </p>
        </div>
        <br />
        <div className="flex items-center gap-3">
        <input type="checkbox" name="terms" id="terms" />
        <label htmlFor="terms"><a href="#">I accept all the terms and conditions</a></label>
        </div>
        <br />
        <input
          type="submit"
          name="submit"
          className="bg-blue-600 h-10 text-xl text-white rounded-md"
          placeholder="Register"
        />
        {error && <p className="text-red-600">{error}</p>}
        {success && (
          <p className="text-blue-400  font-medium text-center">{success}</p>
        )}
        <p>Already have an account? Please <Link to='/login' className="underline mt-3 text-blue-400">Login</Link></p>
      </form>
    </div>
  );
};

export default Register;
