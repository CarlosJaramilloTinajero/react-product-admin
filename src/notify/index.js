import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notify = ({ msg = '', type = 'default' }) => {
    switch (type) {
        case 'success':
            return toast.success(msg)
        case 'error':
            return toast.error(msg);
        case 'info':
            return toast.info(msg);
        case 'loading':
            return toast.loading(msg);
        case 'default':
            return toast(msg)
        default:
    }
};

export const updateNotify = ({ id, type = 'default', msg = '' }) => {
    toast.dismiss(id);
    toast[type](msg, {
        autoClose: 3000
    });
};