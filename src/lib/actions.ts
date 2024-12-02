"use server";

import { z } from "zod";
import { UserFormValidation } from "./validation";
import { BUCKET_ID, DATABASE_ID, databases, ENDPOINT, PATIENT_COLLECTION_ID, PROJECT_ID, APPOINTMENT_COLLECTION_ID, storage, users, messaging } from "./appwrite.config";
import { ID, Query } from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import { Appointment } from "@/types/appwrite.type";
import { revalidateTag, unstable_cache } from "next/cache";
import { formatDateTime } from "./utils";

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

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);

    return user;
  } catch (error) {
    console.log(error, "<---digetUserError");
  }
};

export const registerPatient = async ({ identificationDocument, ...patientData }: RegisterUserParams) => {
  console.log({ patientData, identificationDocument }, "<---diregisterPatientAction");

  try {
    let file;

    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(identificationDocument?.get("blobFile") as Blob, identificationDocument?.get("fileName") as string);

      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }

    const newPatient = await databases.createDocument(DATABASE_ID!, PATIENT_COLLECTION_ID!, ID.unique(), {
      identificationDocumentId: file?.$id || null,
      identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
      ...patientData,
    });

    return { newPatient, success: true, message: "Patient registered successfully!" };

    // console.log({ InputFile, file, newPatient }, "<---diregisterPatientAction2");
  } catch (error) {
    console.log(error, "<---diregisterPatientActionError");
  }
};

export const getPatient = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(DATABASE_ID!, PATIENT_COLLECTION_ID!, [Query.equal("userId", [userId])]);

    return patients.documents[0];
  } catch (error) {
    console.log(error, "<---digetPatientError");
  }
};

export const createAppointment = async (data: CreateAppointmentParams) => {
  console.log(data, "<---dicreateAppointmentAction");

  try {
    const newAppointment = await databases.createDocument(DATABASE_ID!, APPOINTMENT_COLLECTION_ID!, ID.unique(), data);

    return { newAppointment, success: true, message: "Created appointment successfully!" };
  } catch (error) {
    console.log(error, "<---dicreateAppointmentError");
  }
};

export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(DATABASE_ID!, APPOINTMENT_COLLECTION_ID!, appointmentId);

    return appointment;
  } catch (error) {
    console.log(error, "<---digetAppointmentError");
  }
};

export const getRecentAppointmentList = unstable_cache(
  async () => {
    try {
      const appointments = await databases.listDocuments(DATABASE_ID!, APPOINTMENT_COLLECTION_ID!, [Query.orderDesc("$createdAt")]);

      const initialCounts = {
        scheduledCount: 0,
        pendingCount: 0,
        cancelledCount: 0,
      };

      const counts = (appointments.documents as Appointment[]).reduce((acc, curr) => {
        if (curr.status === "scheduled") {
          acc.scheduledCount += 1;
        } else if (curr.status === "pending") {
          acc.pendingCount += 1;
        } else if (curr.status === "cancelled") {
          acc.cancelledCount += 1;
        }

        return acc;
      }, initialCounts);

      const data = {
        totalCount: appointments.total,
        ...counts,
        documents: appointments.documents,
      };

      return data;
    } catch (error) {
      console.log(error, "<---getCachedRecentAppointmentListError");
    }
  },
  ["recentAppointments"],
  { revalidate: 60, tags: ["appointments"] }
);

// if you want to use it without caching nextjs then you can caching using react-query
// export const getRecentAppointmentList = async () => {
//   try {
//     const appointments = await databases.listDocuments(DATABASE_ID!, APPOINTMENT_COLLECTION_ID!, [Query.orderDesc("$createdAt")]);

//     const initialCounts = {
//       scheduledCount: 0,
//       pendingCount: 0,
//       cancelledCount: 0,
//     };

//     const counts = (appointments.documents as Appointment[]).reduce((acc, curr) => {
//       if (curr.status === "scheduled") {
//         acc.scheduledCount += 1;
//       } else if (curr.status === "pending") {
//         acc.pendingCount += 1;
//       } else if (curr.status === "cancelled") {
//         acc.cancelledCount += 1;
//       }

//       return acc;
//     }, initialCounts);

//     const data = {
//       totalCount: appointments.total,
//       ...counts,
//       documents: appointments.documents,
//     };

//     return data;
//   } catch (error) {
//     console.log(error, "<---digetRecentAppointmentListError");
//   }
// };

export const updateAppointment = async ({ appointmentId, userId, appointment, type }: UpdateAppointmentParams) => {
  console.log({ appointmentId, userId, appointment, type }, "<---diupdateAppointmentAction");

  try {
    const updatedAppointment = await databases.updateDocument(DATABASE_ID!, APPOINTMENT_COLLECTION_ID!, appointmentId, appointment);

    if (!updatedAppointment) throw new Error("Appointment not found!");

    const smsMessage = `
    Hi, it's HealthMate.
    ${
      type === "schedule"
        ? `Your appointment has been scheduled for ${formatDateTime(appointment.schedule).dateTime} with dr ${appointment.primaryPhysician}`
        : `We regret to inform you that your appointment has been cancelled for the following reason: ${appointment.cancellationReason}`
    }
    
    `;

    await sendSMSNotification(userId, smsMessage);

    // ISR using revalidateTag ---> automatically updates the latest data without refreshing the page or exiting the page and then returning to the previous page
    revalidateTag("appointments");

    return { updatedAppointment, success: true, message: "Update appointment successfully!" };
  } catch (error) {
    console.log(error, "<---diupdateAppointmentError");
  }
};

export const sendSMSNotification = async (userId: string, content: string) => {
  try {
    const message = await messaging.createSms(ID.unique(), content, [], [userId]);

    return { message, success: true, messages: "SMS sent successfully!" };
  } catch (error) {
    console.log(error, "<---disendSMSNotificationError");
  }
};
