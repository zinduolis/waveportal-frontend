import React, { useState } from 'react';

import laptopPic from "./img/mini-profile-bg-01.jpg";

import "./css/Welcome.css";

function Welcome () {
  return (
    <div id="tmWelcome">
          <img className="stretch" src={laptopPic} alt="Laptop Picture"/>
    </div>
  )
}

export default Welcome;