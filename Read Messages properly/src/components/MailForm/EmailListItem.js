import React from 'react';

function EmailListItem({ email }) {
  return (
    <div>
      <h3>{email.sender}</h3>
      <p>{email.subject}</p>
      <p>{email.timestamp}</p>
    </div>
  );
}

export default EmailListItem;
