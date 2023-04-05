import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import createError from "../utils/createError.js";


//fungsi cari user bedasarkan ID
export const getUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await userModel.findById(userId).select("-password");
        if (!user) return next(createError(404, "User tidak ditemukan."));
        res.status(200).json({ user });
    } catch (err) {
        next(err);
    }
};

//update user
export const updateUser = async (req, res, next) => {
    try {
        const { user_id, email, password, firstname, lastname, isAdmin } = req.body;
        const userId = req.params.id

        //cari user dengan ID tertentu
        const user = await userModel.findById(userId);

        //jika user tidak ditemukan maka ...
        if (!user) return next(createError(404, "User tidak ditemukan."));

        //update data user
        user.email = email || user.email;
        user.firstname = firstname || user.firstname;
        user.lastname = lastname || user.lastname;
        if (isAdmin !== undefined) {
            user.isAdmin = isAdmin;
        }
        if (password) {
            const hashPassword = await bcrypt.hash(password, 10);
            user.password = hashPassword;
        }
        if (userId !== user_id) return next(createError(404, "Access tidak diterima anda hanya bisa mengupdate akun anda sendiri."));

        //simpan perubahan pada database
        await user.save();

        res.status(200).json({ message: "Data user berhasil diupdate." });
    } catch (err) {
        next(err);
    }
};

//delete user
export const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const { user_id, isAdmin } = req.body;
        const user = await userModel.findById(userId);

        if (!user) return next(createError(404, "User tidak ditemukan."));

        if (userId !== user_id) return next(createError(403, "Access tidak diterima anda hanya bisa menghapus akun anda sendiri."));

        if (isAdmin !== undefined) {
            user.isAdmin = isAdmin;
            await user.save();
        }

        await userModel.findByIdAndDelete(userId);
        res.status(200).json({ message: "User berhasil dihapus." });
    } catch (err) {
        next(err);
    }
};

//follow a user
export const followUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const { user_id } = req.body;
        if (user_id === userId) return next(createError(403, "Action forbidden"));

        const followUser = await userModel.findById(userId);
        const followingUser = await userModel.findById(user_id)

        if (!followUser.followers.includes(user_id)) {
            await followUser.updateOne({ $push: { followers: user_id } });
            await followingUser.updateOne({ $push: { following: userId } });
            res.status(200).json({ message: "User followed!" });
        } else {
            res.status(403).json({ message: "User is already followed by you" });
        }

    } catch (err) {
        next(err);
    }
};

//unfollow a user
export const unFollowUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const { user_id } = req.body;
        if (user_id === userId) return next(createError(403, "Action forbidden"));

        const followUser = await userModel.findById(userId);
        const followingUser = await userModel.findById(user_id)

        if (followUser.followers.includes(user_id)) {
            await followUser.updateOne({ $pull: { followers: user_id } });
            await followingUser.updateOne({ $pull: { following: userId } });
            res.status(200).json({ message: "User Unfollow!" });
        } else {
            res.status(403).json({ message: "User is not followed by you" });
        }

    } catch (err) {
        next(err);
    }
};
