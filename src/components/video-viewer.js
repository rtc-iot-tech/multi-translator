import React, { Component } from 'react'
import { Steps } from 'antd'
import Peer from 'skyway-js'
import fetch from 'node-fetch'

const stepTitles = [
  'idle',
  'generating video',
  'connecting skyway',
  'creating mpipe session',
  'starting call',
  'started'
]

class VideoViewer extends Component {
  constructor( props ) {
    super( props )
    this.localStream = null
    this.remoteStream = null
    this.peer = null
    this.call = null
    this.localId = ''
    this.remoteId = ''
    this.token = ''

    this.state = {
      stepNum: 0
    }
  }

  componentDidMount() {
    this.setState( {stepNum: 1})

    this.startLocalVideo()
      .then( stream => {
        this.setState( {stepNum: 2})
        this.localStream = stream
        this.video.srcObject = stream

        return this.connectSkyway()
      }).then( id => {
        this.setState( {stepNum: 3})
        this.localId = id

        return this.createMpipeSession()
      }).then( obj => {
        this.setState( {stepNum: 4})
        this.remoteId = obj.peerid
        this.token = obj.token

        return this.startCall()
      }).then( stream => {
        this.setState( {stepNum: 5})
        this.remoteStream = stream

        if( typeof this.props.handleStreamingStarted === 'function') {
          this.props.handleStreamingStarted( {
            localId: this.localId
          })
        }
      }).catch( err => {
        console.error( err )
      })
  }

  startLocalVideo() {
    return new Promise( ( resolve, reject ) => {
      navigator.mediaDevices.getUserMedia({
        video: true, audio: true
      }).then( stream => {
        resolve(stream)
      }).catch( err => {
        reject( err )
      })
    })
  }

  connectSkyway() {
    return new Promise( (resolve, reject) => {
      let resolved = false
      this.peer = new Peer({
        key: this.props.apikey,
        debug: 3
      })

      this.peer.on('open', id => {
        if( !resolved ) {
          resolved = true
          resolve(id)
        }
      })

      this.peer.on('error', err => {
        if( !resolved ) {
          resolved = true
          reject(err)
        }
      })
    })
  }

  createMpipeSession() {
    return new Promise( (resolve, reject) => {
      const method = "POST"
      const headers = {
        "Accept":       "application/json",
        "Content-Type": "application/json",
      }
      const params = {
        eventParams: {
          clientId: this.localId,
          languageCode: this.props.languageCode,
          targetLanguage: this.props.targetLanguage
        }
      }
      const url = `${this.props.entryPoint}/session`

      fetch( url, {
        method,
        headers,
        body: JSON.stringify( params )
      }).then( res => res.json())
      .then( json => resolve( json ))
      .catch( err => reject(err))
    })
  }

  startCall() {
    return new Promise( (resolve, reject) => {
      let resolved = false

      this.call = this.peer.call( this.remoteId, this.localStream, {
        metadata: { token: this.token }
      })

      this.call.on('stream', stream => {
        if( !resolved ) {
          resolved = true
          resolve( stream )
        }
      })

      this.call.on('error', err => {
        if( !resolved ) {
          resolved = true
          reject( err )
        }
      })
    })
  }

  render() {
    const Step = Steps.Step

    return (
      <div className="VideoViewer">
        <Steps progressDot current={this.state.stepNum}>
          { stepTitles.map( (title, idx) => (
            <Step key={idx} title={title} />
          )) }
        </Steps>

        <video width="100%" ref={ video => { this.video = video }} autoPlay muted></video>
      </div>
    )
  }
}

export default VideoViewer