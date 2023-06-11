import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { registerMicroApps, start, initGlobalState } from "qiankun";

// 通信模块开始
const state = {
  name: "Nick",
};

// 初始化 state
const actions = initGlobalState(state);

actions.onGlobalStateChange((state, prev) => {
  // state: 变更后的状态; prev 变更前的状态
  console.log(state, prev);
});

setTimeout(() => {
  actions.setGlobalState({ ...state, age: 34 });
}, 2000);
actions.offGlobalStateChange();
// 通信模块结束

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

registerMicroApps([
  {
    name: "micro-app1", // app name registered
    entry: "//localhost:3020",
    container: "#micro-app1",
    activeRule: "/micro-app1",
    props: {
      niceBody: "jack",
      age: 32,
    },
  },
]);

// 沙箱机制实现样式隔离
start({
  sandbox: { experimentalStyleIsolation: true },
});
