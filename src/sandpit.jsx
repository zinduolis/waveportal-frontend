/// @dev using parallax
import { Parallax, ParallaxLayer } from '@react-spring/parallax';

<div id="tmWelcome" className="parallax-window" data-parallax="scroll">
    <Parallax pages={2}>
      <ParallaxLayer offset={0} speed={1} horizontal>
      <div id="background">
          <img className="stretch" src={laptopPic} alt="Laptop Picture"/>
    </div>
      </ParallaxLayer>
      <ParallaxLayer offset={1} speed={0.5} factor={1}>
        <img className="float-right" src={avatar} alt="Me" width="500"/>
      </ParallaxLayer>
      <ParallaxLayer sticky={{ start: 1, end: 2 }} />
    </Parallax>
    </div>