import React, {useRef, useEffect, useState} from 'react';
import "./Canvas.css";

//CANVAS SKETCH FUNKCE
const random = require ('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

//HLAVNÍ CANVAS FUNKCE
const Canvas = () => {

  //VELIKOST CANVAS
  const width = 1000;
  const height = 1000;

  //GUI MENU
  //INPUT OUTPUT CHANGE PARAM
  const [colsDef, setColsDef] = useState(30);
  const [rowsDef, setRowsDef] = useState(40);
  const [scaleMin, setScaleMin] = useState(10);
  const [scaleMax, setScaleMax] = useState(20);
  const [noiseFreq, setNoiseFreq] = useState(-0.0004);
  const [amp, setAmp] = useState(0.7);
  const [wChange, setWChange] = useState(0.2);

  //sliders events
  const colsFun = (event) => {
    setColsDef(event.target.value);
  }
  const rowsFun = (event) => {
    setRowsDef(event.target.value);
  }
  const minScaleFun = (event) => {
    setScaleMin(event.target.value);

  }
  const maxScaleFun = (event) => {
    setScaleMax(event.target.value);
  }
  const noiseFreqFun = (event) => {
    setNoiseFreq(event.target.value);
  }
  const ampFun = (event) => {
    setAmp(event.target.value);
  }
  const wChangeFun = (event) => {
    setWChange(event.target.value);
  }
  //PRESSETY
  //presset 1
  const presset1 = () => {
    setColsDef(19);
    setRowsDef(27);
    setScaleMin(3);
    setScaleMax(97);
    setNoiseFreq(-0.0004);
    setAmp(1);
    setWChange(0.5);
  }
  //presset 2
  const presset2 = () => {
    setColsDef(30);
    setRowsDef(35);
    setScaleMin(3);
    setScaleMax(22);
    setNoiseFreq(-0.0013);
    setAmp(1);
    setWChange(0.1);
  }
  //presset 3
  const presset3 = () => {
    setColsDef(21);
    setRowsDef(24);
    setScaleMin(1);
    setScaleMax(20);
    setNoiseFreq(-0.0049);
    setAmp(0.5);
    setWChange(0.3);
  }

  //presset 4
  const presset4 = () => {
    setColsDef(23);
    setRowsDef(1);
    setScaleMin(3);
    setScaleMax(31);
    setNoiseFreq(-0.0004);
    setAmp(1);
    setWChange(0.4);
  }

  //presset 5
  const presset5 = () => {
    setColsDef(8);
    setRowsDef(7);
    setScaleMin(4);
    setScaleMax(100);
    setNoiseFreq(0.0012);
    setAmp(0.1);
    setWChange(0.8);
  } 

  //shadow funkce
  const [opacityToogle, setOpacityToogle] = useState(true);
  const [s, setS] = useState(0);
  const [opacityButtonText, setOpacityButtonText] = useState("Turn off opacity")

  const opacityFun = () => {
    setOpacityToogle(!opacityToogle);
    console.log(opacityToogle)
    if(opacityToogle === true) {
      setS(1);
      setOpacityButtonText("Turn on opacity");
    }else{
      setS(0);
      setOpacityButtonText("Turn off opacity");
    }

  }
 


  //GRID DEFINICE
  const cols = colsDef;
  const rows = rowsDef;
  const numCells = cols * rows;
  const gridw = width * 0.8;
  const gridh = height * 0.8;
  const cellw = gridw / cols;
  const cellh = gridh / rows;
  const margx = (width - gridw) * 0.5;
  const margy = (height - gridh) * 0.5;

  //FUNKCE MISTO "document.querySelector"
  const canvas = useRef();
  useEffect(() => {
    const context = canvas.current.getContext('2d');
    drawing(context);
  });

  //COUNTING PRO ANIMACI
  let counting = 1;

  //CONTEXT PARAMETRY
  const drawing = context => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    //FUNKCE ANIMACE
    let animate = () => {
      context.clearRect(0, 0, width, height);                 //vymaže canvas po každem stepu
      //animation props
      requestAnimationFrame(animate);

      //COUNTING +1 PO KAŽDE CO PROBĚHNE FUNKCE animate()
      counting++;

      for (let i = 0; i < numCells; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);

        const x = col * cellw;
        const y = row * cellh;
        const w = cellw * wChange;
        const h = cellh * wChange;

        //noise + math.range z canvass knihovny
        let n = random.noise2D(x + counting * 10 , y, noiseFreq);
        const o = random.noise2D(x + counting * 10, y , 0.001);
        const angle = n * Math.PI * amp;
        const scale = math.mapRange(n, 1, -1, scaleMin, scaleMax);
        //const opacity = math.mapRange(o, -1, 1, 0.4, 1);
        const opacityOption = [math.mapRange(o, -1, 1, 0.1, 1), 1];

        const opacity = opacityOption[s];
      
        context.save();
        context.translate(x, y);
        context.translate(margx, margy);
        context.translate(cellw * 0.5, cellh * 0.5);
        context.rotate(angle);
        context.lineWidth = scale;

        context.beginPath();
        context.moveTo(w * -0.5, 0);
        context.lineTo(h * 0.5, 0);
        context.globalAlpha = opacity;
        context.stroke()
        context.restore();
      }
    };
    animate(); 
  };

  return ( 
    <div style={{background: "white"}}>

      <div      
        style={{
        position: "absolute",
        left: "70px",
      }}>
        <canvas ref={canvas} height={height} width={width} />
      </div>

      <div 
      style={{
        position: "absolute",
        background: "orange",
        padding: "10px",
        borderRadius: "15px",
        textAlign: "left"
      }}>

        <label htmlFor="cols">cols: ({colsDef})</label><br></br>
        <input
          name='cols'
          type='range'
          onChange={colsFun}
          min={1}
          max={50}
          step={1}
          value={colsDef}
          className='colSlider'
        ></input>
        <br />

        <label htmlFor="rows">rows: ({rowsDef})</label><br></br>
        <input
          name='rows'
          type='range'
          onChange={rowsFun}
          min={1}
          max={50}
          step={1}
          value={rowsDef}
          className='rowSlider'
        ></input>
        <br />

        <label htmlFor="minScale">minScale: ({scaleMin})</label><br></br>
        <input
          name='minScale'
          type='range'
          onChange={minScaleFun}
          min={1}
          max={30}
          step={1}
          value={scaleMin}
          className='minScaleSlider'
        ></input>
        <br />

        <label htmlFor="maxScale">maxScale: ({scaleMax})</label><br></br>
        <input
          name='maxScale'
          type='range'
          onChange={maxScaleFun}
          min={11}
          max={100}
          step={1}
          value={scaleMax}
          className='maxScaleSlider'
        ></input>
        <br />

        <label htmlFor="noiseFreq">Noise freq: ({noiseFreq})</label><br></br>
        <input
          name='noiseFreq'
          type='range'
          onChange={noiseFreqFun}
          min={-0.01}
          max={0.01}
          step={0.0001}
          value={noiseFreq}
          className='noiseFreq'
        ></input>
        <br />

        <label htmlFor="amp">Amplitude: ({amp})</label><br></br>
        <input
          name='amp'
          type='range'
          onChange={ampFun}
          min={0.1}
          max={1}
          step={0.1}
          value={amp}
          className='amp'
        ></input>
        <br />

        <label htmlFor="wChange">Box width: ({wChange})</label><br></br>
        <input
          name='wChange'
          type='range'
          onChange={wChangeFun}
          min={0.1}
          max={1}
          step={0.1}
          value={wChange}
          className='wChange'
        ></input>
        <br />
        <button onClick={opacityFun}>{opacityButtonText}</button><br />
        <button onClick={presset1}>presset 1</button><br />
        <button onClick={presset2}>presset 2</button><br />
        <button onClick={presset3}>presset 3</button><br />
        <button onClick={presset4}>presset 4</button><br />
        <button onClick={presset5}>presset 5</button><br />

      </div>

    </div>
  );
};

export default Canvas;