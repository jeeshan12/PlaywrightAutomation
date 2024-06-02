import { test, expect } from "@playwright/test";
import { performDeleteOperation } from "src/utils/delete-utils";
import { performPostOperation } from "src/utils/post-utils";
import { performPutOperation } from "src/utils/put-utils";
import { performGetOperation } from "src/utils/get-utils";
import type {
  DeleteMethodOptions,
  GetMethodOptions,
  PostMethodOptions,
  PutMethodOptions,
} from "src/model/restapi-options";
import {
  UserDataDetails,
  UsersPerPageDetails,
  UserResponse,
  UpdatedUserResponse,
} from "src/model/schemas";
import { DataFactory } from "src/data/datafactory";
import type { User } from "src/model/requests";
test.use({
  screenshot: "off",
});

test.describe(
  "API Operations",
  {
    tag: "@api",
  },
  async () => {
    test.use({
      baseURL: "https://reqres.in",
    });
    test("Get a single user ", async ({ request }, testInfo) => {
      const userOptions: GetMethodOptions = {
        url: "/api/users/2",
        attachRequestToReports: true,
        attachResponseToReports: true,
      };
      const response = await performGetOperation(
        request,
        testInfo,
        userOptions,
      );
      const jsonResponse = await response.json();
      const parsedData = UserDataDetails.parse(jsonResponse);
      await expect(response).toBeOK();
      expect(parsedData.data.email).toBe("janet.weaver@reqres.in");
      expect(parsedData.data.id).toBe(2);
      expect(parsedData.data.first_name).toBe("Janet");
      expect(parsedData.data.last_name).toBe("Weaver");
      expect(parsedData.data.avatar).toBe(
        "https://reqres.in/img/faces/2-image.jpg",
      );
    });

    test(
      "Get users within a page ",
      {
        tag: "@api",
      },
      async ({ request }, testInfo) => {
        const userOptions: GetMethodOptions = {
          url: "/api/users",
          params: {
            page: 2,
          },
          attachResponseToReports: true,
        };
        const response = await performGetOperation(
          request,
          testInfo,
          userOptions,
        );
        const jsonResponse = await response.json();
        const parsedData = UsersPerPageDetails.parse(jsonResponse);
        await expect(response).toBeOK();
        expect(parsedData.page).toBe(2);
        expect(parsedData.per_page).toBe(6);
        expect(parsedData.total).toBe(12);
        expect(parsedData.total_pages).toBe(2);
        expect(parsedData.data.length).toBe(6);
      },
    );

    test(
      "Create a new user ",
      {
        tag: "@api",
      },
      async ({ request }, testInfo) => {
        const user: User = DataFactory.getUserDetails();
        const postOptions: PostMethodOptions = {
          url: "/api/users",
          data: user,
          attachRequestToReports: true,
          attachResponseToReports: true,
        };
        const response = await performPostOperation(
          request,
          testInfo,
          postOptions,
        );
        const jsonResponse = await response.json();
        const parsedData = UserResponse.parse(jsonResponse);
        await expect(response).toBeOK();
        expect(parsedData.name).toBe(user.name);
        expect(parsedData.job).toBe(user.job);
      },
    );

    test(
      "Delete a  user ",
      {
        tag: "@api",
      },
      async ({ request }, testInfo) => {
        const deleteOptions: DeleteMethodOptions = {
          url: "/api/users/2",
          attachRequestToReports: true,
          attachResponseToReports: true,
        };
        const response = await performDeleteOperation(
          request,
          testInfo,
          deleteOptions,
        );
        expect(await response.status()).toBe(204);
      },
    );

    test(
      "Update a  user",
      {
        tag: "@api",
      },
      async ({ request }, testInfo) => {
        const user: User = DataFactory.getUserDetails();
        const putOptions: PutMethodOptions = {
          url: "/api/users/2",
          data: user,
          attachRequestToReports: true,
          attachResponseToReports: true,
        };
        const response = await performPutOperation(
          request,
          testInfo,
          putOptions,
        );
        const jsonResponse = await response.json();
        const parsedData = UpdatedUserResponse.parse(jsonResponse);
        await expect(response).toBeOK();
        expect(parsedData.name).toBe(user.name);
        expect(parsedData.job).toBe(user.job);
      },
    );
  },
);
