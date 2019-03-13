import React from 'react'
import { Card, Icon } from 'antd'

const TranslateResults = props => {
  return (
    <div className="translate-results">
      { props.translateResults.reverse().map( (res, idx) => {
        const ts = new Date( res.timestamp).toLocaleString()
        return (
        <div key={idx}>
          <Card style={{ width: "100%"}}>
            <p><Icon type="clock-circle" /> {ts}</p>
            <p><Icon type="sound" /> {res.transcript}</p>
            <p><Icon type="robot" /> {res.translation}</p>
          </Card>
        </div>)
      })}
    </div>
  )
}

export default TranslateResults