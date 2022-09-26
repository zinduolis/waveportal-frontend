import React, { useState } from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import laptopPic from "./img/mini-profile-bg-01.jpg";
import avatar from "./img/LolyPunk_RedGraz.jpeg";

function Welcome () {
  return (
    <div id="tmWelcome" className="parallax-window" data-parallax="scroll">
    <Parallax pages={2}>
      <ParallaxLayer offset={0} speed={1} horizontal>
        <img className="float-left" src={laptopPic} alt="Laptop Picture"/>
      </ParallaxLayer>
      <ParallaxLayer offset={1} speed={0.5} factor={1}>
        <img className="float-right" src={avatar} alt="Me" width="500"/>
      </ParallaxLayer>
      <ParallaxLayer sticky={{ start: 1, end: 2 }} />
    </Parallax>
    </div>
  )
}

export default Welcome;