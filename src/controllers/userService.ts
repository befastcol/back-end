import { User } from '../models/user';
import { UserInterface } from '../interfaces/UserInterface';

export const createUser = async ({ name, phone }: UserInterface): Promise<UserInterface> => {
    if (!name || !phone) {
        throw new Error("Name and phone are required");
    }

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
        throw new Error("User already exists");
    }

    const newUser = new User({ name, phone });
    await newUser.save();

    return newUser;
};
