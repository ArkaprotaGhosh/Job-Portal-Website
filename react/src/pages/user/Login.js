import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UseAutheContext } from "../../hooks/UseAutheContext";
import "./header/Home.css"

const Login = () => {

  const navigate = useNavigate()

  const [errMsg, setErrMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [message, setMessage] = useState('');

  const { dispatch } = UseAutheContext();


  const login = async (email, password) => {
    // login url
    const LOGIN_URL = `http://localhost:5008/api/user/login`;

    console.log(`login function called`);

    setIsLoading(true);
    setErrMsg(null);







    try {
      const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      // Check response status
      if (!response.ok && (response.status === 400 || response.status === 404 || response.status === 401 || data.status === 200)) {
        setIsLoading(false);
        console.log(data.error)
        setErrMsg(data.error);
        return;
      }
      if (data.status === 202) {

        // Save user to localStorage
        localStorage.setItem('user', JSON.stringify(data));

        // Update the auth context
        dispatch({ type: 'LOGIN', payload: data });
        navigate('/jobs')
        setIsLoading(false);

      }
      else {
        setMessage(data.message || 'Login failed. Please try again.');
      }

    } catch (err) {
      setErrMsg('No Server Response. Try again later.');
    }
  };




  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [email, password]);

  async function handleSubmit(e) {
    e.preventDefault();
    await login(email, password);
  }




  return (
    <>
      <div>
        <div className="diva">
          <p className="para1">Keep Applying!!</p>
          <p className="para2">200% HIKE IN SALARY</p>
          <p className="para3">
            Your dream job is closer than you think. We focus on your career aspirations, matching your unique skills and goals with the best opportunities available. Our personalized approach ensures you find the perfect fit. Start your journey to success with us today and unlock your full potential!
          </p>
        </div>

        {/* <div className="divb">
          <p className="para4">SIGN IN</p>
          <form>
            <div className="form-group">
              <input type="text" name="user_id" placeholder="User ID" />
              <br />
            </div>
            <div className="form-group">
              <input type="password" name="password" placeholder="Password" />
            </div>
            <div className="form-checkbox">
              <input type="checkbox" name="keep_me_logged_in" id="checkbox" />
              <label htmlFor="checkbox">Keep me logged in</label>
            </div>
            <button className="btn" type="submit">LOGIN</button>
          </form>
        </div> */}


        <div className="login-form-container">
          <h2>User Login</h2>
          {message && <div className="message">{message}</div>}
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
          <form onSubmit={handleSubmit} className="login-form">
            {/* //-------email-------\\ */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              ref={emailRef}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* //---------password---------\\ */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="button-btn" type="submit">Login</button>
            <Link style={{ color: "#67b311" }} to="/signup"><strong>Create Account</strong></Link>
          </form>
        </div>
      </div>
    </>

  )
}

export default Login