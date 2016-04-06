import React from 'react'
import styleable from 'react-styleable'

import BarChartD3 from './bar-chart-d3'
import LineChartD3 from './line-chart-d3'

const chartTypes = {
  line: LineChartD3,
  bar: BarChartD3
}

const { oneOf, number, object } = React.PropTypes

@styleable(require('./index.css'))
export default class ChartLoading extends React.Component {
  static propTypes = {
    css: object.isRequired,
    type: oneOf(['line', 'bar']),
    width: number,
    height: number
  };
  static defaultProps = {
    type: 'line',
    height: 50,
    width: 100
  };
  componentDidMount() {
    this.chart = new chartTypes[this.props.type](this.refs.svg, this.props)
    this.chart.drawLoop()
  }
  componentWillUnmount() {
    this.chart.endLoop()
  }
  shouldComponentUpdate() {
    return false
  }
  render() {
    return (
      <svg ref="svg" className={this.props.css.container}></svg>
    )
  }
}
