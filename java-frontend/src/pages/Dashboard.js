import DashboardCard from "../components/DashboardCard";
import StudentTable from "../components/StudentTable";
import CourseTable from "../components/CourseTable";
import './Dashboard.css';
import { DataContext } from "../store/App-context";
import { useContext } from "react";
const DashboardPage = () => {
  const { students, courses, sjcData } = useContext(DataContext);
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="DashCard">
        {" "}
        <DashboardCard title="Number of Students:" number={students.length}/>
        
        <DashboardCard title="Number of Courses:" number={courses.length}/>
        <DashboardCard  title="Number of Enrollment:" number={sjcData.length}/>
      </div>
      <div className="table">
      <StudentTable/>
      <CourseTable />
      </div>
      
    </div>
  );
};
export default DashboardPage;
