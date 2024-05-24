'use client';
import { ToastContext } from '@/src/Libs/Context/Toast';
import { useContext } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import style from './index.module.scss';

interface ToastWrapperProps {
    position?:
        | 'top-start'
        | 'top-center'
        | 'top-end'
        | 'middle-start'
        | 'middle-center'
        | 'middle-end'
        | 'bottom-start'
        | 'bottom-center'
        | 'bottom-end';
    delay?: number;
}

export const ToastWrapper = (props: ToastWrapperProps) => {
    const { position = 'top-center', delay = 3000 } = props;

    const { toast, setToast } = useContext(ToastContext);
    const handleOnClose = () => {
        setToast({});
    };
    return (
        <ToastContainer position={position} className={style?.toastContainer}>
            <Toast
                className="d-flex"
                onClose={handleOnClose}
                show={!!toast?.label}
                delay={delay}
                animation
                autohide={true}
            >
                <div className="d-flex w-100">
                    <div className={`${style.toastBody} d-flex`}>
                        <p>{toast?.label}</p>
                    </div>
                </div>
            </Toast>
        </ToastContainer>
    );
};
