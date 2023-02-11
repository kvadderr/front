import s from './Card.module.scss'

const Card = (props) => {
    return (
        <div className={s.card}>
            <p>{props.title}</p>
            {props.children}
        </div>
    )
}

export default Card;