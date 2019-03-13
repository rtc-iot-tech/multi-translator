import React from 'react'
import { Layout } from 'antd'
import StartMenuContainer from '../containers/start-menu'
import TranslateResultsContainer from '../containers/translate-results'

const { Header, Footer, Sider, Content } = Layout

const RootLayout = () => {
  return (
    <div className="root-layout">
      <Layout style={{ position: "relative", height: "100%", minHeight: "100%"}}>
        <Header>header</Header>
        <Layout style={{ position: "fixed", top: "64px", bottom: "69px", width: "100%", overflow: "hidden"}}>
          <Content>
            <StartMenuContainer />
          </Content>
          <Sider>
            <TranslateResultsContainer />
          </Sider>
        </Layout>
        <Footer style={{ position: "fixed", bottom: 0, width: "100%"}}>footer</Footer>
      </Layout>
    </div>
  )
}

export default RootLayout