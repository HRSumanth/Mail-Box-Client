import React from 'react';
import { useDispatch } from 'react-redux';
import { modalActions } from '../../Store/EmailReducer';
import { emailActions } from '../../Store/EmailReducer';

function Card(props) {
  const dispatch = useDispatch();
 
  const modalDisplayHandler = () => {

    const email = {...props};

    dispatch(modalActions.emailDataToShow(email));
    dispatch(modalActions.modalHandler());
    if (!props.isRead && props.from) {
      dispatch(emailActions.readEmailHandler(props.id));
    }
  };

  const deleteMailHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(emailActions.addToRecycleBin(props.id));
    dispatch(emailActions.deleteMail(props.id));
  };
  return (
    <div className='mt-0' style={{ marginInline: '1rem' }}>
      <div
        className='fs-6 font-monospace p-3 mb-3 bg-secondary text-white position-relative cursor-pointer'
        style={{ paddingRight: '1rem', borderRadius: '10px' }}
        onClick={() => {
          modalDisplayHandler();
        }}
      >
        {!props.isRead && props.from && (
          <span
            style={{ backgroundColor: 'blue', color: 'blue' }}
            className='badge  me-1 rounded-circle'
          >
            .
          </span>
        )}

        <div>
          {props.to && (
            <>
              <span>To: </span> <span>{props.to}</span>
            </>
          )}
          {props.from && (
            <>
              <span>From: </span> <span>{props.from}</span>
            </>
          )}
        </div>
        <div>
          <span>Subject: </span> {props.subject}
        </div>

        <button
          type='button'
          className='btn btn-dark position-absolute'
          style={{ top: '1.5rem', right: '1rem' }}
          onClick={deleteMailHandler}
        >
          {props.action}
        </button>
      </div>
    </div>
  );
}

export default Card;
