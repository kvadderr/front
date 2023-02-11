import s from './SpaceWork.module.scss'

import Card from "../Card/Card";
import DefaultList from '../DefaultList/DefaultList';

import { useSelector, useDispatch } from 'react-redux';

const SpaceWork = (props) => {
    const { user } = useSelector(state => state.userReducer);
    
    return (
        <div className={s.workContainer}>
            {
            props.calling ?
            <Card title="Current calling">
                <p>{props.callData?.FIO}</p>
                <img src={props.callData?.user?.avatar} alt="Avatar" className={s.avatar}/>
                <p>{props.minutes}:{props.seconds}</p>
                <button type="button" onClick={props.confirmCall}>APPLY</button>
                <button type="button" onClick={props.setCalling}>Leave</button>
            </Card>
            :
            null
            }
            <Card title="Last reviews">
            {
                props.review.map( item => {
                    return <DefaultList avatar={item.client.avatar} title={item.client.FIO} detail={item.review} key={item.id}/>
                })
            }
            </Card>
            <Card title="Statistics">
                <p>Средняя оценка - {props.statistic.avgRaitConst}</p>
                <p>Звонков за месяц - {props.statistic.callForMonthConst}</p>
                <p>Звонков за неделю - {props.statistic.callForWeekConst}</p>
                <p>Звонков за день - {props.statistic.callForTodayCount}</p>
                <p>В избранном у  - {props.statistic.favoriteCountConst}</p>
                <p>Всего заработано - {props.statistic.moneyConst}</p>
            </Card>
            <Card title="Finance story"/>        
            <Card title="Call history">
            {
                props.callHistory.map( item => {
                    return <DefaultList avatar={item.client.avatar} title={item.client.FIO} detail={item.duration} key={item.id}/>
                })
            }
            </Card>
        </div>
    )
}

export default SpaceWork;