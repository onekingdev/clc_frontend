import React from "react";
import Navigation from './services/navigation';
// @ts-ignore
import { BrowserRouter } from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <Navigation/>
        </BrowserRouter>
    );
}

export default App;