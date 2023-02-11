import React, { useState, useEffect, useContext } from 'react';
import ClientCard from '../../components/ClientCard/ClientCard'
import SpaceWorkClient from '../../components/SpaceWorkClient/SpaceWorkClient'
import AuthContext from "../../context/AuthProvider";
import s from './Client.module.scss';

const Client = () => {
    const { setAuth } = useContext(AuthContext);

    const logout = async () => {
        setAuth({});
        navigate('/client');
    }

        return (
            <>
            <div className={s.header}/>
            <div className={s.container}>
                <ClientCard logout={logout}/>
                <SpaceWorkClient />
            </div>
            </>
        )
    
}

export default Client;