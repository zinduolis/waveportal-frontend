import React from 'react';
import "./css/AboutMe.css";
import avatar from "./img/LolyPunk_RedGraz.jpeg";

function AboutMe(){
  return (
    <div>
    	<blockquote>
  		  <p>I'm transitioning from AppSec into Web3. 
        </p>
        <cite>Red<span className="cite-last-name">Graz</span></cite>
        <div className="blockquote-author-image">
          <img src={avatar} alt="Me" />
        </div>
	    </blockquote>
    </div>
  ) 
}

export default AboutMe;