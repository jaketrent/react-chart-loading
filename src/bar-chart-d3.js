import d3 from 'd3'
import random from 'lodash.random'
import range from 'lodash.range'

export default class BarChartD3 {
  static defaultConfig = {
    margin: { top: 10, right: 10, bottom: 10, left: 10 },
    animationDuration: 400,
    intervalDuration: 600,
    paddingToBarPercentage: .6,
    radius: 3,
    numBars: 4
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
  }
  initScales() {
    const x = d3.scale.ordinal()
      .rangeRoundBands([0, this.getChartWidth()], this.config.paddingToBarPercentage)
      .domain(range(this.config.numBars))

    const y = d3.scale.linear()
      .range([this.getChartHeight(), 0])

    this.setConfig({ x, y })
  }
  getData() {
    return this.data
  }
  setData() {
    this.data = range(this.config.numBars).map(i => ({
      x: i,
      y: random(1, 10)
    }))
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
    this.config.y.domain([0, d3.max(this.getData(), d => d.y)])
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
  drawBars() {
    const { x, y, radius } = this.config

    const bars = this.svg.selectAll(`.${this.config.css.bar}`)
      .data(this.getData(), d => d.x)

    bars.enter().append('rect')
      .attr('class', this.config.css.bar)
      .attr('x', d => x(d.x))
      .attr('width', x.rangeBand())
      .attr('rx', radius)
      .attr('ry', radius)
      .attr('y', this.getChartHeight())
      .attr('height', 0)

    bars.exit().remove()

    bars
      .transition()
      .duration(this.config.animationDuration)
        .attr('y', d => y(d.y))
        .attr('height', d => this.getChartHeight() - y(d.y))
  }
  draw() {
    this.clear()
    this.setYDomain()

    this.drawSvg()
    this.drawBars()
  }
  redraw() {
    this.setData()
    this.setYDomain()

    this.drawBars()
  }
  drawLoop() {
    this.draw()
    this.interval = setInterval(() => { this.redraw() }, this.config.intervalDuration)
  }
  endLoop() {
    window.clearInterval(this.interval)
  }
}
