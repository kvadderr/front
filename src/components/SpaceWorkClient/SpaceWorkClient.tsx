import s from './SpaceWork.module.scss'
import React, {SyntheticEvent, useState, useEffect} from 'react';
import Card from "../Card/Card";
import DefaultList from '../DefaultList/DefaultList';

import { useSelector, useDispatch } from 'react-redux';

const SpaceWorkClient = (props) => {
    const { user } = useSelector(state => state.userReducer);
    const [ amount, setAmount ] = useState('');
    const [ isLoad, setIsLoad ] = useState(false);
    const [ payURL, setPayURL ] = useState('');

    const handleChange = (event) => {
        // 👇 Get input value from "event"
        setAmount(event.target.value);
      };

    async function getLink() {
        try {
            const jsonDATA = {
                amount: amount,
                user_id: user.id
            }

            console.log('jsonDATA', jsonDATA);

            const response = await fetch('http://82.202.194.12:4000/payment', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify(jsonDATA),
            });
            const json = await response.json();
            console.log(json);
            setPayURL(json.pay_url);
            setIsLoad(true);
        } catch (error) {
          console.error(error);
        }
    }

    console.log('props', props);
    return (
        <div className={s.workContainer}>
            <Card title="Finance">
                <p>Введите сумму для пополнения</p>
                <input type="number" name='amount' id='amount' className="form-control" placeholder="Amount" required
                   onChange={handleChange} />
                <button onClick={getLink}>Generate link for paymeny</button>
                {
                    isLoad ? <a href = {payURL}> Go to pay </a> : null
                }
            </Card >      
        </div>
    )
}

export default SpaceWorkClient;