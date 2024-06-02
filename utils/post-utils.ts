import { APIRequestContext, APIResponse, TestInfo } from "@playwright/test";
import { PostMethodOptions } from "../model/restapi-options";

export async function performPostOperation(
	request: APIRequestContext,
	testInfo: TestInfo,
	postOptions: PostMethodOptions
) {
	if (postOptions?.data && postOptions?.form && postOptions?.multipart) {
		throw new Error(
			"Please provide data, form or multipart to POST request body"
		);
	}

	const headers = postOptions?.headers
		? postOptions.headers
		: {
			"Content-Type": "application/json",
			Accept: "application/json",
		};
	const params = postOptions?.params ? postOptions.params : {};
	if (postOptions?.attachRequestToReports && postOptions?.data) {
		testInfo.annotations.push({
			type: "Request Body",
			description: postOptions.data,
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
	if (postOptions?.data) {
		apiContext = { ...apiContext, ...{ data: postOptions.data } };
	}
	if (postOptions?.form) {
		apiContext = { ...apiContext, ...{ form: postOptions.form } };
	}
	if (postOptions?.multipart) {
		apiContext = { ...apiContext, ...{ multipart: postOptions.multipart } };
	}
	const response: APIResponse = await request.post(postOptions.url, apiContext);

	if (postOptions?.attachResponseToReports) {
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
