import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { message } from "antd";
import { setUserInfo } from "../../store/userInfo/action";
import { services } from "../../services";
function Auth(props) {
  const dispatch = useDispatch();
  const { access_token } = useSelector(e => e.userInfo);
  const token = window.localStorage.getItem("access_token") || "";
  React.useEffect(() => {
    if (token) {
      services("auth/profile")
        .then(res => {
          dispatch(
            setUserInfo({
              username: res.username
            })
          );
        })
        .catch(e => {
          message.error(e.error);
        });
    }
  }, [token]);

  return props.children({
    auth: access_token || token
  });
}

export default Auth;
