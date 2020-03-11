import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getToken } from "../../utils/token";
import { setUserInfo } from "../../store/userInfo/action";
import { services } from "../../services";
function Auth(props) {
  const dispatch = useDispatch();
  const storageToken = getToken();
  const { token } = useSelector(e => e.userInfo);
  React.useEffect(() => {
    getToken() &&
      services("user/profile")
        .then(res => {
          dispatch(
            setUserInfo({
              id: res.data.user.id,
              account: res.data.user.account,
              username: res.data.user.username,
              roleId: res.data.user.roleId
            })
          );
        })
        .catch(e => e);
  }, []);

  return props.children({
    auth: token || storageToken
  });
}

export default Auth;
