import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { Triangle } from "react-loader-spinner";
import { backUrl, headerConfig } from "../utils/constants";

import TopBar from "../components/TopBar";
import NewRegisterForm from "../components/NewRegisterForm";
import ProcessCard from "../components/ProcessCard";

function ProcessesPage() {
  const [processes, setProcesses] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const sessionData = JSON.parse(localStorage.getItem("sessionData"));
  useEffect(() => {
    const config = headerConfig(sessionData?.token);
    const promisse = axios.get(`${backUrl}processes`, config);
    promisse.then(getProcessesSuccess);
    promisse.catch(getProcessesFail);
    function getProcessesSuccess(res) {
      setProcesses(res.data);
      setIsLoading(false);
    }
    function getProcessesFail(error) {
      console.log(error.response.data);
      navigate("/login");
    }
  }, []);

  const [showNewRegisterForm, setShowNewRegisterForm] = useState(false);
  const [showNewRegisterButton, setShowNewRegisterButton] = useState(true);

  function verifyShowNewRegisterForm() {
    if (showNewRegisterForm) {
      return (
        <NewRegisterForm
          setShowNewRegisterForm={setShowNewRegisterForm}
          setShowNewRegisterButton={setShowNewRegisterButton}
          setProcesses={setProcesses}
        ></NewRegisterForm>
      );
    }
  }

  function verifyShowNewRegisterButton() {
    if (showNewRegisterButton) {
      return (
        <NewRegisterButton
          onClick={() => {
            setShowNewRegisterForm(true);
            setShowNewRegisterButton(false);
          }}
        >
          Novo Processo
        </NewRegisterButton>
      );
    }
  }

  function verifyProcessesList() {
    if (processes.length === 0) {
      return (
        <>
          <TopBar></TopBar>
          <BodyContainer>
            <EmptyContainer>Não há processos cadastrados!</EmptyContainer>
            {verifyShowNewRegisterButton()}
            {verifyShowNewRegisterForm()}
          </BodyContainer>
        </>
      );
    } else {
      return (
        <>
          <TopBar></TopBar>
          <BodyContainer>
            <TitleLine>Processos & Prazos</TitleLine>
            {verifyShowNewRegisterButton()}
            {verifyShowNewRegisterForm()}
            <ProcessesCardsContainer>
              {processes.map((process) => (
                <ProcessCard
                  key={process.id}
                  processId={process.id}
                  processNumber={process.processNumber}
                  task={process.task}
                  deadline={process.deadline}
                  priorityLevel={process.priorityLevel}
                  setProcesses={setProcesses}
                ></ProcessCard>
              ))}
            </ProcessesCardsContainer>
          </BodyContainer>
        </>
      );
    }
  }

  return (
    <>
      {isLoading ? (
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
      ) : (
        verifyProcessesList()
      )}
    </>
  );
}

export default ProcessesPage;

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

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
`;

const EmptyContainer = styled.div`
  font-family: "Roboto";
  font-weight: 200;
  font-size: 28px;
  color: #393e46;
  margin-bottom: 30px;
  @media (max-width: 600px) {
    font-size: 20px;
  }
`;

const TitleLine = styled.div`
  font-family: "Roboto";
  font-weight: 400;
  font-size: 36px;
  color: #393e46;
  margin-bottom: 30px;
`;

const ProcessesCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 20px;
`;

const NewRegisterButton = styled.div`
  height: 50px;
  width: 180px;
  background-color: #11823b;
  color: #ffffff;
  font-family: "Roboto";
  font-size: 18px;
  font-weight: 500;
  border: 1px solid #11823b;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    cursor: pointer;
  }
`;
