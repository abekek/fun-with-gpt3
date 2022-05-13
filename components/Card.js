import styles from '../styles/Home.module.css';

const Card = ({prompt, answer}) => {
    return (
        <div className={styles.card}>
            <h2>{prompt}</h2>
            <p>{answer}</p>
        </div>
    );
}

export default Card;