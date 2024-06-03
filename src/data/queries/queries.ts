import type { MediaType } from "@model/query-types";

export const getSiteStatistics = (): string => {
  return `query getSiteStatistics{
        SiteStatistics {
          anime {
            edges {
              node {
                date
                count
                change
              }
            }
            pageInfo {
              total
              currentPage
            }
          }
        }
      }
      `;
};

export const saveMediaListEntry = () => {
  return `mutation saveMediaListEntry($mediaId: Int, $status: MediaListStatus) {
    SaveMediaListEntry(mediaId: $mediaId, status: $status) {
      id
      status

    }
  }`;
};

export const getMediaDetailsForAnimeByID = (type: MediaType): string => {
  return `query getMediaById($id: Int) {
    Media(id:$id, type:${type}) {
      title {
        romaji
        english
        native
        userPreferred
      }
      type
      description
    }
  }`;
};
