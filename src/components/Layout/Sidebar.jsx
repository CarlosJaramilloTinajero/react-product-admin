import menuLinks from '../../config/menuLinks.json';

export function Sidebar({ expandedSidebar }) {
    return (
        <div style={{ left: expandedSidebar ? '0' : '-185px' }} className="sidebar" >
            <section className={`sidebar-header ${!expandedSidebar ? 'contracted' : ''}`}>
                <img src="https://carlosjaramillo.beauty/portafolio/assets/logo-mervins.webp" alt="" />
            </section>
            <section className={`menu-container d-flex ${!expandedSidebar ? 'justify-content-end p-2' : ''}`}>
                <div className={`menu-container-expand ${expandedSidebar ? 'show' : 'hidden left'}`}>
                    <p className="title-menu">Menu</p>
                    <ul className="menu-links">
                        {
                            menuLinks.length > 0 &&
                            menuLinks.map((value, index) => (
                                <li key={index} className="menu-link">
                                    <i className={value.icon}></i>
                                    <p>{value.name}</p>
                                </li>
                            ))
                        }
                    </ul>
                </div>

                <div className={`menu-container-contracted menu-container-expand ${expandedSidebar ? 'hidden left' : 'show'}`}>
                    <ul className="menu-links">
                        {
                            menuLinks.length > 0 &&
                            menuLinks.map((value, index) => (
                                <li key={index} className="menu-link">
                                    <i className={value.icon} />
                                    <p className='menu-link-name-overflow'>{value.name}</p>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </section>
        </div >
    )
}