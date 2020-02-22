import { useSelector } from "react-redux";

function Auth(props) {
  const { access_token } = useSelector(e => e.userInfo);
  return props.children({
    auth: access_token
  });
}

export default Auth;
