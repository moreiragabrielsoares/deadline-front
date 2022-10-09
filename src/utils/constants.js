export function headerConfig(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export const backUrl = "http://localhost:5000/";
