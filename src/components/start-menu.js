import React, { Component } from 'react'
import { Form, Select, List, Button } from 'antd'
import TranslateResult from './translate-result'
import VideoViewer from './video-viewer'

const { Option } = Select

class StartMenu extends Component {
  handleSubmit = ev => {
    ev.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        if( typeof this.props.handleSubmitLanguage === 'function' ) {
          this.props.handleSubmitLanguage({
            languageCode: values.languageCode,
            targetLanguage: values.targetLanguage
          })
        }
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 4 },
    };

    return (
      <div className="start-menu">
        <div>
        { (!this.props.languageCode && ! this.props.targetLanguage ) ? (
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item
              label="Your language"
              hasFeedback
            >
              {getFieldDecorator('languageCode', {
                rules: [
                  { required: true, message: 'Please select your language' },
                ],
              })(
                <Select placeholder="Select your language">
                  <Option value="ja-JP">Japanese</Option>
                  <Option value="en-US">English(USA)</Option>
                  <Option value="en-SG">English(Singapore)</Option>
                  <Option value="th-TH">Thai</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item
              label="Translation language"
              hasFeedback
            >
              {getFieldDecorator('targetLanguage', {
                rules: [
                  { required: true, message: 'Please select translation language' },
                ],
              })(
                <Select placeholder="Select translation language">
                  <Option value="en">English</Option>
                  <Option value="ja">Japanese</Option>
                  <Option value="th">Thai</Option>
                </Select>
              )}
            </Form.Item>
  
            <Form.Item
              wrapperCol={{ span: 12, offset: 6 }}
            >
            <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
          </Form>
          ): ''}
        </div>
        <div style={{ position: "relative" }}>
          { ( this.props.languageCode && this.props.targetLanguage )? (
            <div>
              <List style={{ paddingLeft: 10}}>
                <List.Item>Your language: {this.props.languageCode}</List.Item>
                <List.Item>Translation: {this.props.targetLanguage}</List.Item>
              </List>
    

              <VideoViewer { ...this.props } />
            </div>
          ): ''}
          { this.props.localId !=='' ? (
            <TranslateResult style={{ 
              position: "absolute", 
              left:25, 
              top:200, 
              zIndex: 1000 
            }} {...this.props} />
          ) : ''}
        </div>
      </div>
    )
  }
}

const WrappedStartMenu = Form.create()(StartMenu)
export default WrappedStartMenu