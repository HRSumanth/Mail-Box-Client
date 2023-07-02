import React from 'react';
import Card from '../Layout/Card';
import { useSelector } from 'react-redux';

function Inbox() {
  const sentEmails = useSelector((state) => Object.entries(state.email.sent));
  console.log(sentEmails)
  return (
    <div className='distance-manager'>
      <h2 className='fs-1 text-decoration-underline mb-5  ms-3 mt-3'>Inbox</h2>
     <div style={{height: "30rem",overflow: "auto"}}>
     {sentEmails.map((item) => (
        <Card
          id={item[0]}
          key={item[0]}
          from={item[1].toEmail}
          subject={item[1].subject}
          bodyHTML={item[1].body}
          isRead={item[1].isRead}
          action={'Delete'}
        />
      ))}
     </div>
      
    </div>
  );
}

export default Inbox;
