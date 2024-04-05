import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Navbar({ openCloseSidebar, expandedSidebar, canExpandSidebar }) {
    const navigate = useNavigate();

    const logoutUser = async () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_name');
        navigate('/login');
    };

    const [userName, setUserName] = useState('User');

    useEffect(() => {
        setUserName(localStorage.getItem('user_name') || userName);
    }, []);
    return (
        <nav className="navbar">
            {
                canExpandSidebar &&
                <div className="close-open-sidebar" style={{ left: expandedSidebar ? '270px' : '80px' }}>
                    <button className="btn-close-open-sidebar" onClick={openCloseSidebar}>
                        <svg style={{ opacity: expandedSidebar ? '1' : '0' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-text-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
                        </svg>
                        <svg style={{ opacity: expandedSidebar ? '0' : '1' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                        </svg>
                    </button>
                </div>
            }

            <section className="user-info">
                <div className="img-name">
                    <img className="rounded-circle" src={`https://ui-avatars.com/api/?name=${userName}&size=100`} alt="img-user" />
                </div>

                <p className="name d-none d-md-block">
                    <strong>{userName}</strong> <br />
                    {userName === 'admin' ? 'Administrador' : userName}
                </p>

                <div className="user-info-target">
                    <p className="title">Hola {userName}!</p>
                    <div className="options">
                        <div className="option" onClick={logoutUser}>
                            <i className="fa-solid fa-power-off"></i> <span>Salir</span>
                        </div>
                    </div>
                </div>
            </section>
        </nav>
    );
}