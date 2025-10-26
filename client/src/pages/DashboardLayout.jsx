import {useState, createContext, useContext } from 'react'
import {Outlet, redirect, useLoaderData, useNavigate} from 'react-router-dom';
import Wrapper from '../assets/wrappers/Dashboard';
import { BigSideBar, SmallSideBar, NavBar  } from '../components';
import { checkDefaultTheme } from '../App';
import customFetch from '../utils/customFetch';

export const loader = async() => {
  try{
    const {data} = await customFetch.get('/v1/users/current-user')
    return data;
  }
  catch(error){
    // console.log(error);
    return redirect('/');
    // return error;
  }
}

const DashboardContext = createContext();

const DashboardLayout = ({ isDarkThemeEnabled }) => {
  const {user} = useLoaderData();
  const navigate = useNavigate();
  // console.log(data);
  // temp
  // const user = {name:'john'};
  
  const [showSideBar, setShowSideBar] = useState(false);
  // const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());
  const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled);

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle('dark-theme', newDarkTheme);
    localStorage.setItem('darkTheme', newDarkTheme);
  }

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  }

  const logoutUser = async() => {
    navigate('/')
    await customFetch.get('/v1/auth/logout');
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
          <div>
            <NavBar />
            <div className="dashboard-page">
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  )
}

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;