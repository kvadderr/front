import React, {SyntheticEvent, useState, useEffect} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/actions'
import useAuth from '../../hooks/useAuth';
import { useSearchParams } from "react-router-dom";

const Home = () => {

    const { setAuth } = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    console.log('from', from);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const searchLogin = searchParams.get("login");
    const pass = searchParams.get("pass");

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
        const response = await fetch('https://kuku12875.ru:4000/auth/signin', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'https://kuku12875.ru:4000'},
            credentials: 'include',
            body: JSON.stringify({
                login: email,
                password: password
            })
        });
        const content = await response.json();
        const roles = content.role;
        setAuth({ content, roles });
        dispatch(setUser(content));
        navigate(from, { replace: true });
    } catch (err){
        console.log(err);
    }
    }

    async function logg(searchLogin, pass) {
        try {
            const response = await fetch('https://kuku12875.ru:4000/auth/signin', {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://kuku12875.ru:4000'},
                credentials: 'include',
                body: JSON.stringify({
                    login: searchLogin,
                    password: pass
                })
            });
            const content = await response.json();
            const roles = content.role;
            setAuth({ content, roles });
            dispatch(setUser(content));
            if (from === '/'){
                navigate('/client', { replace: true });
                console.log("navigate('/client', { replace: true });")
            }
            else {
                navigate(from, { replace: true }); 
                console.log("navigate(from, { replace: true });");
            }
        } catch (err){
            console.log(err);
        }
    }

   

    useEffect(() => {
        if (searchLogin != null && pass != null){
            setEmail(searchLogin);
            setPassword(pass);

            logg(searchLogin, pass);
            
        }
    }, [])

    return (
        <form onSubmit={submit}>
            <h1 >Please {searchLogin} {pass} sign in</h1>
            <input className="form-control" placeholder="Email address" required
                   onChange={e => setEmail(e.target.value)}
            />

            <input type="password" className="form-control" placeholder="Password" required
                   onChange={e => setPassword(e.target.value)}
            />

            <button type="submit">Sign in</button>
        </form>
    )
}

export default Home;