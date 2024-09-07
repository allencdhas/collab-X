import React from 'react';
import './App.css';
import 'index.css';
import { Outlet } from 'react-router';



function App() {
  return (
    <>
      <div className="App bg-black">
        <Outlet />
      </div>
    </>
  );
}

export default App;
