import styleable from 'react-styleable'
import React from 'react'
import { render } from 'react-dom'

import css from './index.css'
import ChartLoading from 'react-chart-loading'

function Body(props) {
  return (
    <div className={props.css.root}>
      <h1>Examples</h1>

      <div className={props.css.examples}>
        <div className={props.css.example}>
          <h2 className={props.css.title}>For a Line Chart</h2>
          <div className={props.css.box}>
            <ChartLoading type="line" css={{ line: props.css.chartLine }} />
          </div>
        </div>
        <div className={props.css.example}>
          <h2 className={props.css.title}>For a Bar Chart</h2>
          <div className={props.css.box}>
            <ChartLoading type="bar" />
          </div>
        </div>
      </div>

    </div>
  )
}

const StyledBody = styleable(css)(Body)

render(<StyledBody />, document.getElementById('app'))
