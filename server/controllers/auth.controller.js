import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import createError from "../utils/createError.js";

export const validatePassword = (password) => {
    //Validasi delapan karakter
    if (password.length < 8) {
        throw createError(422, "Password harus minimal delapan karakter.");
    }

    // Validasi setiap karakter password
    const upperCaseRegex = /[A-Z]/;
    const lowerCaseRegex = /[a-z]/;
    const digitRegex = /\d/;
    const specialCharsRegex = /[!@#$%^&*]/;
    const denailCharsRegex = /[`()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (!upperCaseRegex.test(password)) {
        throw createError(422, "Password harus mengandung setidaknya satu huruf besar.");
    }
    if (!lowerCaseRegex.test(password)) {
        throw createError(422, "Password harus mengandung setidaknya satu huruf kecil.");
    }
    if (!digitRegex.test(password)) {
        throw createError(422, "Password harus mengandung setidaknya satu angka.");
    }
    if (!specialCharsRegex.test(password)) {
        throw createError(422, "Password harus mengandung setidaknya satu karakter khusus.");
    }
    if (denailCharsRegex.test(password)) {
        throw createError(422, "Password tidak boleh mengandung karakter khusus tertentu.");
    }
};


export const register = async (req, res, next) => {
    try {
        const { email, password, firstname, lastname, roles } = req.body;
        if (!email || !password || !firstname || !lastname) return next(createError(400, "Lengkapi data diri anda."));
        //validasi email
        if (!validator.isEmail(email)) return next(createError(400, "Email tidak valid!"));
        //validasi password
        validatePassword(password);
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const oldUser = await userModel.findOne({email});
        if(oldUser) return next(createError(400, "Email sudah terdaftar!"));
        const user = new userModel({
            email: email,
            password: hashPassword,
            firstname: firstname,
            lastname: lastname,
            roles: roles,

        });
        await user.save();
        res.status(200).json({ message: "User berhasil dibuat" });
    } catch (err) {
        next(err);
    }
};

//fungsi login
export const login = async (req, res, next) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) return next(createError(404, 'Email tidak valid!'));
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) return next(createError(401, 'Password yang anda masukkan salah!'));
        const accessToken = jwt.sign({ id: user._id, email: user.email, roles: user.roles }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        const refreshTokens = jwt.sign({ id: user._id, email: user.email, roles: user.roles }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '7d'
        });
        await userModel.findOneAndUpdate(user._id, { refreshTokens });
        res.cookie('refreshToken', refreshTokens, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            expires: new Date(Date.now() + 604800000) // 7 day | 1 day = 86400000
        });
        res.json({ accessToken });
    } catch (error) {
        next(error);
    }
};

//fungsi logout
export const logout = async (req, res, next) => {
    try {
        const user = await userModel.findOne({ id: req.params.id });
        await userModel.findOneAndUpdate(user._id, { $set: { refreshTokens: [] } });
        res.clearCookie('accessToken', { httpOnly: true, sameSite: 'None', secure: true });
        res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'None', secure: true });
        res.status(200).json({ message: 'Logout berhasil' });
    } catch (error) {
        next(error);
    }
};


