import styled from "styled-components";
import { AiOutlineCheckCircle, AiOutlineDelete } from "react-icons/ai";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
import axios from "axios";
import { backUrl, headerConfig } from "../utils/constants";

function ProcessCard({
  processId,
  processNumber,
  task,
  deadline,
  priorityLevel,
  setProcesses,
}) {
  const priorityCorrelation = {
    p1: "Muito alta",
    p2: "Alta",
    p3: "Normal",
    p4: "Baixa",
  };
  const ONE_DAY_MILLISECONDS = 24 * 60 * 60 * 1000;
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const daysRemaining = Math.round(
    dayjs.utc(deadline).diff(currentDate) / ONE_DAY_MILLISECONDS
  );

  function deleteProcessCard(processId) {
    const sessionData = JSON.parse(localStorage.getItem("sessionData"));
    const config = headerConfig(sessionData?.token);
    config["data"] = { id: processId };
    const promisse = axios.delete(`${backUrl}processes`, config);
    promisse.then(deleteSuccess);
    promisse.catch(deleteFail);
  }

  function deleteSuccess() {
    const sessionData = JSON.parse(localStorage.getItem("sessionData"));
    const config = headerConfig(sessionData?.token);
    const promisse = axios.get(`${backUrl}processes`, config);
    promisse.then(getProcessesSuccess);
    promisse.catch(getProcessesFail);
    function getProcessesSuccess(res) {
      setProcesses(res.data);
    }
    function getProcessesFail(error) {
      console.log(error.response.data);
    }
  }

  function deleteFail(error) {
    alert(error.response.data);
  }

  function updateProcessCard(processId) {
    const sessionData = JSON.parse(localStorage.getItem("sessionData"));
    const config = headerConfig(sessionData?.token);
    const promisse = axios.put(
      `${backUrl}processes`,
      { id: processId },
      config
    );
    promisse.then(updateSuccess);
    promisse.catch(updateFail);
  }

  function updateSuccess() {
    const sessionData = JSON.parse(localStorage.getItem("sessionData"));
    const config = headerConfig(sessionData?.token);
    const promisse = axios.get(`${backUrl}processes`, config);
    promisse.then(getProcessesSuccess);
    promisse.catch(getProcessesFail);
    function getProcessesSuccess(res) {
      setProcesses(res.data);
    }
    function getProcessesFail(error) {
      console.log(error.response.data);
    }
  }

  function updateFail(error) {
    alert(error.response.data);
  }

  return (
    <CardContainer>
      <LeftContainer>
        <ProcessNumberContainer>
          <LabelLine>Número do Processo</LabelLine>
          <ProcessNumberLine>{processNumber}</ProcessNumberLine>
        </ProcessNumberContainer>
        <TaskContainer>
          <LabelLine>Tarefa</LabelLine>
          <TaskLine>{task}</TaskLine>
        </TaskContainer>
      </LeftContainer>
      <MiddleContainer>
        <DeadlineContainer>
          <LabelLine>Prazo</LabelLine>
          <DeadlineLine>
            {`${dayjs
              .utc(deadline)
              .format("DD/MM/YYYY")} (${daysRemaining} dias restantes)`}
          </DeadlineLine>
        </DeadlineContainer>
        <PriorityContainer>
          <LabelLine>Prioridade</LabelLine>
          <PriorityLine>{priorityCorrelation[priorityLevel]}</PriorityLine>
        </PriorityContainer>
      </MiddleContainer>
      <RightContainer>
        <CheckContainer>
          <AiOutlineCheckCircle
            size={"2em"}
            color={"#80cc72"}
            style={{ cursor: "pointer" }}
            onClick={() => updateProcessCard(processId)}
          ></AiOutlineCheckCircle>
        </CheckContainer>
        <AiOutlineDelete
          size={"2em"}
          color={"#777777"}
          style={{ cursor: "pointer" }}
          onClick={() => deleteProcessCard(processId)}
        ></AiOutlineDelete>
      </RightContainer>
    </CardContainer>
  );
}

export default ProcessCard;

const CardContainer = styled.div`
  min-width: 420px;
  height: 130px;
  background-color: "#ffffff";
  display: flex;
  flex-direction: row;
  border: 2px solid #999999;
  border-radius: 5px;
  padding: 15px;
  margin: 5px;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 60px;
`;

const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 30px;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CheckContainer = styled.div`
  margin-top: 5px;
  margin-bottom: 20px;
`;

const ProcessNumberContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const ProcessNumberLine = styled.div`
  display: flex;
`;

const TaskContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TaskLine = styled.div`
  display: flex;
`;

const DeadlineContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const DeadlineLine = styled.div`
  display: flex;
`;

const PriorityContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PriorityLine = styled.div`
  display: flex;
`;

const LabelLine = styled.div`
  font-family: "Roboto";
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 5px;
`;
