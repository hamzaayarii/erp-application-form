import JobApplication from "./pages/JobApplication";
import Error from "./pages/error";
import Values from "./pages/values";
import DevloperApplication from "./pages/DevloperApplication";
import { withCondition } from "./routes/protectedRoute";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    createBrowserRouter,
    RouterProvider,
    Navigate,
} from "react-router-dom";

function App() {
    const JobApplicationRoute = withCondition(JobApplication, true, "/error");
    const ErrorRoute = withCondition(Error, true, "/error");
    const ValuesRoute = withCondition(Values, true, "/error");
    // const DashboardRoute = withCondition(Dashboard, true, '/error');

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Navigate to="/JobApplication" replace />,
        },
        {
            path: "/JobApplication",
            element: <JobApplicationRoute />,
        },
        {
            path: "/DevloperApplication",
            element: <DevloperApplication />,
        },       
        {
            path: "/values",
            element: <ValuesRoute />,
        },
        {
            path: "/error",
            element: <ErrorRoute />,
        },
       
    ]);
    return (
        <RouterProvider router={router} />
        // /* Method: Using a higher-order component */
        // <Router>
        //   <Routes>
        //     <Route path="/" element={<JobApplicationRoute />} />
        //   </Routes>
        //   <Routes>
        //     <Route path="/values" element={<ValuesRoute />} />
        //   </Routes>
        //   <Routes>
        //     <Route path="/error" element={<ErrorRoute />} />
        //   </Routes>
        //   <Routes>
        //     <Route path="/dashboard" element={<DashboardRoute />} />
        //   </Routes>
        // </Router>
    );
}

export default App;
