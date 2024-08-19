import axios from "axios";
import { config } from "../api_config/config";

export class GamesService {
  async runNewGame(userId: string) {
    const authToken = localStorage.getItem("access_token");
    if (!authToken) {
      throw new Error("Auth token is missing");
    }
    try {
      const response = await axios.post(
        `${config.api.url}/games/create/${userId}`,
        {},
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message);

        throw new Error(error.response?.data?.message || "Failed to run game");
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }

  async getUserGames(userId: string) {
    const authToken = localStorage.getItem("access_token");
    try {
      const response = await axios.get(
        `${config.api.url}/games/get/${userId}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message);

        throw new Error(
          error.response?.data?.message || "Failed to get games list"
        );
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }

  async getGlobalRating() {
    const authToken = localStorage.getItem("access_token");
    try {
      const response = await axios.get(`${config.api.url}/games/rating`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message);

        throw new Error(
          error.response?.data?.message || "Failed to get rating"
        );
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }
}
