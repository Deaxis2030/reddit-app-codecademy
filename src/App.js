import React, { useState, useEffect } from 'react';
import Panels from './Components/panel/panels';
import SideBar from './Components/Sidebar/sidebar';

function App() {

  return (
    <div className="App">
      < div className="App-header">
          <Panels />
          <SideBar />
      </div>
    </div>
  );
}

export default App;
