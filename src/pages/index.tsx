import { UserData } from "components/user-data";
import React from "react";

import GlobalStyle from "styles/globalStyles";

const Home: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <UserData/>
    </>
  );
};
export default Home;
