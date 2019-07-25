import React from 'react'
import { Icon, Layout, Row, Col } from 'antd'
import StartMenuContainer from '../containers/start-menu'
import TranslateResultsContainer from '../containers/translate-results'

const { Header } = Layout

const RootLayout = () => {
  const hideTranslate = window.location.search.indexOf("translate=off") > 0
  return (
    <div className="root-layout">
      <Layout style={{ position: "relative", height: "100%", minHeight: "100%"}}>
        <Header style={{ postion: "fixed", top: "0", width: "100%", height: "64px", overflow: "hidden", background: "#1890ff"}}>
          <h1 style={{color: "#fff", fontSize: "2em"}}>M-PIPE demo : <Icon type="message" /> Speech to Text</h1>
        </Header>
        <Row gutter={8} style={{ position: "fixed", top: "64px", bottom: "0", width: "100%", overflow: "hidden"}}>
          <Col span={16} style={{background: "#fff"}}>
            <StartMenuContainer hideTranslate={hideTranslate} />
          </Col>
          <Col span={8} style={{background: "#fff"}}>
            <TranslateResultsContainer hideTranslate={hideTranslate} />
          </Col>
        </Row>
      </Layout>
    </div>
  )
}

export default RootLayout