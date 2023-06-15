import { APIRequestContext, APIResponse, TestInfo } from "@playwright/test";
import { DeleteMethodOptions } from "../model/restapi-options";

export async function performDeleteOperation(
  request: APIRequestContext,
  testInfo: TestInfo,
  deleteOptions: DeleteMethodOptions
) {
  if (deleteOptions?.data && deleteOptions?.form && deleteOptions?.multipart) {
    throw new Error(
      "Please provide data, form or multipart option to Delete request body"
    );
  }

  const headers = deleteOptions?.headers
    ? deleteOptions.headers
    : {
        "Content-Type": "application/json",
        Accept: "application/json",
      };
  const params = deleteOptions?.params ? deleteOptions.params : {};
  if (deleteOptions?.attachRequestToReports && deleteOptions?.data) {
    testInfo.annotations.push({
      type: "Request Body",
      description: deleteOptions.data,
    });
  }

  let apiContext = {
    headers: {
      ...headers,
    },
    params: {
      ...params,
    },
  };
  if (deleteOptions?.data) {
    apiContext = { ...apiContext, ...{ data: deleteOptions.data } };
  }
  if (deleteOptions?.form) {
    apiContext = { ...apiContext, ...{ form: deleteOptions.form } };
  }
  if (deleteOptions?.multipart) {
    apiContext = { ...apiContext, ...{ multipart: deleteOptions.multipart } };
  }
  const response: APIResponse = await request.delete(
    deleteOptions.url,
    apiContext
  );

  if (deleteOptions?.attachResponseToReports) {
    testInfo.annotations.push({
      type: "Status Code",
      description: String(await response.status()),
    });
  }

  return response;
}
