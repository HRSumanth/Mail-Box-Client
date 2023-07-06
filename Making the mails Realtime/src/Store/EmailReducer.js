import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sent: {},
  inbox : {},
  initialRender:false,
  delatedMails: {},
};
export const emailSlice = createSlice({
  name: "mails",
  initialState: initialState,
  reducers: {
    sentEmailHandler(state, action) {
      // state.sent[action.payload.id] = action.payload.inputDetails;
      const newmail=action.payload.inputDetails;
      state.sent = {newmail, ...state.sent};
    },
    addToRecycleBin(state, action) {
      state.delatedMails[action.payload] =state.sent[action.payload]
    },
    replaceHandler(state, action) {
      state.initialRender=true;
      if (action.payload) {
        state.sent = action.payload.sent;
        state.inbox = action.payload.sent;
        state.delatedMails = action.payload.delatedMails || {};
      }
    },
    updateMailData: (state, action) => {
      if (state.initialRender){
        const newMails = action.payload;
      if (state.inbox.length < newMails.length){
        alert("New Mail Received")
      }
    }
    },
    deleteMail(state, action) {
      if (state.sent[action.payload]) {
        delete state.sent[action.payload];
        delete state.inbox[action.payload];
      } else if (state.delatedMails[action.payload]){
        delete state.delatedMails[action.payload];
      }
    },
    readEmailHandler(state, action) {
      state.sent[action.payload].isRead = true;
    },
  },
});
export const emailActions = emailSlice.actions;
export default emailSlice;

// import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    modalShown: false,
    to: "",
    subject: "",
    bodyHTML: "",
    id: "",
    from: "",
  },
  reducers: {
    modalHandler(state) {
      state.modalShown = !state.modalShown;
    },
    emailDataToShow(state, action) {
      state.to = action.payload.to;
      state.subject = action.payload.subject;
      state.bodyHTML = action.payload.bodyHTML;
      state.id = action.payload.id;
      state.from = action.payload.from;
    },

  },
});

export const modalActions = modalSlice.actions;



// import { createSlice } from "@reduxjs/toolkit";

export const notifySlice = createSlice({
  name: "notification",
  initialState: { displayNotification: false, message: "", status: "" },
  reducers: {
    display(state, action) {
      state.displayNotification = true;
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
    hideDisplay(state) {
      state.displayNotification = false;
      state.message = "";
      state.status = "";
    },
  },
});

export const notifyActions = notifySlice.actions;



