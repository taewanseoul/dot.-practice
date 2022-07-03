import { useState, useEffect, useRef } from "react";
import { select, zoom } from "d3";

const SVG = () => {
  const [data, setData] = useState([20, 25, 30, 45, 60, 79, 80, 90, 100]);
  const svgRef = useRef();

  const width = window.innerWidth * 0.5;
  const height = window.innerHeight * 0.3;

  const margin = { top: 0, left: 50, right: 50, bottom: 0 };
  const innerWidth = width - margin.right - margin.left;
  const innerHeight = height - margin.top - margin.bottom;

  useEffect(() => {
    const svg = select(svgRef.current);

    console.log("svgRef :", svgRef);

    // svg.select("div").append("svg").attr("width", width).attr("height", height);

    const zoomG = svg
      // .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("r", (value) => value)
      .attr("cx", (value) => value * 2 + width / 2)
      .attr("cy", (value) => value * 2 + height / 2)
      .attr("fill", "pink")
      .attr("stroke", "cyan");

    // Add Zooming
    svg.call(
      zoom().on("zoom", ({ transform }) => {
        zoomG.attr("transform", transform);
      })
    );
  }, [data]);

  return (
    <div
      style={{
        width: "600px",
        height: "800px",
      }}
    >
      <svg
        ref={svgRef}
        style={{
          width: "600px",
          height: "600px",
        }}
      ></svg>
      <button onClick={() => setData(data.map((value) => value + 5))}>
        Update data
      </button>
      <button onClick={() => setData(data.filter((value) => value < 35))}>
        Filter data
      </button>
    </div>
  );
};

export default SVG;
