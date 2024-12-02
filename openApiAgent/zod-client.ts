import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const endpoints = makeApi([
  {
    method: "post",
    path: "/pet",
    alias: "addPet",
    requestFormat: "json",
    response: z.void(),
    errors: [
      {
        status: 405,
        description: `Invalid input`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "put",
    path: "/pet",
    alias: "updatePet",
    requestFormat: "json",
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Invalid ID supplied`,
        schema: z.void(),
      },
      {
        status: 404,
        description: `Pet not found`,
        schema: z.void(),
      },
      {
        status: 405,
        description: `Validation exception`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/pet/:petId",
    alias: "getPetById",
    description: `Returns a single pet`,
    requestFormat: "json",
    parameters: [
      {
        name: "petId",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Invalid ID supplied`,
        schema: z.void(),
      },
      {
        status: 404,
        description: `Pet not found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "post",
    path: "/pet/:petId",
    alias: "updatePetWithForm",
    requestFormat: "json",
    parameters: [
      {
        name: "petId",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 405,
        description: `Invalid input`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "delete",
    path: "/pet/:petId",
    alias: "deletePet",
    requestFormat: "json",
    parameters: [
      {
        name: "api_key",
        type: "Header",
        schema: z.unknown().optional(),
      },
      {
        name: "petId",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Invalid ID supplied`,
        schema: z.void(),
      },
      {
        status: 404,
        description: `Pet not found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "post",
    path: "/pet/:petId/uploadImage",
    alias: "uploadFile",
    requestFormat: "json",
    parameters: [
      {
        name: "petId",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/pet/findByStatus",
    alias: "findPetsByStatus",
    description: `Multiple status values can be provided with comma separated strings`,
    requestFormat: "json",
    parameters: [
      {
        name: "status",
        type: "Query",
        schema: z.unknown(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Invalid status value`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/store/inventory",
    alias: "getInventory",
    description: `Returns a map of status codes to quantities`,
    requestFormat: "json",
    response: z.void(),
  },
  {
    method: "post",
    path: "/store/order",
    alias: "placeOrder",
    requestFormat: "json",
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Invalid Order`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/store/order/:orderId",
    alias: "getOrderById",
    description: `For valid response try integer IDs with value &gt;&#x3D; 1 and &lt;&#x3D; 10. Other values will generated exceptions`,
    requestFormat: "json",
    parameters: [
      {
        name: "orderId",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Invalid ID supplied`,
        schema: z.void(),
      },
      {
        status: 404,
        description: `Order not found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "delete",
    path: "/store/order/:orderId",
    alias: "deleteOrder",
    description: `For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors`,
    requestFormat: "json",
    parameters: [
      {
        name: "orderId",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Invalid ID supplied`,
        schema: z.void(),
      },
      {
        status: 404,
        description: `Order not found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "post",
    path: "/user",
    alias: "createUser",
    description: `This can only be done by the logged in user.`,
    requestFormat: "json",
    response: z.void(),
  },
  {
    method: "get",
    path: "/user/:username",
    alias: "getUserByName",
    requestFormat: "json",
    parameters: [
      {
        name: "username",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Invalid username supplied`,
        schema: z.void(),
      },
      {
        status: 404,
        description: `User not found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "put",
    path: "/user/:username",
    alias: "updateUser",
    description: `This can only be done by the logged in user.`,
    requestFormat: "json",
    parameters: [
      {
        name: "username",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Invalid user supplied`,
        schema: z.void(),
      },
      {
        status: 404,
        description: `User not found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "delete",
    path: "/user/:username",
    alias: "deleteUser",
    description: `This can only be done by the logged in user.`,
    requestFormat: "json",
    parameters: [
      {
        name: "username",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Invalid username supplied`,
        schema: z.void(),
      },
      {
        status: 404,
        description: `User not found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "post",
    path: "/user/createWithArray",
    alias: "createUsersWithArrayInput",
    requestFormat: "json",
    response: z.void(),
  },
  {
    method: "post",
    path: "/user/createWithList",
    alias: "createUsersWithListInput",
    requestFormat: "json",
    response: z.void(),
  },
  {
    method: "get",
    path: "/user/login",
    alias: "loginUser",
    requestFormat: "json",
    parameters: [
      {
        name: "username",
        type: "Query",
        schema: z.unknown(),
      },
      {
        name: "password",
        type: "Query",
        schema: z.unknown(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Invalid username/password supplied`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/user/logout",
    alias: "logoutUser",
    requestFormat: "json",
    response: z.void(),
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
