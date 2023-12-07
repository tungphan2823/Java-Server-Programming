import "./App.css";
import CoursePage from "./pages/Course";
import StudentPage from "./pages/Student";
import DashboardPage from "./pages/Dashboard";
import StudentJoinedPage from "./pages/StudentJoined";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import RootPage from "./pages/Root";
import StudentDetailPage from "./pages/StudentDetail";
import { DataContext, DataProvider } from "./store/App-context";
import CourseDetailPage from "./pages/CourseDetail";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "course",
        element: <CoursePage />,
      },
      {
        path: "course/:courseID",
        element: <CourseDetailPage />,
      },

      {
        path: "student",
        element: <StudentPage />,
      },
      ,
      {
        path: "student/:studentID",
        element: <StudentDetailPage />,
      },

      {
        path: "enroll",
        element: <StudentJoinedPage />,
      },
    ],
  },
]);
function App() {
  return (
    <DataProvider>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </DataProvider>
  );
}

export default App;
