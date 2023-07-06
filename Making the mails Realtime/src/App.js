import { Routes, Route } from 'react-router-dom';
import Inbox from './components/MailForm/InboxPage';
import AuthPage from './pages/AuthPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import MailForm from './components/MailForm/MailForm';
import { fetchData, updateData } from './Store/thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Fragment, useEffect } from 'react';
import MailSent from './pages/MailSent';
import DeletedMail from './pages/DeletedMail'
import { createPortal } from 'react-dom';
import './App.css'
import SideBar from './pages/SideBar';
import { Navigate } from 'react-router-dom';
import EmailDetails from './pages/MailDetails';

function App() {
  const dispatch = useDispatch();

  const authentication = useSelector((state) => state.auth.isAuthenticated);
  const userData = useSelector((state) => state.email);
  console.log(userData)

  // useEffect(() => {
  //   if (authentication) {
  //     dispatch(fetchData());
  //   }
  // }, [authentication]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchData());
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [authentication]);

  useEffect(() => {
    dispatch(updateData(userData));
    console.log("bhjdshah")
  }, [userData.sent, userData.delatedMails]);

  return (
    <Fragment>
      <Router>
        <div className={authentication? "app-container":""}>
          {authentication && <SideBar />}
          <div className={authentication? "content-container":""}>
          {createPortal(<EmailDetails />, document.getElementById('emailroot'))}
            <Routes>
              {!authentication && <Route path='/auth' element={<AuthPage />} />}
              {authentication && <Route path='/' element={<Inbox />} />}
              {authentication && <Route path='/newemail' element={<MailForm />} />}  
              {authentication && <Route path='/mailsent' element={<MailSent />} />} 
             {authentication && <Route path='/delated' element={<DeletedMail />} />} 
          {authentication && <Route path='*' element={<Navigate to='/' />} />}
          <Route path='*' element={<Navigate to='/auth' />} /> 
            </Routes>
          </div>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
