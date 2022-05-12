const Card = ({prompt}) => {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{prompt}</h5>
                <p className="card-text">
                    {prompt.text}
                </p>
            </div>
        </div>
    );
}

export default Card;