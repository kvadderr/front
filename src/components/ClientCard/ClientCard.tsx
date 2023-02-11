import s from './ClientCard.module.scss'
import { useSelector, useDispatch } from 'react-redux';

const ClientCard = (props) => {
    const { user } = useSelector(state => state.userReducer);
 
    return (
        <div className={s.sidenav}>
            <div className={s.blockUser}>
                <h4>TALK TO ME</h4>
                <img src={user.avatar} alt="Avatar" className={s.avatar}/>
                <p>Welcome back,</p>
                <p>{user.FIO}</p>
                <p>CURRENT BALANCE</p>
                <p>{user.balance}$</p>
                <button type="button" onClick={props.logout}>EXIT</button>
            </div>
        </div>
    )
}

export default ClientCard;