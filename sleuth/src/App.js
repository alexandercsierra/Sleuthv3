import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import Sketch from "./sketch"
import Buttons from "./buttons";

function App() {
  return (
    <div>
        <h1>Sleuth</h1>
        <P5Wrapper sketch={Sketch} />
        <Buttons />
        
    </div>
        
  );
}
export default App;
