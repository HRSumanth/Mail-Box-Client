import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../components/Layout/Card';

function MailSent() {
  const sentEmails = useSelector((state) => Object.entries(state.email.sent));

  return (
    <div className='distance-manager'>
      <h2 className='fs-1 text-decoration-underline mb-5 ms-3 mt-3'>Mail Sent</h2>

      {sentEmails.map((item) => (
        <Card
          id={item[0]}
          key={item[0]}
          to={item[1].toEmail}
          subject={item[1].subject}
          bodyHTML={item[1].body}
          action={'Delete'}
        />
      ))}
    </div>
  );
}

export default MailSent;
