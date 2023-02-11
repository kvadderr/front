import s from './List.module.scss'


const DefaultList = (props) => {
    return (
        <div className={s.workContainer}>
            <img src={props.avatar} alt="Avatar" className={s.avatar} />
            <div>
                <p>{props.title}</p>
                <p>{props.detail}</p>
            </div>
        </div>
    )
}

export default DefaultList;