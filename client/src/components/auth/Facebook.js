import React, { useState } from "react";
import FacebookLogin from "react-facebook-login";

const Facebook = () => {
  const [userData, setUserData] = useState({
    isLoggedIn: false,
    userID: "",
    name: "",
    email: "",
    picture: "",
  });

  let fbContent;

  const { isLoggedIn } = userData;

  const componentClicked = () => {
      console.log("clicked")
  }

  const responseFacebook = (response) => {
      setUserData({
        isLoggedIn:true,
        userID:response.userID,
        name:response.name,
        email:response.email,
        picture:response.picture.data.url
      })
  }

  if (isLoggedIn) {
      fbContent = null;
  } else {
    fbContent = (
      <FacebookLogin
        appId="295992234734931"
        autoLoad={true}
        fields="name,email,picture"
        onClick={componentClicked}
        callback={responseFacebook}
      />
    );
  }

return <div>{fbContent}</div>;
};

export default Facebook;
