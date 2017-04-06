import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3/index'

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  lineData : dataItem[] = [{x: 1, y: 5}, {x: 20, y: 20}, {x: 40, y: 10}, {x: 60, y: 40}, {x: 80, y: 5}, {x: 100, y: 60}];

  constructor() { }

  ngOnInit() {
    this.initChart();
  }

  initChart()
  {
    var lineData = this.lineData;
    var svgWidth = 1000;
    var svgHeight = 500;
    var margin = {top: 20, right: 20, bottom: 20, left: 50}

    var svg = d3.select('#line-chart').append('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight);

    var xRange = d3.scaleLinear()
      .domain([d3.min(lineData, (d) => d.x),d3.max(lineData, (d) => d.x)])
      .range([margin.left, svgWidth - margin.right]);

    var yRange = d3.scaleLinear()
      .domain([d3.min(lineData, (d) => d.y),d3.max(lineData, (d) => d.y)])
      .range([svgHeight - margin.top, margin.bottom]);

    var xAxis = d3.axisBottom(xRange)
      .tickSize(5);

    var yAxis = d3.axisLeft(yRange)
      .tickSize(5);

    svg.append('svg:g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + (svgHeight - margin.bottom) + ')')
      .call(xAxis);

    svg.append('svg:g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(' + (margin.left) + ',0)')
      .call(yAxis);

    var lineFunc = d3.line()
      .x(d => xRange(d.x))
      .y(d => yRange(d.y))
      .curve(d3.curveBasis);

    svg.append('svg:path')
      .attr('d', lineFunc(lineData))
      .attr('stroke', 'blue')
      .attr('stroke-width', 2)
      .attr('fill', 'none');

  }

}

interface dataItem
{
  x : number;
  y : number;
}