import React from 'react';
import Header from "./components/UI/header/Header";
import Matrix from "./components/grid/Matrix";
import {Provider} from "./context/Context";

const App = () => (
    <Provider>
        <div draggable={false}>
            <Header/>
            <Matrix rows={25} cols={50}/>
        </div>
    </Provider>
);

export default App;
