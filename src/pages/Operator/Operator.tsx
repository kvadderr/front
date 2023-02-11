import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { useNavigate, Link } from "react-router-dom";
import UserCard from '../../components/UserCard/UserCard'
import SpaceWork from '../../components/SpaceWork/SpaceWork'
import AuthContext from "../../context/AuthProvider";
import s from './Operator.module.scss';
import {startBasicCall, join, leave} from '../../helpers/Agora';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/actions'

const getPadTime = (time) => time.toString().padStart(2, '0');

const socket = io.connect("http://82.202.194.12/:4000/");
const Operator = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [calling, setCalling] = useState(false);
    const [callData, setCallData] = useState({});
    const { user } = useSelector(state => state.userReducer);
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [timeLeft, setTimeLeft] = useState(0);    
    const minutes = getPadTime(Math.floor(timeLeft/60));
    const seconds = getPadTime(timeLeft - minutes *60); 
    const [status, setStatus] = useState('Offline');

    const [review, setReview] = useState([]);
    const [callHistory, setCallHistory] = useState([]);
    const [statistic, setStatistic] = useState({});

    const logout = async () => {
        setAuth({});
        leave();
        socket.disconnect();
        navigate('/');
    }

    let options = {
        appId: 'ddafd74f4177415b9a7201aa56ecc12f',
        channel: callData.channelName,
        token: callData.token,
        uid: 0,
    }

    useEffect(() => {
        getReviews();
        getCall();
        getStat();
        socket.emit('join', {"userId": user.id});
        startBasicCall();

        socket.on("updateBalance", function (data) {
            const new_user = user;
            console.log('WINWINWI', data)
            new_user.balance = data;
            console.log('new_user', new_user);
            dispatch(setUser(new_user));
        });
        //When opponent leave
        socket.on("leaveChannel", function(data) {
            setStatus('Online');
            leave();    
            setCalling(false);
        });

        socket.on("timerUpdate", function(data) {
            setTimeLeft(data.timer);
        });

        socket.on("connectionClose", function() {
            setStatus('Online');
            leave();    
            setCalling(false);
        })

        socket.on("connectionRequest", function(data) {
            console.log('datadata', data);
            const someData = {
                FIO: data.clientFIO,
                channelName: data.channelName,
                token: data.token,
                user: {
                    avatar: data.clientAvatar,
                    id: data.clientId,
                },
                operatorId: data.operatorId,
                clientId: data.clientId
            }
            
            setCallData(someData);
            setCalling(true);
        });
    }, [])

    function goToCall() {
        setStatus('Busy');
        socket.emit('connectionConfirmation', callData);
        join(options);
    }

    
    async function getReviews() {
        try {
            const response = await fetch('http://82.202.194.12:4000/review/'+user.id);
            const json = await response.json();
            setReview(json);
            console.log('review', review);
        } catch (error) {
          console.error(error);
        }
    }

    async function getCall() {
        try {
            const response = await fetch('http://82.202.194.12:4000/call/operator/'+user.id);
            const json = await response.json();
            setCallHistory(json);
            console.log('review', review);
        } catch (error) {
          console.error(error);
        }
    }

    async function getStat() {
        try {
            const response = await fetch('http://82.202.194.12:4000/analytics/operatorStat/'+user.id);
            const json = await response.json();
            setStatistic(json);
        } catch (error) {
          console.error(error);
        }
    }

    function goToOFF() {
        
        const data = {
            opponentId: callData.clientId,
            clientId: callData.clientId,
            operatorId: user.id,
            duration: timeLeft
        }
        socket.emit('connectionClose', data);
        setStatus('Online');
        leave();    
        setCalling(false);
    }    

    function iamOnline() {
        setStatus('Online');
        socket.emit('onlineStatus', user.id)
    }

    function iamOffline() {        
        setStatus('Offline');
        socket.emit('offlineStatus', user.id)
    }

    return (
        <>
        <div className={s.header}/>
        <div className={s.container}>
            <UserCard status={status} iamOffline={iamOffline} iamOnline={iamOnline} logout={logout}/>
            <SpaceWork statistic={statistic} callData={callData} calling={calling} setCalling={goToOFF} confirmCall={goToCall} minutes={minutes} seconds={seconds} review={review} callHistory={callHistory}/>
        </div>
        </>
    )
}

export default Operator;