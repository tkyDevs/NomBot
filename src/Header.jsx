import logo from './assets/chef.png'
import './assets/Header.css'

function Header() {
    return (
        <div className='headerDiv'>
            <img src={logo} alt="Chef's hat logo" />
            
            <p>NomBot</p>
        </div>
    )
}

export default Header;