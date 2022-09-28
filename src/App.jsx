import React, { useEffect, useState } from "react";
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import Waving from "./Waving";
import "./css/App.css";

import AboutMe from "./AboutMe";

const App = () => {

  return (
    

    <div className="maincontainer">
      <div className="banner">
      </div>      
      <Waving />
      <div className="bio">
        <AboutMe />
      </div>
      
    </div>
  );
}

export default App;