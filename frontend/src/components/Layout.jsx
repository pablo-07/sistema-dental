import { Sidebar } from 'react-pro-sidebar'
import Navba from './navbar'
import Dashboard from '../pages/dashboard'
import Sidebars from './Sidebar/Sidebar'

const Layout = ({ children }) => {
  return (
    <div>
      <Sidebars />
      <div className='wrapper d-flex flex-columntainer' >
      <div className="body flex-grow-1 px-3">
        <Dashboard/>
      </div>
      </div>
    </div>
  )
}

export default Layout