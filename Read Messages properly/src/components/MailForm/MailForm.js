import React, { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { emailThunk } from "../../Store/thunk";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch } from "react-redux";

const MailForm = () => {
  const [toEmail, setToEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const dispatch = useDispatch()

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

 

  const sendEmail = async (event) => {
    event.preventDefault();

    if (!handleValidation()) {
      return;
    }

const textContent = JSON.parse(JSON.stringify(convertToRaw(editorState.getCurrentContent())));

    const emailData = {
      toEmail: toEmail,
      subject: subject,
      body: textContent.blocks[0].text,
      isRead:false,
    };

    dispatch(emailThunk(emailData));
    console.log("Email data:", emailData);
  };

  const handleValidation = () => {
    if (!toEmail) {
      alert("Please enter a recipient's email address.");
      return false;
    }

    return true;
  };

  return (
    <div className="d-flex justify-content-center mt-3">
      <div className="panel panel-default">
        <div className="panel-body message">
          <p className="text-center " style={{fontWeight:"bold", fontSize:"18px"}}>New Mail</p>
          <form className="form-horizontal" role="form" onSubmit={sendEmail}>
            <div className="form-group">
              <label htmlFor="to" className="col-sm-1 control-label" style={{fontWeight:"bold"}}>
                To:
              </label>
              <div className="col-sm-11">
                <input
                  type="email"
                  className="form-control select2-offscreen"
                  id="to"
                  placeholder="Type email"
                  value={toEmail}
                  onChange={(e) => setToEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="subject" className="col-sm-1 control-label" style={{fontWeight:"bold"}}>
                Subject:
              </label>
              <div className="col-sm-11">
                <input
                  type="text"
                  className="form-control"
                  id="subject"
                  placeholder="Enter subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group mb-3">
              <div
                className="col-sm-11 "
                style={{ height: "300px", border: "solid 1px antiquewhite " }}
              >
                <Editor
                  editorState={editorState}
                  onEditorStateChange={onEditorStateChange}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-1 col-sm-11">
                <button type="submit" className="btn btn-primary">
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MailForm;
