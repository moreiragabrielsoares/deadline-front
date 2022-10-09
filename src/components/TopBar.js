import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

function TopBar() {
  const navigate = useNavigate();

  function logoutUser() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <TopBarContainer>
      <LogoContainer>DEADLINE</LogoContainer>
      <LogoutIcon>
        <FiLogOut
          size={"1.5em"}
          color={"#ffffff"}
          style={{ cursor: "pointer" }}
          onClick={() => logoutUser()}
        ></FiLogOut>
      </LogoutIcon>
    </TopBarContainer>
  );
}

export default TopBar;

const TopBarContainer = styled.div`
  background-color: #222831;
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 25px;
  position: fixed;
  top: 0;
  left: 0;
`;

const LogoContainer = styled.div`
  font-family: "Montserrat";
  font-weight: 200;
  font-size: 24px;
  color: #ffffff;
  @media (max-width: 600px) {
    font-size: 20px;
  }
`;

const LogoutIcon = styled.div`
  margin-left: auto;
  margin-right: 10px;
`;
