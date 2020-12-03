import React from 'react'
import Sider from './Menu';
import DashboardNav from './DashboardNav';
export default function Dashboard(props) {
  return (
    <div className="container-fluid dashboard ">
      <DashboardNav />
      <div className="row d_b">
        <div>
          <Sider/>
        </div>
        < div className="offset-md-0 mb col-md-9 dashboard_right">
          {props.children}
        </div>
      </div>
    </div>
  )
}
