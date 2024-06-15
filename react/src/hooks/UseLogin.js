import { useState } from "react";
import { UseAutheContext } from "./UseAutheContext";
import { useNavigate } from "react-router-dom";

export const UseLogin = () => {
    const [errMsg, setErrMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const navigate = useNavigate()

    
  const [message, setMessage] = useState('');

    const { dispatch } = UseAutheContext();

    const login = async (email, password) => {

        // login url
        const LOGIN_URL = `http://localhost:5008/api/adminsignup/login`;

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
            if (!response.ok && (response.status === 400 || response.status === 404 || response.status === 401)) {
                setIsLoading(false);
                console.log(data.error)
                setErrMsg(data.error);
                return;
            }
            if (data.status === 202) {
                // Save user to localStorage
                localStorage.setItem('user', JSON.stringify(data));
                navigate('/getjobadmin')
                // Update the auth context
                dispatch({ type: 'LOGIN', payload: data });
                setIsLoading(false);
            }else {
                setMessage(data.message || 'Login failed. Please try again.');
              }


        } catch (err) {
            setErrMsg('No Server Response. Try again later.');
        }
    };

    return { login, isLoading, errMsg,message, setErrMsg }

};