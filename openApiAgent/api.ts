import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const Category = z.object({ id: z.number().int(), name: z.string() }).partial();
const Tag = z.object({ id: z.number().int(), name: z.string() }).partial();
const Pet = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  category: Category.optional(),
  photoUrls: z.array(z.string()),
  tags: z.array(Tag).optional(),
  status: z.enum(["available", "pending", "sold"]).optional(),
});
const ApiResponse = z
  .object({ code: z.number().int(), type: z.string(), message: z.string() })
  .partial();
const Order = z
  .object({
    id: z.number().int(),
    petId: z.number().int(),
    quantity: z.number().int(),
    shipDate: z.string().datetime({ offset: true }),
    status: z.enum(["placed", "approved", "delivered"]),
    complete: z.boolean(),
  })
  .partial();
const User = z
  .object({
    id: z.number().int(),
    username: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    password: z.string(),
    phone: z.string(),
    userStatus: z.number().int(),
  })
  .partial();

export const schemas = {
  Category,
  Tag,
  Pet,
  ApiResponse,
  Order,
  User,
};

const endpoints = makeApi([
  {
    method: "post",
    path: "/pet",
    alias: "addPet",
    description: `Add a new pet to the store`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        description: `Create a new pet in the store`,
        type: "Body",
        schema: Pet,
      },
    ],
    response: Pet,
    errors: [
      {
        status: 405,
        description: `Invalid input`,
        schema: z.void(),
      },
    ],
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
