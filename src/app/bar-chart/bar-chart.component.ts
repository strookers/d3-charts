import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3/index';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  barData : dataItem[] = [{x: 1, y: 5}, {x: 20, y: 20}, {x: 40, y: 10}, {x: 60, y: 40}, {x: 80, y: 5}, {x: 100, y: 60}];

  constructor() { }

  ngOnInit() {
    this.initChart();
  }

  initChart() {
    var barData = this.barData;
    var svgWidth : number = 1000;
    var svgHeight : number = 500;
    var margin = {top: 20, right: 20, bottom: 20, left: 50}

    var svg = d3.select('#bar-chart').append('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight)
      .attr('viewbox', '0 0 '+ svgWidth + ' ' + svgHeight)
      .attr('preserveAspectRatio', 'xMinYMid');

    var xRange = d3.scaleLinear()
    .range([margin.left, svgWidth - margin.right])
    .domain([d3.min(barData, d => d.x),d3.max(barData, d => d.x)]);

    var yRange = d3.scaleLinear()
    .range([svgHeight - margin.top, margin.bottom])
    .domain([0, d3.max(barData, d => d.y)]);

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

    xRange = d3.scaleBand()
      .rangeRound([margin.left, svgWidth - margin.right])
      .padding(0.1)
      .domain(barData.map(d => d.x));

    svg.selectAll('rect')
      .data(barData)
      .enter()
      .append('rect')
      .attr('x', d => xRange(d.x) )
      .attr('y', d => yRange(d.y) )
      .attr('width', xRange.bandwidth()) // sets the width of bar
      .attr('height', d => (svgHeight - margin.bottom) - yRange(d.y))
      .attr('fill', 'grey');   // fills the bar with grey color

  }
}

interface dataItem
{
  x : number;
  y : number;
}
