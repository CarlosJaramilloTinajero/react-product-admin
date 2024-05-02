import { useCallback, useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";

export function MasterLayout({ children }) {
    const [expandedSidebar, setExpandedSidebar] = useState(true);
    const openCloseSidebar = () => setExpandedSidebar(!expandedSidebar);
    const [canExpandSidebar, setCanExpandSidebar] = useState(true);

    // Verificar si el tamaño de la ventana es menor a 700px para mostrar o no el sidebar despegable
    const handleResize = useCallback(() => {
        let widthWindow = window.innerWidth;
        if (widthWindow <= 700) {
            setCanExpandSidebar(false);
            setExpandedSidebar(false);
        } else {
            setCanExpandSidebar(true);
        }
    }, []);

    useEffect(() => {
        // Agregar el event listener cuando se monta el componente
        window.addEventListener('resize', handleResize);

        handleResize();

        // Eliminar el event listener cuando el componente se desmonta
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <Sidebar expandedSidebar={expandedSidebar} />
            <Navbar openCloseSidebar={openCloseSidebar} canExpandSidebar={canExpandSidebar} expandedSidebar={expandedSidebar} />
            <section style={{ marginLeft: expandedSidebar ? '265px' : '80px' }} className="cotainer-master">
                {children}
            </section>
            <Footer expandedSidebar={expandedSidebar} />
        </>
    );
}