import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3/index';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  dataset: number[] = [5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25];

  constructor() { }

  ngOnInit() {
    this.updateChart();
  }

  updateChart() {
    var svgWidth : number = 500;
    var svgHeight : number = 100;
    var barPadding : number = 1;

    var svg = d3.select("#chart")
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    var rects = svg.selectAll("rect")
      .data(this.dataset)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * (svgWidth / this.dataset.length))
      .attr("y", d => svgHeight - d * 4)
      .attr("width", svgWidth / this.dataset.length - barPadding)
      .attr("height", d => d * 4)
      .attr('fill', d => "rgb(0, 0, " + (d * 10) + ")" );

    var labels = svg.selectAll("text")
      .data(this.dataset)
      .enter()
      .append("text")
      .text(d => d)
      .attr('x', (d, i) => i * (svgWidth / this.dataset.length) + 5)
      .attr('y', d => svgHeight - (d * 4) + 15)
      .attr("font-family", "sans-serif")
      .attr("font-size", "11px")
      .attr("fill", "white");
  }
}
