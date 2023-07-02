import React from 'react';

import { useSelector } from 'react-redux';
import Card from '../components/Layout/Card';

function DeletedMail() {
  const recyledEmails = useSelector((state) => Object.entries(state.email.delatedMails));

  return (
    <div className='distance-manager'>
      <h2 className='fs-1 text-decoration-underline mb-5  ms-3 mt-3'>Delated Mails</h2>

      {recyledEmails.map((item) => {
        // console.log(item[1]);
        return (
          <Card
            id={item[0]}
            key={item[0]}
            from={item[1].toEmail}
            to={item[1].from}
            subject={item[1].subject}
            bodyHTML={item[1].body}
            isRead={item[1].isRead}
            action={'Delete'}
          />
        );
      })}
    </div>
  );
}

export default DeletedMail;
