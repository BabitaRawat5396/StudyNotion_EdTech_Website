const HighlightText = (props) => {
    const {text,color} = props;

    return (
        <span className={`${color}`}>
            {text}
        </span>
    )
}

export default HighlightText;