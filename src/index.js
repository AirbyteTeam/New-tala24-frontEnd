import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import "./index.css";
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from "@material-tailwind/react";
if (module.hot) module.hot.accept()
ReactDOM.render(
    <ThemeProvider><App /></ThemeProvider>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();