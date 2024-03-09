import { useState } from 'react';
import { loginAPI } from '../../services/auth/loginServie';
import { redirect, useNavigate } from 'react-router-dom';

export function LoginView() {

    const navigate = useNavigate();

    const [formData, setFormdata] = useState({
        name: 'admin',
        password: 'contraseña'
    });

    const handleChange = e => {
        if (!e.target.name) return;

        setFormdata({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        loginAPI({
            credentials: formData,
            funcSuccess: response => {
                const { data } = response;
                localStorage.setItem('token', `${data.token_type} ${data.access_token}`);
                localStorage.setItem('user_name', data.user_name)
                navigate('/');
            },
            showNotify: true
        })
    }

    return (
        <div className="container-form">
            <p className="title">Login</p>
            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-4">
                    <input required type="text" name='name' onChange={handleChange} className="form-control" defaultValue={formData.name} placeholder="Nombre" id="floatingTextareaName" />
                    <label htmlFor="floatingTextareaName">Nombre</label>
                </div>

                <div className="form-floating mb-4">
                    <input required type="password" name='password' onChange={handleChange} defaultValue={formData.password} className="form-control" placeholder="Contraseña"
                        id="floatingTextareaPassword" />
                    <label htmlFor="floatingTextareaPassword">Contraseña</label>
                </div>

                <div className="mt-3 d-flex justify-content-center">
                    <div className="d-block">
                        <div className="d-flex justify-content-center mb-4">
                            <button type="submit" className="btn btn-primary btn-sm"><span>Ingresar</span></button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}