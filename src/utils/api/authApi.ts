import { AxiosResponse } from "axios";
import api from "./apiConfig";
import { AuthResponse } from "./types";

export default class AuthService {
    static async register(name: string, email: string,  password: string): Promise<AxiosResponse<AuthResponse>> {
        return api.post<AuthResponse>('/sign-up', { name, email, password })
    }

    static async login(email: string,  password: string) {
        return api.post('/login', { email, password })
    }
}