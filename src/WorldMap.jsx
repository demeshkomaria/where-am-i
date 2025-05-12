import React from 'react';
import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

import TRAVEL_DATA from './travelData';

export default function WorldMap() {
	const svgRef = useRef();
	const projectionRef = useRef(d3.geoOrthographic().scale(350).center([0, 0]));

	useEffect(() => {
		const svg = d3.select(svgRef.current);
        const rect = svg.node().getBoundingClientRect();
		const width = rect.width;
		const height = rect.height;

		const path = d3.geoPath();

		projectionRef.current.scale(width * 20 / 65).translate([width / 2, height / 2]);

		svg.append("rect")
			.attr("width", "100%")
			.attr("height", "100%")
			.attr("fill", "#0A1128");

		Promise.all([
			d3.json(
				'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson',
			),
		]).then(([topology]) => {
			svg.selectAll('path')
				.data(topology.features)
				.join('path')
				.attr('d', path.projection(projectionRef.current))
				.attr('fill', (d) => {
                    if (TRAVEL_DATA.has(d.id)) return '#23BCE7';
					return '#034078';
				})
				.attr('stroke', (d) => {
					if (TRAVEL_DATA.has(d.id)) return '#034078';
					return '';
				});
		});

		svg.call(
			d3.drag().on('drag', function (event) {
				const rotate = projectionRef.current.rotate();
				projectionRef.current.rotate([
					rotate[0] + event.dx / 2,
					rotate[1] - event.dy / 2,
				]);
				svg.selectAll('path').attr('d', path);
			}),
		);
	}, []);

	return <svg ref={svgRef} width="100%" height="100%"/>;
}