export const userData = JSON.parse(localStorage.getItem("userData"));

export const headerConfig = {
  headers: {
    Authorization: `${
      localStorage.length !== 0 ? `Bearer ${userData.token}` : ""
    }`,
  },
};

export const backUrl = "http://localhost:5000/";
