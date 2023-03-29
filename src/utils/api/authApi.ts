import { AxiosResponse } from "axios";
import api from "./apiConfig";
import { AuthResponse } from "./types";

export default class AuthService {
    static async register(username: string, email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return api.post<AuthResponse>('/sign-up', { username, email, password })
    }
}