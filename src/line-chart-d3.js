import d3 from 'd3'
import random from 'lodash.random'
import range from 'lodash.range'

export default class LineChartD3 {
  static defaultConfig = {
    margin: { top: 10, right: 10, bottom: 10, left: 10 },
    animationDuration: 2400,
    numDataPoints: 10
  };
  constructor(el, config) {
    this.el = el
    this.config = this.constructor.defaultConfig
    this.init(config)
  }
  setConfig(newConfig) {
    this.config = {
      ...this.config,
      ...newConfig
    }
  }
  init(config) {
    this.setConfig(config)
    this.setData()
    this.initScales()
    this.initLine()
  }
  initScales() {
    const x = d3.scale.linear()
      .range([0, this.getChartWidth()])
      .domain([0, this.config.numDataPoints - 1])

    const y = d3.scale.linear()
      .range([this.getChartHeight(), 0])

    this.setConfig({ x, y })
  }
  initLine() {
    const { x, y } = this.config
    var line = d3.svg.line()
      .x(d => x(d.x))
      .y(d => y(d.y))

    this.setConfig({ line })
  }
  setData() {
    this.data = range(this.config.numDataPoints).map(i => ({
      x: i,
      y: random(1, 10)
    }))
  }
  getData() {
    return this.data
  }
  getChartWidth() {
    return this.config.width - this.config.margin.left - this.config.margin.right
  }
  getChartHeight() {
    return this.config.height - this.config.margin.top - this.config.margin.bottom
  }
  clear() {
    while (this.el.firstChild) {
      this.el.removeChild(this.el.firstChild)
    }
  }
  setYDomain() {
    this.config.y.domain(d3.extent(this.getData(), d => d.y))
  }
  drawSvg() {
    var selection = d3.select(this.el)

    var svg = selection
      .attr('width', this.config.width)
      .attr('height', this.config.height)

    var g = svg.append('g')
      .attr('transform', 'translate(' + this.config.margin.left + ',' + this.config.margin.top + ')')

    this.svg = g
  }
  drawLine() {
    const path = this.svg.append('path')
      .datum(this.getData())
      .attr('class', this.config.css.line)
      .attr('d', this.config.line)

    const lineLength = path.node().getTotalLength()

    path
      .attr('stroke-dasharray', lineLength + ' ' + lineLength)
      .attr('stroke-dashoffset', lineLength)
      .style('opacity', 1)
      .transition()
        .duration(0.32 * this.config.animationDuration)
        .attr('stroke-dashoffset', 0)
      .transition()
        .delay(0.28 * this.config.animationDuration)
        .duration(0.4 * this.config.animationDuration)
        .attr('stroke-dashoffset', -1 * lineLength)
        .style('opacity', 0)
  }
  draw() {
    this.clear()
    this.setData()
    this.setYDomain()

    this.drawSvg()
    this.drawLine()
  }
  drawLoop() {
    this.draw()
    this.interval = setInterval(() => { this.draw() }, 1.05 * this.config.animationDuration)
  }
  endLoop() {
    window.clearInterval(this.interval)
  }
}
