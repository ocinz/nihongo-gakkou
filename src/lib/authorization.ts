"use server";
import { auth } from "@/auth";
import { prisma } from "@/prisma";
type method = "GET" | "POST" | "PATCH" | "DELETE";

export async function authorize(url: string, method: method) {
  const session = await auth();
  const authorities = await prisma.authority.findFirst({
    where: { roleId: session?.user?.roleId, menu: { path: url } },
  });
  switch (method) {
    case "GET":
      return authorities?.canRead;
    case "POST":
      return authorities?.canCreate;
    case "DELETE":
      return authorities?.canDelete;
    case "PATCH":
      return authorities?.canUpdate;
    default:
      return false;
  }
}
