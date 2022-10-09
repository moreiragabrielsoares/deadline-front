import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Triangle } from "react-loader-spinner";
import { backUrl, headerConfig } from "../utils/constants";

function NewRegisterForm({
  setShowNewRegisterForm,
  setShowNewRegisterButton,
  setProcesses,
}) {
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const navigate = useNavigate();

  const [isSelected, setIsSelected] = useState({
    veryCritical: false,
    critical: false,
    normal: false,
    low: false,
  });
  //Object to correlate priority levels to priorityId
  const priorityCorrelation = {
    veryCritical: 1,
    critical: 2,
    normal: 3,
    low: 4,
  };
  const priorityOptions = ["veryCritical", "critical", "normal", "low"];

  const [prioritySelected, setPrioritySelected] = useState(null);

  function selectPriorityButton(priority) {
    for (let i = 0; i < priorityOptions.length; i++) {
      if (priority === priorityOptions[i]) {
        setIsSelected((prevState) => ({
          ...prevState,
          [priority]: true,
        }));
      } else {
        setIsSelected((prevState) => ({
          ...prevState,
          [priorityOptions[i]]: false,
        }));
      }
    }
    setPrioritySelected(priorityCorrelation[priority]);
  }

  const [processNumber, setProcessNumber] = useState("");
  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState(null);

  function registerNewProcess() {
    if (processNumber && task && deadline && prioritySelected) {
      setIsFormDisabled(true);
      const sessionData = JSON.parse(localStorage.getItem("sessionData"));
      const config = headerConfig(sessionData?.token);
      const newProcess = {
        processNumber,
        task,
        deadline: deadline.toISOString().split("T")[0],
        priorityId: prioritySelected,
      };

      const request = axios.post(`${backUrl}processes`, newProcess, config);

      request.then(registerSuccess);
      request.catch(registerFail);
    } else {
      alert("Todos os campos devem ser preenchidos!");
    }
  }

  function registerSuccess() {
    navigate("/processes");
    const sessionData = JSON.parse(localStorage.getItem("sessionData"));
    const config = headerConfig(sessionData?.token);
    const promisse = axios.get(`${backUrl}processes`, config);
    promisse.then(getProcessesSuccess);
    promisse.catch(getProcessesFail);
    function getProcessesSuccess(res) {
      setProcesses(res.data);
      setShowNewRegisterForm(false);
      setShowNewRegisterButton(true);
      setIsFormDisabled(false);
    }
    function getProcessesFail(error) {
      console.log(error.response.data);
      navigate("/login");
    }
  }

  function registerFail(error) {
    setIsFormDisabled(false);
    setProcessNumber("");
    setTask("");
    setPrioritySelected(null);
    setDeadline(null);
    setIsSelected({
      veryCritical: false,
      critical: false,
      normal: false,
      low: false,
    });
    alert(error.response.data);
  }

  function returnButton() {
    setShowNewRegisterForm(false);
    setShowNewRegisterButton(true);
  }

  function verifyIsFormDisabled() {
    if (isFormDisabled) {
      return (
        <WaitingContainer>
          <Triangle
            height="80"
            width="80"
            color="#ffffff"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </WaitingContainer>
      );
    } else {
      return (
        <NewRegisterContainer
          style={
            isFormDisabled ? { pointerEvents: "none", opacity: "0.6" } : {}
          }
        >
          <InputContainer>
            <Label> Número do Processo:</Label>
            <Input
              onChange={(e) => setProcessNumber(e.target.value)}
              value={processNumber}
            ></Input>
          </InputContainer>
          <InputContainer>
            <Label> Tarefa:</Label>
            <Input
              onChange={(e) => setTask(e.target.value)}
              value={task}
            ></Input>
          </InputContainer>
          <InputContainer>
            <Label> Prazo:</Label>

            <DatePicker
              selected={deadline}
              dateFormat="dd/MM/yyyy"
              onChange={(date) => setDeadline(date)}
              customInput={<Input />}
            />
          </InputContainer>
          <InputContainer>
            <Label> Prioridade:</Label>
            <PriorityButtonsContainer>
              <PriorityButton
                priorityLevel="veryCritical"
                isSelected={isSelected.veryCritical}
                onClick={() => selectPriorityButton("veryCritical")}
              >
                <PrioritySpan>Muito Alta</PrioritySpan>
              </PriorityButton>
              <PriorityButton
                priorityLevel="critical"
                isSelected={isSelected.critical}
                onClick={() => selectPriorityButton("critical")}
              >
                <PrioritySpan>Alta</PrioritySpan>
              </PriorityButton>
              <PriorityButton
                priorityLevel="normal"
                isSelected={isSelected.normal}
                onClick={() => selectPriorityButton("normal")}
              >
                <PrioritySpan>Normal</PrioritySpan>
              </PriorityButton>
              <PriorityButton
                priorityLevel="low"
                isSelected={isSelected.low}
                onClick={() => selectPriorityButton("low")}
              >
                <PrioritySpan>Baixa</PrioritySpan>
              </PriorityButton>
            </PriorityButtonsContainer>
          </InputContainer>
          <RegisterButton onClick={() => registerNewProcess()}>
            Registrar
          </RegisterButton>
          <ReturnButton onClick={() => returnButton()}>Voltar</ReturnButton>
        </NewRegisterContainer>
      );
    }
  }

  return <>{verifyIsFormDisabled()}</>;
}

export default NewRegisterForm;

const NewRegisterContainer = styled.div`
  height: 390px;
  width: 320px;
  background-color: #8ae287;
  border: 1px solid #8ae287;
  border-radius: 10px;
  padding: 15px;
  display: flex;
  flex-direction: column;
`;

const WaitingContainer = styled.div`
  height: 390px;
  width: 320px;
  background-color: #222831;
  border: 1px solid #222831;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.div`
  font-family: "Roboto";
  font-size: 14px;
  font-weight: 400;
  margin-right: 10px;
  color: #3c3c3c;
  margin-bottom: 5px;
`;

const Input = styled.input`
  height: 30px;
  width: 280px;
  border: 1px solid #d5d5d5;
  background: #ffffff;
  border-radius: 3px;
  font-size: 14px;
  padding-left: 5px;
  ::placeholder {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 200;
    font-size: 14px;
    color: #000000;
  }
`;

const PriorityButtonsContainer = styled.div`
  display: flex;
`;

const PriorityButton = styled.div`
  height: 40px;
  width: 70px;
  background-color: ${(props) => {
    if (props.priorityLevel === "veryCritical") return "#ff3030";
    if (props.priorityLevel === "critical") return "#ff922e";
    if (props.priorityLevel === "normal") return "#2fbe34";
    if (props.priorityLevel === "low") return "#0077b6";
  }};
  border: 1px solid transparent;
  border-radius: 10px;
  font-family: "Roboto";
  font-weight: 500;
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  align-items: center;
  justify-content: center;
  line-height: 40px;
  margin-right: 8px;
  opacity: ${(props) => (props.isSelected ? 1.0 : 0.4)};
  :hover {
    cursor: pointer;
  }
`;

const PrioritySpan = styled.span`
  display: inline-block;
  vertical-align: middle;
  line-height: 16px;
`;

const RegisterButton = styled.div`
  height: 45px;
  width: 170px;
  background-color: #777777;
  margin: auto;
  border: 2px solid #ffffff;
  border-radius: 10px;
  font-family: "Roboto";
  font-weight: 500;
  font-size: 18px;
  color: #ffffff;
  text-align: center;
  line-height: 41px;
  :hover {
    cursor: pointer;
  }
  margin-bottom: 10px;
`;

const ReturnButton = styled.div`
  font-family: "Roboto";
  font-weight: 500;
  font-size: 16px;
  color: #777777;
  text-decoration: underline;
  margin: auto;
  :hover {
    cursor: pointer;
  }
`;
