import axios from "axios";
import { config } from "../api_config/config";

export class UserService {
  async registerUser(registrationData: {
    email: string;
    username: string;
    password: string;
  }) {
    try {
      const response = await axios.post(
        `${config.api.url}/auth/sign-up`,
        registrationData
      );
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message);

        throw new Error(
          error.response?.data?.message || "Failed to register user"
        );
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }

  async loginUser(authData: { email: string; pass: string }) {
    try {
      const response = await axios.post(
        `${config.api.url}/auth/sign-in`,
        authData
      );
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message);

        throw new Error(
          error.response?.data?.message || "Failed to login user"
        );
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }

  async getUserData() {
    const authToken = localStorage.getItem("access_token");
    if (!authToken) {
      throw new Error("Auth token is missing");
    }
    try {
      const response = await axios.get(`${config.api.url}/auth/user-data`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message);

        throw new Error(
          error.response?.data?.message || "Failed to login user"
        );
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }

  async upDateUserInfo(upData: { id: string | undefined; username: string }) {
    const authToken = localStorage.getItem("access_token");
    if (!authToken) {
      throw new Error("Auth token is missing");
    }
    try {
      const response = await axios.put(
        `${config.api.url}/users/${upData.id}`,
        upData,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message);

        throw new Error(
          error.response?.data?.message || "Failed to login user"
        );
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }
}
