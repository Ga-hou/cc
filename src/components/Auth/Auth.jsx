import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getToken } from "../../utils/token";
import { setUserInfo } from "../../store/userInfo/action";
import { services } from "../../services";
function Auth(props) {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const storageToken = getToken();
  const { token } = useSelector(e => e.userInfo);
  React.useEffect(() => {
    if (location.pathname !== "/login") {
      services("user/profile")
        .then(res => {
          dispatch(
            setUserInfo({
              username: res.data.user.username,
              userRoles:
                res.data.user.userRoles.length !== 0
                  ? res.data.user.userRoles[0]
                  : []
            })
          );
        })
        .catch(e => e);
    }
  }, [location.pathname]);

  React.useEffect(() => {
    if (storageToken) {
      history.push("/online");
    }
  }, []);

  return props.children({
    auth: token || storageToken
  });
}

export default Auth;
