import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { modalActions } from '../Store/EmailReducer';

function EmailDetails() {
  const displayModal = useSelector((state) => state.modal);
  const modalData = useSelector((state) => state.modal);

  const dispatch = useDispatch();

  useEffect(() => {
    if (modalData.bodyHTML) {
      const editor = document.querySelector('.editor');
      editor.innerHTML = modalData.bodyHTML;

    }
  }, [modalData.bodyHTML]);

  const hideModalHandler = () => {
    dispatch(modalActions.modalHandler());
  };

  return (
    <>
      <Modal
        show={displayModal.modalShown}
        onHide={hideModalHandler}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Body>
          {modalData.to && (
            <div className='mb-4 fs-5'>
              <span className='fw-bolder me-3'>To:</span>
              {modalData.to}
            </div>
          )}
          {modalData.from && (
            <div className='mb-4 fs-5'>
              <span className='fw-bolder me-3'>From:</span>
              {modalData.from}
            </div>
          )}

          <div className='mb-4 fs-5'>
            <span className='fw-bolder me-3'>Subject:</span>
            {modalData.subject}
          </div>
          <div>
            <div className='mb-5' style={{ width: 750, height: 200 }}>
              <div className='editor'>
                {modalData.Body}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={hideModalHandler}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EmailDetails;
