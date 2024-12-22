"use server";
import { prisma } from "@/prisma";

export type Enrichment = {
  title: string;
  id: number;
};

export type CreateEnrichment = {
  content: string;
  userId: string;
  title: string;
};

// Tipe untuk memperbarui enrichment (memerlukan id)
export type UpdateEnrichment = {
  id: number;
  content?: string;
  userId?: string;
  title?: string;
};

export type PaginationResult<T> = {
  data: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
};
export type PaginationInput = {
  page: number;
  pageSize: number;
};

export async function createEnrichment(request: CreateEnrichment) {
  await prisma.enrichment.create({
    data: request,
  });
}

export async function updateEnrichment(request: UpdateEnrichment) {
  await prisma.enrichment.update({
    where: { id: request.id },
    data: request,
  });
}
export async function deleteEnrichment(request: number) {
  await prisma.enrichment.delete({
    where: { id: request },
  });
}
export async function getEnrichments(
  pagination: PaginationInput
): Promise<PaginationResult<Enrichment>> {
  const data = await prisma.enrichment.findMany({
    select: {
      title: true,
      id: true,
    },
    take: pagination.pageSize,
    orderBy: {
      id: "desc",
    },
    skip: (pagination.page - 1) * pagination.pageSize,
  });
  const count = await prisma.enrichment.count();
  return {
    data: data,
    totalItems: count,
    totalPages: 12,
    currentPage: pagination.page,
    pageSize: pagination.pageSize,
  };
}

export async function getEnrichmentById(id: number) {
  return await prisma.enrichment.findFirst({
    where: {
      id: id,
    },
  });
}

import { redirect } from "next/navigation";
// import { number } from "zod";

export async function navigate(path: string) {
  redirect(path);
}
