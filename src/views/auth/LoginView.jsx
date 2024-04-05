import { useState } from 'react';
import { loginAPI } from '../../services/auth/loginServie';
import { redirect, useNavigate } from 'react-router-dom';
import { URLBase } from '../../constants';

export function LoginView() {

    const navigate = useNavigate();

    const [formData, setFormdata] = useState({
        // admin
        name: 'visitante',
        // adminContraseña
        password: 'visitante1234'
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
            funcSuccess: data => {
                localStorage.setItem('token', `${data.data.token_type} ${data.data.access_token}`);
                localStorage.setItem('user_name', data.data.user_name)
                navigate('/');
            },
            // showNotify: true
        })
    }

    return (
        <>
            <div className="login-back"></div>
            <div className="container-form login">
                <section className="logo-img">
                    <img src={`${URLBase}/icon.svg`} alt="" />
                </section>
                {/* <p className="title">Login</p> */}
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

                    <div className="mt-3 mb-4 w-100">
                        <button type="submit" className="btn btn-primary btn-sm"><span>Ingresar</span></button>
                    </div>
                </form>
            </div>
        </>
    );
}