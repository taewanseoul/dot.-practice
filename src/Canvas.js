import { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

import SVG from "./svg";

const Canvas = () => {
  const [data, setData] = useState([20, 25, 30, 45, 60, 79, 80, 90, 100]);

  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const width = window.innerWidth * 0.5;
  const height = window.innerHeight * 0.3;

  const [ctx, setCtx] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    // canvas.width = window.innerWidth * 0.5;
    // canvas.height = window.innerHeight * 0.7;

    // const canvas = d3.select("#root").append("canvas").attr("id", "canvas");
    // canvas.append(`${SVG}`);

    const margin = { top: 0, left: 80, right: 50, bottom: 0 };

    // const svg = d3
    //   .select("container")
    //   .append("g")
    //   .attr("transform", `translate(${margin.left}, ${margin.top})`)
    //   .selectAll("circle")
    //   .data(data)
    //   .join("circle")
    //   .attr("r", (value) => value)
    //   .attr("cx", (value) => value * 2 + width / 2)
    //   .attr("cy", (value) => value * 2 + height / 2)
    //   .attr("fill", "pink")
    //   .attr("stroke", "cyan");

    // const zoomG = tempCanvas.append("g");

    // const g = zoomG // (*)
    //   .append("g")
    //   .attr("transform", `translate(${margin.left}, ${margin.top})`)
    //   .selectAll("circle")
    //   .data(data)
    //   .join("circle")
    //   .attr("r", (value) => value)
    //   .attr("cx", (value) => value * 2)
    //   .attr("cy", (value) => value * 2)
    //   .attr("stroke", "blue");

    const context = canvas.getContext("2d");
    context.strokeStyle = "black";
    context.lineWidth = 2.5;
    contextRef.current = context;

    context.fillStyle = "rgb(200, 0, 0)";
    context.fillRect(10, 10, 50, 50);

    context.fillStyle = "rgba(0, 0, 200, 0.5)";
    context.fillRect(30, 30, 50, 50);

    const circleData = [
      {
        x: 200,
        y: 100,
        height: 200,
      },
    ];

    circleData.forEach((circle) => {
      context.fillStyle = "rgba(0, 0, 200, 0.5)";
      context.fillRect(circle.x, circle.y, 2, circle.height);
    });

    setCtx(contextRef.current);
  }, []);

  console.log("canvasRef.current :", canvasRef.current);
  console.log("ctx :", ctx);

  const startDrawing = () => {
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    setIsDrawing(false);
  };

  // const drawing = ({ nativeEvent }) => {
  //   console.log("nativeEvent :::", nativeEvent);
  const drawing = (e) => {
    console.log(e);
    console.log("nativeEvent :::", e.nativeEvent);
    const { offsetX, offsetY } = e.nativeEvent;

    if (ctx) {
      if (!isDrawing) {
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
      } else {
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
      }
    }
  };

  return (
    <>
      <SVG></SVG>
      <div className='canvas_wrap'>
        <canvas
          id='container'
          ref={canvasRef}
          width={2 * width}
          height={2 * height}
          style={{
            width: `${width}`,
            height: `${height}`,
          }}
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={drawing}
          onMouseLeave={finishDrawing}
        ></canvas>
      </div>
    </>
  );
};

export default Canvas;
