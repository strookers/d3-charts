import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3/index';

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.css']
})
export class AreaChartComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    this.updateChart();
  }

  updateChart() {
    var svgWidth : number = 1000;
    var svgHeight : number = 500;

    var svg = d3.select('#area-chart').append('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight);

    var margin = {top: 20, right: 20, bottom: 30, left: 50};
    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;

    var g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //to parse date to js date object
    var parseTime = d3.timeParse("%d-%b-%y");

    var x = d3.scaleTime()
      .rangeRound([0, width]);

    var y = d3.scaleLinear()
      .rangeRound([height, 0]);

    var area = d3.area()
    .x(d => x(d.date))
    .y1(d => y(d.close));

    d3.tsv("/assets/area-chart.tsv", d => {
      d.date = parseTime(d.date);
      d.close = +d.close;
      return d;
    }, (error, data) => {
      if (error) throw error;

      x.domain(d3.extent(data, d => d.date));
      y.domain([0, d3.max(data, d => d.close)]);
      area.y0(y(0));

      g.append("path")
          .datum(data)
          .attr("fill", "steelblue")
          .attr("d", area);

      g.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

      g.append("g")
          .call(d3.axisLeft(y))
        .append("text")
          .attr("fill", "#000")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", "0.71em")
          .attr("text-anchor", "end")
          .text("Price ($)");
    });

  }
}
