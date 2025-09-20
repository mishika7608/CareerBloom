import {useState, createContext, useContext} from 'react'
import {Outlet} from 'react-router-dom';
import Wrapper from '../assets/wrappers/Dashboard';
import { BigSideBar, SmallSideBar, NavBar } from '../components';


const DashboardContext = createContext();

const DashboardLayout = () => {
  // temp
  const user = {name:'john'};
  const [showSideBar, setShowSideBar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleDarkTheme = () => {
    console.log('toggle dark theme');
    setIsDarkTheme(!isDarkTheme);
  }

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  }

  const logoutUser = async() => {
    console.log('logout user');
  };

  return (
    <DashboardContext.Provider 
    value={{
      user, 
      showSideBar,
      isDarkTheme,
      toggleDarkTheme,
      toggleSideBar,
      logoutUser,
      }}
      >
      <Wrapper>
        <main className="dashboard">
          <SmallSideBar />
          <BigSideBar />
          <div className='dashboard-content'>
            <div><NavBar /></div>
            <div className="dashboard-page">
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  )
}

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;