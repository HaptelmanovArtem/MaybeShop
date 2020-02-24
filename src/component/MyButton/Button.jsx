import React from 'react';
import PropsType from 'prop-types';
import './Button.css';

const Button = ({type,className, id, value, onClick}) => {
    return(
        <button type={type} className={"button- " + className} id={id} onClick={onClick}>
            {value}
        </button>
    )
}

Button.propTypes = {
    type: PropsType.string,
    className: PropsType.string,
    id: PropsType.string,
    onClick: PropsType.func,
    value: PropsType.node
}

Button.defaultProps = {
    type: "button",
    className: "",
    id: "",
    onClick: ()=>{},
    value: null
}

export default Button;