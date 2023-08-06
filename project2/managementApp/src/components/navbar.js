import React from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { useNavigate } from 'react-router-dom';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

function Navbar() {
    const navigate = useNavigate();

  return (
      <div className="sidenav">
          <SideNav
    onSelect={(selected) => {
        // Add your code here
        if(selected==='signin'){
            localStorage.setItem("login",'false')
            localStorage.setItem("hr",'false')
        }

        navigate('/'+selected)
    }}
>
    <SideNav.Toggle />
    <SideNav.Nav defaultSelected="/">

        {localStorage.getItem("hr")==='false' && <NavItem eventKey="employee/profile">
            <NavIcon>
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
                Personal Information
            </NavText>
        </NavItem> }



        {localStorage.getItem("hr")==='false' && <NavItem eventKey="employee/visaStatus">
        <NavIcon>
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
                visa status management
            </NavText>
        </NavItem> }


        {localStorage.getItem("hr")==='true' && <NavItem eventKey="hr/employeeList">
        <NavIcon>
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
                Employee Profile
            </NavText>
        </NavItem> }


        {localStorage.getItem("hr")==='true' && <NavItem eventKey="hr/visaStatus">
        <NavIcon>
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
                visa status management
            </NavText>
        </NavItem> }

        {localStorage.getItem("hr")==='true' && <NavItem eventKey="hr/hiring">
        <NavIcon>
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
                Hiring management
            </NavText>
        </NavItem> }





        <NavItem eventKey="signin">
            <NavIcon>
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
            </NavIcon>

            <NavText>
                logout
            </NavText>
        </NavItem>

    </SideNav.Nav>
</SideNav>
      </div>
  )
}

export default Navbar