import React, { Component } from 'react'
import { Card, Icon } from 'antd'

class TranslateResult extends Component {
  constructor( props ) {
    super( props )

    this.state = {
      result: null
    }
  }
  componentDidMount() {
    console.log( this.props.localId, this.props.wsUrl )
    this.startWS()
      .then( ws => this.ws = ws )
      .catch( err => console.error(err))
  }

  startWS() {
    return new Promise( (resolve, reject) => {
      let resolved = false
      const ws = new WebSocket( `${this.props.wsUrl}?roomName=${this.props.localId}` )

      ws.onopen = ev => {
        resolved = true
        resolve(ws)
      }

      ws.onmessage = ev => {
        try {
          const data = JSON.parse( ev.data )
          if( data.payload.results.length > 0 ) {
            const transcript = data.payload.results[0].alternatives[0].transcript
              , confidence = data.payload.results[0].alternatives[0].confidence
              , translation = data.payload.translation
              , timestamp = data.payload.timestamp
            
            const result = {
              timestamp, transcript, confidence, translation
            }
            this.setState( { result } )
            if( typeof this.props.handleTranslateResult === "function" ) {
              this.props.handleTranslateResult( result )
            }
          }
        } catch( err ) {
          console.warn(err)
        }
      }

      ws.onclose = ev => {
        if( !resolved ) reject(new Error('ws has been closed'))
        resolved = true
      }

      ws.onerror = ev => {
        if( !resolved ) reject( ev )
        resolved = true
      }
    })
  }

  render() {
    return (
      <div style={this.props.style} className="translate-result">
        { this.state.result ? (
          <Card style={{ width: 300}}>
            <p><Icon type="sound" /> {this.state.result.transcript}</p>
            <p><Icon type="robot" /> {this.state.result.translation}</p>
          </Card>
        ):'' }
      </div>
    )
  }
}

export default TranslateResult