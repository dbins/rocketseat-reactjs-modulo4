import React, { Fragment, Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./config/reactotron";
import GlobalStyle from "./styles/global";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";
import Header from "./components/Header";
import ErrorBox from "./components/ErrorBox";
import Routes from "./routes";
//import store from "./store";
//Persist
import { store, persistor } from "./store";
import { Wrapper, Container, Content } from "./styles/components";
//Persist
import { PersistGate } from "redux-persist/integration/react";
//BrowserRouter - Permite que todos os components abaixo dele tenham acesso as informações enviadas pela URL
const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Wrapper>
          <GlobalStyle />
          <Container>
            <Sidebar />
            <Content>
              <ErrorBox />
              <Header />
              <Routes />
            </Content>
          </Container>
          <Player />
        </Wrapper>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

export default App;
