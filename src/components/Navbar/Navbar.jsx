import React from 'react'


//internal Imports
import logo from "../../assets/tacnique-logo.svg"
import Style from "./Navbar.module.css"

const Navbar = () => {
  return (
    <nav className={Style.navbar}>
        <div className={Style.logo}>
            <img src={logo} alt="" />
        </div>
        <div className={Style.titleDashboard}>
            <h1>Dashboard</h1>
        </div>
    </nav>
  )
}

export default Navbar