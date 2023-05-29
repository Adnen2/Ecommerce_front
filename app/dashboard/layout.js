'use client';
import SideNavbar from "../../components/SideNavbar";
import { SessionProvider } from "next-auth/react";
function DasboardLayout({ children }) {
    return (
        <div className="row">
            <SessionProvider>
            <div className="col-md-3 ml-5">
            
                <SideNavbar />
            
            </div>
            <div className="col-md-9">
                <div className="pt-4">{children}</div>
            </div>
            </SessionProvider>
        </div>
    );
}
export default DasboardLayout; 
