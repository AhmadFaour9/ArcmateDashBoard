import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./Routes/router";
import {  SideBar, Table } from "./Components";

function App() {
  return (
    <div className="App container-fluid row">
      <RouterProvider router={router} />
      <div className="col-3">
        <SideBar />
      </div>
      <div className="content-component col-5 ">
        <Table />
      </div>
      <div className="content-component col-4">
        {/* <h1>
          <Charts />
        </h1> */}
      </div>
    </div>
  );
}

export default App;
