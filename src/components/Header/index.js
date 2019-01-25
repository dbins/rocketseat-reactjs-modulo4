import React from "react";
import { Container, Search, User } from "./styles";

const Header = () => (
  <Container>
    <Search>
      <input placeholder="Search" />
    </Search>
    <User>
      <img
        src="https://www.hojeemdia.com.br/polopoly_fs/1.21564!/image/image.jpg_gen/derivatives/landscape_653/image.jpg"
        alt="Avatar"
      />
      Bins
    </User>
  </Container>
);

export default Header;
