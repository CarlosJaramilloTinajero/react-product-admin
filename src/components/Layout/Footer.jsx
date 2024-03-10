export function Footer({ expandedSidebar }) {

    return (
        <footer>
            <section className="footer-container" style={{ marginLeft: expandedSidebar ? '265px' : '55px' }}>
                <p className="title-footer">Sitio desarrollado por <span>Carlos Daniel Jaramillo Tinajero</span> (Sitio demostrativo)</p>

                <div className="tecnlogies-container">
                    <div className="tecnlogies">
                        <p className="title">Lenguajes</p>
                        <p className="tecnology">JavaScript</p>
                        <p className="tecnology">HTML</p>
                        <p className="tecnology">CSS</p>
                        <p className="tecnology">PHP</p>
                        <p className="tecnology">SQL</p>
                    </div>
                    <div className="tecnlogies">
                        <p className="title">Frameworks</p>
                        <p className="tecnology">React</p>
                        <p className="tecnology">Laravel</p>
                        <p className="tecnology">BootStrap</p>
                    </div>
                    <div className="tecnlogies">
                        <p className="title">Libs/Hooks</p>
                        <p className="tecnology">Axios</p>
                        <p className="tecnology">Toastify</p>
                        <p className="tecnology">Sanctum</p>
                        <p className="tecnology">useState</p>
                        <p className="tecnology">useEffect</p>
                        <p className="tecnology">Custom Hooks</p>
                        <p className="tecnology">React router DOM</p>
                    </div>
                </div>
            </section>
        </footer>
    )
}