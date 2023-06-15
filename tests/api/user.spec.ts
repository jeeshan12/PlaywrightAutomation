import { test, expect } from "@playwright/test";
import { performDeleteOperation } from "../../utils/delete-utils";
import { performPostOperation } from "../../utils/post-utils";
import { performPutOperation } from "../../utils/put-utils";
import { performGetOperation } from "../../utils/get-utils";
import {
  DeleteMethodOptions,
  GetMethodOptions,
  PostMethodOptions,
  PutMethodOptions,
} from "../../model/restapi-options";
import {
  UserDataDetails,
  UsersPerPageDetails,
  UserResponse,
  UpdatedUserResponse,
} from "../../model/schemas";
import { DataFactory } from "../../data/datafactory";
import { User } from "../../model/requests";
test.use({
  screenshot: "off",
});

test.describe("API Operations", async () => {
  test.use({
    baseURL: "https://reqres.in",
  });
  test("Get a single user ", async ({ request }, testInfo) => {
    const userOptions: GetMethodOptions = {
      url: "/api/users/2",
      attachRequestToReports: true,
      attachResponseToReports: true,
    };
    const response = await performGetOperation(request, testInfo, userOptions);
    const jsonResponse = await response.json();
    const parsedData = UserDataDetails.parse(jsonResponse);
    expect(await response.status()).toBe(200);
    expect(parsedData.data.email).toBe("janet.weaver@reqres.in");
    expect(parsedData.data.id).toBe(2);
    expect(parsedData.data.first_name).toBe("Janet");
    expect(parsedData.data.last_name).toBe("Weaver");
    expect(parsedData.data.avatar).toBe(
      "https://reqres.in/img/faces/2-image.jpg"
    );
  });

  test("Get users within a page ", async ({ request }, testInfo) => {
    const userOptions: GetMethodOptions = {
      url: "/api/users",
      params: {
        page: 2,
      },
      attachResponseToReports: true,
    };
    const response = await performGetOperation(request, testInfo, userOptions);
    const jsonResponse = await response.json();
    const parsedData = UsersPerPageDetails.parse(jsonResponse);
    expect(await response.status()).toBe(200);
    expect(parsedData.page).toBe(2);
    expect(parsedData.per_page).toBe(6);
    expect(parsedData.total).toBe(12);
    expect(parsedData.total_pages).toBe(2);
    expect(parsedData.data.length).toBe(6);
  });

  test("Create a new user ", async ({ request }, testInfo) => {
    const user: User = DataFactory.getUserDetails();
    const postOptions: PostMethodOptions = {
      url: "/api/users",
      data: user,
      attachRequestToReports: true,
      attachResponseToReports: true,
    };
    const response = await performPostOperation(request, testInfo, postOptions);
    const jsonResponse = await response.json();
    const parsedData = UserResponse.parse(jsonResponse);
    expect(await response.status()).toBe(201);
    expect(parsedData.name).toBe(user.name);
    expect(parsedData.job).toBe(user.job);
  });

  test("Delete a  user ", async ({ request }, testInfo) => {
    const deleteOptions: DeleteMethodOptions = {
      url: "/api/users/2",
      attachRequestToReports: true,
      attachResponseToReports: true,
    };
    const response = await performDeleteOperation(
      request,
      testInfo,
      deleteOptions
    );
    expect(await response.status()).toBe(204);
  });

  test("Update a  user", async ({ request }, testInfo) => {
    const user: User = DataFactory.getUserDetails();
    const putOptions: PutMethodOptions = {
      url: "/api/users/2",
      data: user,
      attachRequestToReports: true,
      attachResponseToReports: true,
    };
    const response = await performPutOperation(request, testInfo, putOptions);
    const jsonResponse = await response.json();
    const parsedData = UpdatedUserResponse.parse(jsonResponse);
    expect(await response.status()).toBe(200);
    expect(parsedData.name).toBe(user.name);
    expect(parsedData.job).toBe(user.job);
  });
});
