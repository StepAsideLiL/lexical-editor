"use server";

import prisma from "@/lib/prismadb";
import { revalidatePath } from "next/cache";

export async function save(data: string) {
  try {
    const text = await prisma.text.upsert({
      where: { id: "1" },
      create: { id: "1", content: data },
      update: {
        id: "1",
        content: data,
      },
    });

    if (text) {
      revalidatePath("/");
      return {
        success: true,
        status: "success",
        message: "Successfully save data!",
      };
    } else {
      revalidatePath("/");
      return {
        success: false,
        status: "failed",
        message: "Failed to save data!",
      };
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}
