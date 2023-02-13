import s from './UserCard.module.scss'
import { useSelector, useDispatch } from 'react-redux';

const UserCard = (props) => {
    const { user } = useSelector(state => state.userReducer);
    
   async function _sendRequestToWithdrawal() {
    try {
        const response = await fetch('https://kuku12875.ru:4000/withdrawals', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                status: 'PROCESS',
                userId: user.id
            }),
        });
    } catch (error) {
      console.error(error);
    }
    
   }

    return (
        <div className={s.sidenav}>
            <div className={s.blockUser}>
                <h4>TALK TO ME</h4>
                <img src={user.avatar} alt="Avatar" className={s.avatar}/>
                <p>Welcome back,</p>
                <p>{user.FIO}</p>
                <p>CURRENT BALANCE</p>
                <p>{user.balance}$</p>
                <p>{props.status}</p>
                <button type="button" onClick={props.iamOnline}>I'm online</button>
                <button type="button" onClick={props.iamOffline}>I'm offline</button>

                <br/><br/><br/>
                <button type="button" onClick={_sendRequestToWithdrawal}>SEND MY MONEY</button>
                <button type="button" onClick={props.logout}>EXIT</button>
            </div>
        </div>
    )
}

export default UserCard;