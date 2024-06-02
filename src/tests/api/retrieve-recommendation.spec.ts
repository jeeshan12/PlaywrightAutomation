import { test, expect } from "@playwright/test";
import { performGraphQLOperation } from "src/utils/graphql-utils";
import type { GraphQLOptions } from "src/model/graphql-options";
import {
  getSiteStatistics,
  getMediaDetailsForAnimeByID,
  saveMediaListEntry,
} from "src/data/queries/queries";

test.use({
  screenshot: "off",
});
test.describe("GraphQL Operations", async () => {
  test.use({
    baseURL: "https://graphql.anilist.co",
  });
  test(
    "Get Site Statistics",
    {
      tag: "@api",
      annotation: {
        type: "GraphQL",
        description: "Site statistics",
      },
    },
    async ({ request }, testInfo) => {
      const options: GraphQLOptions = {
        url: "/",
        query: getSiteStatistics(),
        attachRequestToReports: true,
        attachResponseToReports: true,
      };
      const response = await performGraphQLOperation(
        request,
        options,
        testInfo,
      );
      await expect(response).toBeOK();
    },
  );

  test(
    "Get Media Details by Id for Anime",
    {
      tag: "@api",
    },
    async ({ request }, testInfo) => {
      const options: GraphQLOptions = {
        url: "/",
        query: getMediaDetailsForAnimeByID("ANIME"),
        queryVariables: {
          id: 15125,
        },
        attachRequestToReports: true,
        attachResponseToReports: true,
      };
      const response = await performGraphQLOperation(
        request,
        options,
        testInfo,
      );
      await expect(response).toBeOK();
      const mediaResponseJSON = (await response.json()).data.Media;
      expect.soft(mediaResponseJSON.title.english).toBe("Teekyuu");
      expect.soft(mediaResponseJSON.title.userPreferred).toBe("Teekyuu");
      expect.soft(mediaResponseJSON.type).toBe("ANIME");
    },
  );

  test.fixme(
    "Save  Media List Entry",
    {
      tag: "@api",
    },
    async ({ request }, testInfo) => {
      const options: GraphQLOptions = {
        url: "/",
        query: saveMediaListEntry(),
        headers: {
          "Content-Type": "application/json",
          Authorization: "<<Provide Token>>",
        },
        queryVariables: {
          mediaId: 1,
          status: "PLANNING",
        },
        attachRequestToReports: true,
        attachResponseToReports: true,
      };
      const response = await performGraphQLOperation(
        request,
        options,
        testInfo,
      );
      await expect(response).toBeOK();
      const saveMediaListEntryJSON = (await response.json()).data
        .SaveMediaListEntry;
      expect.soft(saveMediaListEntryJSON.status).toBe("PLANNING");
    },
  );
});
