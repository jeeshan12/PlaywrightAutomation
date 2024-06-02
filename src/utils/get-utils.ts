import type {
  APIRequestContext,
  APIResponse,
  TestInfo,
} from "@playwright/test";
import type { GetMethodOptions } from "../model/restapi-options";

export async function performGetOperation(
  request: APIRequestContext,
  testInfo: TestInfo,
  getOptions: GetMethodOptions,
) {
  const headers = getOptions?.headers
    ? getOptions.headers
    : {
        "Content-Type": "application/json",
        Accept: "application/json",
      };
  const params = getOptions?.params ? getOptions.params : {};

  const response: APIResponse = await request.get(getOptions.url, {
    headers: {
      ...headers,
    },
    params: {
      ...params,
    },
  });

  if (getOptions?.attachResponseToReports) {
    testInfo.annotations.push(
      {
        type: "Status Code",
        description: String(await response.status()),
      },
      {
        type: "API Response",
        description: JSON.stringify(await response.json()),
      },
    );
  }

  return response;
}
