import React from 'react' //allows creation of react component
import { Outlet } from 'react-router-dom'; //placeholder component -> tells render child route here

const HomeLayout = () => {  //parent route
  return (
    <>
      <Outlet />
    </>
  );
};
export default HomeLayout;