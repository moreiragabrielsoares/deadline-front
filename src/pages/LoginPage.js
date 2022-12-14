import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { Triangle } from "react-loader-spinner";
import { backUrl } from "../utils/constants";

function LoginPage() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [isFormDisabled, setIsFormDisabled] = useState(false);

  const navigate = useNavigate();

  function register(event) {
    event.preventDefault();
    setIsFormDisabled(true);

    const loginObj = {
      email: userEmail,
      password: userPassword,
    };

    const request = axios.post(`${backUrl}login`, loginObj);

    request.then(loginSuccess);
    request.catch(loginFail);

    function loginSuccess(res) {
      const { token } = res.data;
      const sessionData = { token };
      localStorage.setItem("sessionData", JSON.stringify(sessionData));
      navigate("/");
    }

    function loginFail(error) {
      setIsFormDisabled(false);
      setUserEmail("");
      setUserPassword("");
      alert(error.response.data);
    }
  }

  return (
    <FrontPageBackground>
      <Container>
        <LogoLine>DEADLINE</LogoLine>

        <Form onSubmit={register}>
          <FormInput
            id="userEmail"
            placeholder="E-mail"
            onChange={(e) => setUserEmail(e.target.value)}
            value={userEmail}
            type="email"
            required
            disabled={isFormDisabled}
          />
          <FormInput
            id="userPassword"
            placeholder="Senha"
            onChange={(e) => setUserPassword(e.target.value)}
            value={userPassword}
            type="password"
            required
            disabled={isFormDisabled}
          />

          {isFormDisabled ? (
            <FormButton type="submit" disabled={isFormDisabled}>
              <Triangle
                height="30"
                width="50"
                color="#ffffff"
                ariaLabel="triangle-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
            </FormButton>
          ) : (
            <FormButton type="submit" disabled={isFormDisabled}>
              Entrar
            </FormButton>
          )}
        </Form>

        <Link to="/signup" style={{ textDecoration: "none" }}>
          <SignUpLine>Ainda n??o tem uma conta? Cadastre-se agora!</SignUpLine>
        </Link>
      </Container>
    </FrontPageBackground>
  );
}

export default LoginPage;

const FrontPageBackground = styled.div`
  background-color: #222831;
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Container = styled.div`
  background-color: #222831;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto 0;
`;

const LogoLine = styled.div`
  font-family: "Montserrat";
  font-weight: 200;
  font-size: 46px;
  color: #ffffff;
  margin-bottom: 45px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormInput = styled.input`
  width: 326px;
  height: 58px;
  border: 1px solid #d5d5d5;
  background: #ffffff;
  border-radius: 5px;
  margin-bottom: 13px;
  font-size: 16px;
  padding-left: 15px;
  ::placeholder {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 200;
    font-size: 16px;
    color: #000000;
  }

  :disabled {
    opacity: 0.6;
  }
`;

const FormButton = styled.button`
  width: 326px;
  height: 46px;
  background-color: #393e46;
  border-radius: 5px;
  border: 1px solid #393e46;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;

  :disabled {
    opacity: 0.6;
  }

  :hover {
    cursor: pointer;
  }
`;

const SignUpLine = styled.div`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  color: #ffffff;
  margin-top: 25px;
  :hover {
    cursor: pointer;
  }
`;
