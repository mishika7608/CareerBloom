import React from 'react'
import { JobsContainer, SearchContainer } from '../components'
import customFetch from '../utils/customFetch'
import { useLoaderData} from 'react-router-dom'
import {useContext, createContext } from 'react'

export const loader = async () =>{
  try{
    const {data} = await customFetch.get('/v1/jobs');
    return {data};
  }catch(error){
    return error;
  }
}

const AllJobsContext = createContext()

const AllJobs = () => {
  const {data} = useLoaderData();
  return <AllJobsContext.Provider value={{ data }}>
    <SearchContainer />
    <JobsContainer />
  </AllJobsContext.Provider>
}

export const useAllJobsContext = () => useContext(AllJobsContext);

export default AllJobs;