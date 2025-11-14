import { authService } from "./auth.service.js";

export const authController = {
  async login(req, res) {
    try {
        const { login, senha } = req.body;
        const result = await authService.login(login, senha);
        return res.json(result);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
    },

  async register(req, res) {
    try {
        const user = await authService.register(req.body);
        return res.status(201).json(user);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
    }
};
