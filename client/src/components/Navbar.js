import { useAuthContext } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import { logout } from "../api/auth";
import DropdownList from "./Shared/Dropdown";
import Dropdown from 'react-bootstrap/Dropdown';
import { useShoppingCartContext } from '../context/ShoppingCartContext'
import CartItems from "./CartItems/CartItems";

export default function Navbar() {
  const { authUser } = useAuthContext()
  const { cartItems } = useShoppingCartContext()

  const handleLogout = () => {
    logout().then(() => {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <div className="row">
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div className="container px-4 px-lg-5">
          <a className="navbar-brand text-danger" href="/">
            <h3><strong>PC Mag</strong></h3>
          </a>

          <div className="d-flex gap-2">
            <Dropdown>
              <Dropdown.Toggle variant="default" className="btn btn-outline-dark" type="button">
                <i className="bi-cart-fill me-1"></i>
                <span className="badge bg-dark text-white ms-2 rounded-pill">
                  {cartItems.length}
                </span>
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ width: '800px' }}>
                <CartItems />
              </Dropdown.Menu>
            </Dropdown>

            {authUser ? <DropdownList
              btnName={authUser ? <FaUserCircle style={{ fontSize: '25px' }} /> : null}
              linkList={[{ name: authUser?.name, href: '/admin/profile' }, { name: 'Dashboard', href: '/admin' }]}
              dividerItems={[{ name: <button onClick={handleLogout} className="btn btn-danger w-100">Logout</button> }]}
            /> : null}
          </div>
        </div>
      </nav>
    </div>
  );
}
