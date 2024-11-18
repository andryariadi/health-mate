"use server";

import { z } from "zod";
import { UserFormValidation } from "./validation";
import { users } from "./appwrite.config";
import { ID, Query } from "node-appwrite";

export const createUser = async (data: z.infer<typeof UserFormValidation>) => {
  console.log(data, "<---dicreateUserAction");

  try {
    const newUser = await users.create(ID.unique(), data.email, data.phone, undefined, data.name);

    if (newUser) return { newUser, success: true, message: "User create succesfully!" };
  } catch (error: any) {
    console.log(error, "<---dicreateUserActionError");
    if (error && error?.code === 409) {
      const documents = await users.list([Query.equal("email", [data.email])]);

      return documents?.users[0];
    }
  }
};
