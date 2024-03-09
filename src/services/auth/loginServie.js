import { makeApiRequest } from "../auxiliar"

export const loginAPI = ({ credentials, funcSuccess = () => { }, funcError = () => { }, showNotify = false }) => {
    makeApiRequest({
        url: '/login',
        method: 'post',
        funcSuccess,
        funcError,
        requestData: credentials,
        showNotify,
        msgSuccess: 'Logeado correctamente',
        msgError: 'Las credenciales no coinciden'
    });
} 