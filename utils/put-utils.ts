import { APIRequestContext, APIResponse, TestInfo } from "@playwright/test";
import { PutMethodOptions } from "../model/restapi-options";

export async function performPutOperation(
	request: APIRequestContext,
	testInfo: TestInfo,
	putOptions: PutMethodOptions
) {
	if (putOptions?.data && putOptions?.form && putOptions?.multipart) {
		throw new Error(
			"Please provide data, form or multipart to PUT request body"
		);
	}

	const headers = putOptions?.headers
		? putOptions.headers
		: {
			"Content-Type": "application/json",
			Accept: "application/json",
		};
	const params = putOptions?.params ? putOptions.params : {};
	if (putOptions?.attachRequestToReports && putOptions?.data) {
		testInfo.annotations.push({
			type: "Request Body",
			description: putOptions.data,
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
	if (putOptions?.data) {
		apiContext = { ...apiContext, ...{ data: putOptions.data } };
	}
	if (putOptions?.form) {
		apiContext = { ...apiContext, ...{ form: putOptions.form } };
	}
	if (putOptions?.multipart) {
		apiContext = { ...apiContext, ...{ multipart: putOptions.multipart } };
	}
	const response: APIResponse = await request.put(putOptions.url, apiContext);

	if (putOptions?.attachResponseToReports) {
		testInfo.annotations.push(
			{
				type: "Status Code",
				description: String(await response.status()),
			},
			{
				type: "API Response",
				description: JSON.stringify(await response.json()),
			}
		);
	}

	return response;
}
