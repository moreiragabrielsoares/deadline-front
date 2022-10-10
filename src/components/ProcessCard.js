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
      <InfosContainer>
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
        <RightContainer>
          <DeadlineContainer>
            <LabelLine>Prazo</LabelLine>
            <DeadlineLine>
              {dayjs.utc(deadline).format("DD/MM/YYYY")}&nbsp;
              <span> {` (${daysRemaining} dias restantes)`}</span>
            </DeadlineLine>
          </DeadlineContainer>
          <PriorityContainer>
            <LabelLine>Prioridade</LabelLine>
            <PriorityLine>{priorityCorrelation[priorityLevel]}</PriorityLine>
          </PriorityContainer>
        </RightContainer>
      </InfosContainer>

      <IconsContainer>
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
      </IconsContainer>
    </CardContainer>
  );
}

export default ProcessCard;

const CardContainer = styled.div`
  width: 460px;
  height: 130px;
  background-color: "#ffffff";
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 2px solid #999999;
  border-radius: 5px;
  padding: 15px;
  margin: 5px;
  @media (max-width: 600px) {
    width: 330px;
    height: 190px;
    flex-direction: column;
  }

  @media (max-width: 300px) {
    width: 270px;
    height: 200px;
    flex-direction: column;
  }
`;

const InfosContainer = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 600px) {
    margin-bottom: 12px;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 40px;
  @media (max-width: 600px) {
    width: 210px;
    margin-right: 20px;
    justify-content: space-between;
  }
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 30px;
  @media (max-width: 600px) {
    margin-right: 0px;
  }
`;

const IconsContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 600px) {
    flex-direction: row-reverse;
    justify-content: right;
  }
`;

const CheckContainer = styled.div`
  margin-top: 5px;
  margin-bottom: 20px;
  @media (max-width: 600px) {
    margin-top: 0px;
    margin-bottom: 0px;
    margin-left: 10px;
  }
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
  @media (max-width: 600px) {
    flex-wrap: wrap;
  }
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
