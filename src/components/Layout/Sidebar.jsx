import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import menuLinks from '../../config/menuLinks.json';

export function Sidebar({ expandedSidebar }) {

    const [selectDropMenu, setSelectDropMenu] = useState('');

    const handleClickSelectDrop = select => setSelectDropMenu(select === selectDropMenu ? '' : select);

    useEffect(() => {
        setSelectDropMenu('');
    }, [expandedSidebar]);

    return (
        <div style={{ left: expandedSidebar ? '0' : '-185px' }} className="sidebar" >
            <section className={`sidebar-header ${!expandedSidebar ? 'contracted' : ''}`}>
                <Link to="/">
                    {/* <img src="https://carlosjaramillo.beauty/portafolio/assets/logo-mervins.webp" alt="" /> */}
                    {/* <img src='./img/logo-1.png' alt="logo products hub" /> */}
                    <p>PRODUCTS HUB</p>
                </Link>
            </section>
            <section className={`menu-container ${!expandedSidebar ? 'd-flex justify-content-end p-2' : ''}`}>
                <div className={`menu-container-expand ${expandedSidebar ? 'show' : 'hidden left'}`}>
                    <p className="title-menu">Menu</p>
                    <ul className="menu-links">
                        {
                            menuLinks.length > 0 &&
                            menuLinks.filter(value => !value.childrens).map((value, index) => (
                                <Link key={index} to={`../${value.link}`} >
                                    <li className="menu-link">
                                        <i className={value.icon}></i>
                                        <p>{value.name}</p>
                                    </li>
                                </Link>
                            ))
                        }
                        {
                            menuLinks.length > 0 &&
                            menuLinks.filter(value => value.childrens).map((value, index) => (
                                <li key={index} className='menu-link menu-link-drop' onClick={() => handleClickSelectDrop(value.name)}>
                                    <div className="toggle">
                                        <i className={value.icon}></i>
                                        <p>{value.name}</p>
                                        <i className={`fa-solid fa-angle-up icon-drop ${selectDropMenu === value.name ? 'opacity-80' : 'opacity-0'}`}></i>
                                        <i className={`fa-solid fa-angle-down icon-drop ${selectDropMenu !== value.name ? 'opacity-80' : 'opacity-0'}`}></i>
                                    </div>
                                    <ul className={`dropdown-menu-content-sidebar ${selectDropMenu === value.name ? 'show' : 'hidden'}`}>
                                        {
                                            value.childrens.length > 0 &&
                                            value.childrens.map((children, index) => (
                                                <li key={index}><Link to={`../${children.link}`}>{children.name}</Link></li>
                                            ))
                                        }
                                    </ul>
                                </li>
                            ))
                        }
                    </ul>
                </div>

                <div className={`menu-container-contracted menu-container-expand ${expandedSidebar ? 'hidden left' : 'show'}`}>
                    <ul className="menu-links">
                        {
                            menuLinks.length > 0 &&
                            menuLinks.filter(value => !value.childrens).map((value, index) => (
                                <li key={index} className="menu-link">
                                    <Link to={`../${value.link}`}>
                                        <i className={value.icon} />
                                    </Link>
                                    <p className='menu-link-name-overflow'>{value.name}</p>
                                </li>
                            ))
                        }
                        {
                            menuLinks.length > 0 &&
                            menuLinks.filter(value => value.childrens).map((value, index) => (
                                <li key={index} className='menu-link menu-link-drop' onClick={() => handleClickSelectDrop(value.name)}>
                                    <div className="toggle">
                                        <i className={value.icon}></i>
                                    </div>
                                    <div className="menu-link-drop-overflow">
                                        <p>{value.name}</p>
                                        <ul className={`dropdown-menu-content-sidebar show`}>
                                            {
                                                value.childrens.length > 0 &&
                                                value.childrens.map((children, index) => (
                                                    <li key={index}><Link to={`../${children.link}`}>{children.name}</Link></li>
                                                ))
                                            }
                                        </ul>
                                    </div>

                                </li>
                            ))
                        }
                    </ul>
                </div>
            </section>
        </div >
    )
}