// import React, { Component, useRef, useEffect, useState } from 'react';
// import * as d3 from 'd3';

// class StockChart extends Component{

//     constructor(props){
//         super(props)
//     }


    

//     render(){
//         const svgRef = useRef();
//         const [data, setData] = useState([25, 30,45,50,20]);
//         useEffect(() => {
//             const svg = select(svgRef.current);
//             svg.selectAll("circle")
//             .data(this.state.data)
//             .join(
//                 enter => enter.append("circle"),
//                 update => update.attr("class", "updated"),
//                 exit => exit.remove()
//             )
//             .attr("r", value => value / 2)
//             .attr("cx", value => value * 2)
//             .attr("cy", value => value * 2)
//             .attr("stroke", "red")
//         }, [data]);

//         return(
//             <svg ref={svgRef}></svg>
//         )
//     }

// }

// export default StockChart;