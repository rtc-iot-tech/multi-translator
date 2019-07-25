import React from 'react'
import { Card, Icon } from 'antd'

const TranslateResults = props => {
  return (
    <div className="translate-results" style={props.style}>
      { props.translateResults.reverse().map( (res, idx) => {
        const ts = new Date( res.timestamp).toLocaleString()
        return (
        <div key={idx}>
          <Card style={{ width: "100%", fontSize: "1.4em"}}>
            <p><Icon type="clock-circle" /> {ts}</p>
            <p><Icon type="sound" /> {res.transcript}</p>
            { !props.hideTranslate ?
            <p><Icon type="robot" /> {res.translation}</p>
            : '' }
          </Card>
        </div>)
      })}
    </div>
  )
}

export default TranslateResults