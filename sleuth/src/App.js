import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import Sketch from "./sketch"

function App() {
  return (
    <div>
        <h1>Sleuth</h1>
        <P5Wrapper sketch={Sketch} />
        
    </div>
        
  );
}
export default App;
