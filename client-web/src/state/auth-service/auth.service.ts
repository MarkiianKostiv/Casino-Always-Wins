import axios from "axios";
import { config } from "../api_config/config";

export class AuthService {
  async validateToken() {
    const authToken = localStorage.getItem("access_token");

    if (!authToken) {
      throw new Error("Auth token is missing");
    }

    try {
      const response = await axios.post(`${config.api.url}/auth/check_token`, {
        access_token: authToken,
      });

      if (response.data.token_status === false) {
        await this.refreshTokens();
        return {
          validateToken: true,
          message:
            "The access token time has expired, the tokens have been updated",
        };
      } else {
        return {
          validateToken: true,
          message: "The current access token is valid",
        };
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message);

        throw new Error(error.response?.data?.message || "Failed to run game");
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }

  private async refreshTokens() {
    const refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) {
      throw new Error("Refresh token is missing");
    }

    try {
      const response = await axios.post(`${config.api.url}/auth/refresh`, {
        refresh_token: refreshToken,
      });

      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      const refresh_token = await response.data.refresh_token;
      const access_token = await response.data.access_token;
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message);

        throw new Error(error.response?.data?.message || "Failed to run game");
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }
}
