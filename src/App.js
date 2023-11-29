import './App.css';
import { useState } from 'react';
import MainRoutes from './routes/MainRoutes';
import RootContextWrapper from './components/RootContextWrapper/RootContextWrapper';
import AuthContext from './context/AuthContext/AuthContext';

const App = props => {
  const mainRoutes = <MainRoutes {...props} />;
  const [state, setState] = useState({});

  const setGlobal = (index, newData) => {
    const { [index]: oldData } = state;
    if (oldData !== newData) {
      setState({
        ...state,
        [index]: newData
      });
    }
  }

  const authContextValue = {
    ...state,
    setGlobal: setGlobal
  };
  
  return (
    <AuthContext.Provider value={authContextValue}>
      <RootContextWrapper>
        {mainRoutes}
      </RootContextWrapper>
    </AuthContext.Provider>
  );
}

export default App;