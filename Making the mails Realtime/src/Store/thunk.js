import { emailActions } from "./EmailReducer";
import { authActions } from "./AuthReducer";

export const emailThunk = (inputDetails) => {
  return async (dispatch) => {
    let useremail = localStorage.getItem("email");
    useremail = useremail.replace("@", "").replace(".", "");

    try {
      const response = await fetch(
        `https://mail-box-9d6c8-default-rtdb.firebaseio.com/${useremail}/sent.json`,
        {
          method: "POST",
          body: JSON.stringify(inputDetails),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("failed");
      } else {
        const res = await response.json();
        alert("Mail Sent Successfully")

        const temp = {
          id: res.name,
          inputDetails,
        };
        dispatch(emailActions.sentEmailHandler(temp));
      }
    } catch (err) {
      alert(err);
    }
  };
};

export const fetchData = () => {
  let useremail = localStorage.getItem("email");
  useremail = useremail.replace("@", "").replace(".", "");

  return async (dispatch) => {
    const getData = async () => {
      const response = await fetch(
        `https://mail-box-9d6c8-default-rtdb.firebaseio.com/${useremail}.json`
      );
      if (!response.ok) {
        throw new Error("not able to get data");
      }
      const data = await response.json();
      return data;
    };

    try {
      const receivedData = await getData();

      dispatch(emailActions.replaceHandler(receivedData ));
      dispatch(emailActions.updateMailData(receivedData ));
    } catch (error) {
      alert(error);
    }
  };
};

export const updateData = (userData) => {
  return async (dispatch) => {
    let useremail = localStorage.getItem("email");

    try {
      if (useremail) {
        useremail = useremail?.replace("@", "").replace(".", "");

        const response = await fetch(
          `https://mail-box-9d6c8-default-rtdb.firebaseio.com/${useremail}.json`,
          {
            method: "PUT",
            body: JSON.stringify(userData),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("failed");
        }
      }
    } catch (err) {
      alert(err);
    }
  };
};
























export const authenticateUser = (data) => {
  return async (dispatch) => {
    const sendUserData = async () => {
      let url;
      if (!data.signIn) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA0bGi99jsP2N_5DpKxo3k1PBVQ3c_Oa7g";
         console.log("log")
      
        } else {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA0bGi99jsP2N_5DpKxo3k1PBVQ3c_Oa7g";
          console.log("sign")
        }

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: data.inputEmail,
          password: data.inputPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("authentication failed");
      }
      const res = await response.json();
      return res;
    };

    try {
      const userData = await sendUserData();
       console.log(userData);
      dispatch(
        authActions.login({
          email: userData.email,
          token: userData.idToken,
        })
      );
      //   dispatch(
      //     notifyActions.display({
      //       message: "Authentication Successful",
      //       status: "success",
      //     })
      //   );
    } catch (err) {
      alert(err);
      //   dispatch(
      //     notifyActions.display({
      //       message: "Authentication Failed",
      //       status: "Failed",
      //     })
      //   );
    }
  };
};

// export default authenticateUser;

