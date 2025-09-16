import React from 'react'
import Wrapper from '../assets/wrappers/SmallSideBar';
import {useDashboardContext} from '../pages/DashboardLayout';

const SmallSideBar = () => {

    const data = useDashboardContext();

  return (
    <Wrapper>SmallSideBar</Wrapper>
  )
}
export default SmallSideBar;