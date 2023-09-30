import {
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithCredential,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useRef, useState } from "react";
import auth from "../../Firebase/firebase.config";
import { Link } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const emailRef = useRef(null);

  const handleLogIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    //? Clear the success the error
    setError(""); 
    setSuccess("");

    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
      //? Check if the email is verified.
      if(res.user.emailVerified) {
        setSuccess("Successfully logged In.")
        console.log(res.user);
      }
      else{
       
        sendEmailVerification(auth.currentUser)
        .then(() => {
          alert("Please verify your email address.");
        })
      }
    }
      )
      .catch((error) => setError("Please give valid info."));
  };

  //? Handle forget password .
  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    if(!email) {
      setError('Please provide an email.')
      return;
    }
    else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
      setError('Please provide an valid email.')
      return;
    }
    //? if the email is valid then send password reset email.
    sendPasswordResetEmail(auth, email)
    .then(() => alert("Please check your email"))
    .catch(error => setError(error.message));
  }

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <form onSubmit={handleLogIn}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    name="email"
                    ref={emailRef}
                    className="input input-bordered"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    name="password"
                    className="input input-bordered"
                  />
                  <label className="label">
                    <a onClick={handleForgetPassword} className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-primary">
                    Log In
                  </button>
                </div>
                {error && <p className="text-red-400">{error}</p>}
                {success && (
                  <p className="text-blue-600 font-medium">{success}</p>
                )}
                <p>New to this website? Please <Link to='/register' className="underline mt-3 text-blue-400">Register</Link></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
