import React, { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const MailForm = () => {
  const [toEmail, setToEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

 

  const sendEmail = async (event) => {
    event.preventDefault();

    if (!handleValidation()) {
      return;
    }

    const emailData = {
      toEmail: toEmail,
      subject: subject,
      body: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
    };
    const firebaseConfig = {
      apiKey: "AIzaSyA0bGi99jsP2N_5DpKxo3k1PBVQ3c_Oa7g",
      authDomain: "mail-box-9d6c8.firebaseapp.com",
      databaseURL: "https://mail-box-9d6c8-default-rtdb.firebaseio.com/",
    };

    const firebaseApp = initializeApp(firebaseConfig);
    const database = getDatabase(firebaseApp);

    try {
      const response = await push(ref(database, "emails"), emailData);
      console.log("Email sent successfully!", response);
    } catch (error) {
      console.log("Error sending email:", error);
    }

    // Handle email sending logic here
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
    <div className="d-flex justify-content-center">
      <div className="panel panel-default">
        <div className="panel-body message">
          <p className="text-center bold">New Mail</p>
          <form className="form-horizontal" role="form" onSubmit={sendEmail}>
            <div className="form-group">
              <label htmlFor="to" className="col-sm-1 control-label">
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
              <label htmlFor="subject" className="col-sm-1 control-label">
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
