import { createUser, findUserByEmailByPassword } from '../dao/user.dao';
import { signToken } from '../utils/helper';

export const registerUser = async (name: string, email: string, password: string, role: string) => {
    try {
        const user = await import('../dao/user.dao').then(m => m.findUserByEmail(email));
        if (user) {
            throw new Error("User already exists");
        }
        const newUser = await createUser(name, email, password, role);
        const token = await signToken({ email: newUser.email });
        return { newUser, token };
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const loginUser = async (email: string, password: string) => {
    try {
        const user = await findUserByEmailByPassword(email);
        if (!user) {
            throw new Error("Invalid credentials");
        }
        if (user.password !== password) {
            throw new Error("Invalid credentials");
        }
        const token = signToken({ email: user.email });
        return { user, token };
    } catch (error: any) {
        throw new Error(error.message);
    }
}
