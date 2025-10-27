import React from "react";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useAllJobsContext } from "../pages/AllJobs";
import Jobs from "./Jobs";

const JobsContainer = () =>    {
    const {data} = useAllJobsContext();
    const {jobs}=data
    if (jobs.length===0){
        return (<Wrapper>
            <h2>No Jobs to Display...</h2>
        </Wrapper>);
    }
    return <Wrapper>
        <div className="jobs">
            {jobs.map((job) => {
                return <Jobs key={job._id} {...job} />
            })}
        </div>
    </Wrapper>

}
export default JobsContainer;