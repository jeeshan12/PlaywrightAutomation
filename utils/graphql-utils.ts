import {
	APIRequestContext,
	APIResponse,
	TestInfo,
} from "@playwright/test";
import { GraphQLOptions } from "../model/graphql-options";

export async function performGraphQLOperation(
	apiRequestContext: APIRequestContext,
	graphQLOptions: GraphQLOptions,
	testInfo: TestInfo
): Promise<APIResponse> {
	const headers = graphQLOptions?.headers
		? graphQLOptions.headers
		: {
			"Content-Type": "application/json",
			Accept: "application/json",
		};
	const graphQLVariables = graphQLOptions?.queryVariables
		? graphQLOptions.queryVariables
		: {};

	if (graphQLOptions?.attachRequestToReports) {
		testInfo.annotations.push({
			type: "GraphQL Query",
			description: graphQLOptions.query,
		});
	}
	const response = await apiRequestContext.post(graphQLOptions.url, {
		headers: {
			...headers,
		},
		data: {
			query: graphQLOptions.query,
			variables: {
				...graphQLVariables,
			},
		},
	});
	if (graphQLOptions?.attachResponseToReports) {
		testInfo.annotations.push(
			{
				type: "Status Code",
				description: String(await response.status()),
			},
			{
				type: "GraphQL Response",
				description: JSON.stringify(await response.json()),
			}
		);
	}
	return response;
}
