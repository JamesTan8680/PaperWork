import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import SideBar from "./components/Sidebar/SideBar";
import "./App.css";
import CreateDoc from "./pages/CreateDoc/CreateDoc";
import ViewDoc from "./pages/ViewDoc/ViewDoc";
import DocControl from "./pages/DocControl/DocControl";
import CustomizeDoc from "./pages/CustomizeDoc/CustomizeDoc";
import EditDoc from "./pages/EditDoc/EditDoc";
import ReviewDoc from "./pages/ReviewDoc/ReviewDoc";
import Contact from "./pages/Contact/Contact";
const Layout = () => {
  return (
    <div className="app">
      <div className="left">
        <SideBar />
      </div>
      <div className="right">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};
//creat the router for the app
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    //for the child page or route
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/createDoc",
        element: <CreateDoc />,
      },
      {
        path: "/viewDoc",
        element: <ViewDoc />,
      },
      {
        path: "/viewDoc/:id",
        element: <DocControl />,
      },
      {
        path: "/CustomizeDoc/:id/:type",
        element: <CustomizeDoc />,
      },
      {
        path: "/editDoc/:id",
        element: <EditDoc />,
      },
      {
        path: "/ReviewDoc/:id",
        element: <ReviewDoc />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
]);
function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
