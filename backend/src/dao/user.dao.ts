import User from "../models/User";

// user.dao.ts
export const findUserByEmail = async (email:string) => {
    return await User.findOne({email})
}

export const findUserByEmailByPassword = async (email:string) => {
    return await User.findOne({email}).select('+password')
}

export const findUserById = async (id:string) => {
    return await User.findById(id)
}   

export const createUser = async (name:string, email:string, password:string,role:string) => {
    const createdNewUser = new User({name, email, password, role:role || 'user'})
    await createdNewUser.save()
    return createdNewUser
}

export const getAllUsers = async () => {
    return await User.find()
}