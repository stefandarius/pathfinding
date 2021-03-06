import React, {useState} from 'react';

const AppContext = React.createContext({});

export const Provider = ({children}) => {
    const [matrix, setMatrix] = useState([]);
    const [start, setStart] = useState(null);
    const [target, setTarget] = useState(null);

    return (
        <AppContext.Provider value={{value1: [matrix, setMatrix], value2: [start, setStart], value3: [target, setTarget]}}>
            {children}
        </AppContext.Provider>
    )
};

export default AppContext;