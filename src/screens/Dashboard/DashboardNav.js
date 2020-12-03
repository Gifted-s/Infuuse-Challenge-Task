import React, { useContext } from 'react'
import { withRouter } from 'react-router-dom'
import {
  UserOutlined,
} from '@ant-design/icons';
import { AppContextProvider } from '../../context/AppContext/AppContext';

function DashboardNav({ location, history }) {

  const { user } = useContext(AppContextProvider)
 
  return (
    <div className="container-fluid">
      <div style={{ borderBottom: '1px solid rgba(0,0,0,0.09)' }} className={window.screen.width <= 768 ? 'row nn justify-content-between d-flex' : 'row py-4  justify-content-between d-flex'}>
        
        <span style={{cursor: 'pointer', marginRight: window.screen.width <= 768 ? 50 : 0 }}>
        
          <span className="user_"  style={{ borderRadius: '50%', padding: '3px 6px 6px 6px', border: '1px solid rgba(0,0,0,0.2)' }}><UserOutlined /></span> {user.username}
        </span>
      </div>
    </div>

  )
}

export default withRouter(DashboardNav)
