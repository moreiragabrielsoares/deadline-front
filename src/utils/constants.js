export function headerConfig(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export const backUrl = "https://project-deadline-back.herokuapp.com/";
