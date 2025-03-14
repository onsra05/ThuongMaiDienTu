import axios from "axios";

export const loginService = async ({ email, password }) => {
    const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/signin`, { email, password },
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    return response;
};
