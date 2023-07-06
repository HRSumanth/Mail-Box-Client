import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../Store/AuthReducer";
import { EnvelopeFill, CheckCircleFill, Trash } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";

const navItems = [
  {
    to: "/",
    text: "Inbox",
    icon: <EnvelopeFill />,
  },
  {
    to: "/mailsent",
    text: "Mails Sent",
    icon: <CheckCircleFill />,
  },
  {
    to: "/delated",
    text: "Detaled Mail",
    icon: <Trash />,
  },
];

const SideBar = () => {
  const sentEmails = useSelector((state) => Object.entries(state.email.inbox));
  console.log(sentEmails)
  let unread=0; 
  sentEmails.map((item)=>{
    if (!item[1].isRead){
      unread++;
      console.log(unread)
    }
  })
  const dispatch = useDispatch();
  const navigate = useNavigate()

  function logoutHandler() {
    dispatch(authActions.logout());
    navigate('./auth')
  }

  return (
    <div
      className="sidebar"
      style={{
        width: "15rem",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.8)",
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
      }}
    >
      <div className="flex-column">
        <ul className="list-unstyled text-white">
        <div className='container p-3 mt-3 bg-dark text-center'>
              <h4>Mail Box Client</h4>
          </div>
          <Link  to="/newemail">
            <button className="col-sm-9 rounded-pill" style={{marginLeft:"30px",fontWeight:"bolder"}}>New Email</button>
            </Link>
          
          {navItems.map((item) => (
            <li key={Math.random()}>
              <Link to={item.to} className="text-white px-4 mt-5" style={{fontWeight:"bolder",textDecoration:"none"}}>
                <span className="me-2">{item.icon}</span>
                {item.text}
                {item.text =="Inbox" && <span className="me-2" style={{marginLeft:"30px"}}>{unread}</span>}
              </Link>
            </li>
          ))}
          <li>
              <button onClick={logoutHandler} style={{marginLeft:"30px", marginTop:"50px", fontWeight:"bold"}}>Logout</button>
            </li>
        </ul>
      </div>

      
    </div>
  );
};

export default SideBar;
