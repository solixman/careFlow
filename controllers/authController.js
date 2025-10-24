const authService = require('../services/authService');
const User = require("../models/User");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { toNamespacedPath } = require('path');


module.exports = {

    async login(req, res) {

        try {   

            const { user, tokens } = await authService.login(req.body);

            res.cookie('jwt', tokens.refreshToken, {
                httpOnly: true,
                sameSite: 'None', secure: true,
                maxAge: 24 * 60 * 60 * 1000 * 7
            });
           return res.status(201).json({
                token: tokens.accessToken,
                user: { id: user._id, name:user.name, email: user.email, role: user.role,status:user.status }
            });


        } catch (err) {
            console.log({ error: err.message });
            res.status(400).json({ error: err.message });
        }
    },

    async register(req, res) {
        try {
            const { user, tokens } = await authService.register(req.body);

            res.cookie('jwt', tokens.refreshToken, {
                httpOnly: true,
                sameSite: 'None',
                secure: true,
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            res.status(201).json({
                token: tokens.accessToken,
                user: { id: user._id, email: user.email, role: user.role,status:user.status }
            });

        } catch (err) {
            console.log({ error: err.message });
            res.status(400).json({ error: err.message });
        }
    },



    async logout(req, res) {
        try {
            res.clearCookie('jwt', {
                httpOnly: true,
                sameSite: 'None',
                secure: true
            });

            res.status(200).json({ message: "Logged out successfully" });
        } catch (err) {
            console.log({ error: err.message });
            res.status(400).json({ error: err.message });
        }
    }




}