import React from 'react';
import Portal from '../Portal/Portal';
import PropsType from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './Modal.css';
import Button from '../MyButton/Button.jsx';

const Modal = ({title, isOpen, onSubmit, onCancel, children} ) => {
    return(
        <>
        {isOpen &&
                <Portal>
                    <div className="modalOverlay">
                        <div className="modalWindow">
                            <div className="modalHeader">
                                <div className="modalHeaderTitle">
                                    {title}
                                </div>
                                <FontAwesomeIcon icon={faTimes} onClick={onCancel} className="Icon"/>
                            </div>
                            <div className="modalBody">
                                {children}
                            </div>
                            <div className="modalFooter">
                                <Button onClick={onCancel} value="Cancle"/>
                                <Button onClick={onSubmit} value="Submit"/>
                            </div>     
                        </div> 
                    </div>
                </Portal>
        }
        </>
    )
}

Modal.PropsType = {
    title: PropsType.string,
    isOpen: PropsType.bool,
    onSubmit: PropsType.func,
    onCancel: PropsType.func
}

Modal.DefaultType = {
    title: "Modal title",
    isOpen: false,
    onSubmit: ()=>{},
    onCancel: ()=>{}
}

export default Modal;