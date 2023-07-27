import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import SideBar from "./components/Sidebar/SideBar";
import "./App.css";
import CreateDoc from "./pages/CreateDoc";
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
