import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Triangle } from "react-loader-spinner";

function MainPage() {
  const navigate = useNavigate();
  const sessionData = JSON.parse(localStorage.getItem("sessionData"));

  useEffect(() => {
    if (sessionData) {
      navigate("/processes");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <LoadingContainer>
        <Triangle
          height="80"
          width="80"
          color="#ffffff"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </LoadingContainer>
    </>
  );
}

export default MainPage;

const LoadingContainer = styled.div`
  background-color: #222831;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 100%;
  position: absolute;
`;
