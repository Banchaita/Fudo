import Hearder from "./Header"
import Footer from "./Footer"

const Layout = ({children}) =>{
    return(
        <>
            <Hearder/>
            {children}
            <Footer/>
        </>
    )
}

export default Layout