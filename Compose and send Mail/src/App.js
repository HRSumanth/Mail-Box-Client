import { Routes, Route} from 'react-router-dom';

import Layout from './components/Layout/Layout';
import AuthPage from './pages/AuthPage';
import MailForm from './components/MailForm/MailForm';
import { BrowserRouter as Router } from 'react-router-dom';
import {AuthContextProvider} from './Store/AuthContext'
import AuthContext from './Store/AuthContext';
import { useContext } from 'react';

function App() {
  const {isLoggedIn} = useContext(AuthContext)
  return (
  <AuthContextProvider>
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<MailForm />} />
        {!isLoggedIn && <Route path='/auth' element={<AuthPage />} />}
        </Routes>
      </Layout>
    </Router>
    </AuthContextProvider>
  );
}

export default App;
