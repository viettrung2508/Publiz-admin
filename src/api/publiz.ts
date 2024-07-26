import ky from "ky";
import { firebaseAuth } from "./firebase";

export type BaseResponse<T> = {
  data: T;
};
export type User = {
  id: number;
  authId: string;
  displayName: string;
  avatarUrl?: string;
  coverUrl?: string;
};
export type TagType = "SYSTEM" | "DEFAULT";
export type Tag = {
  id: number;
  name: string;
  slug: string;
  type: TagType;
  organizationId?: number;
  userId: number;
  taxonomyId: number;
};
export type Taxonomy = {
  id: number;
  name: string;
  slug: string;
  type: TagType;
  organizationId?: number;
  userId: number;
};
export const getTags = () =>
  publizClient.get("https://publiz-techgoda.hieutran-fu7532.workers.dev/api/v1/tags").json<BaseResponse<Tag[]>>();

export const getTaxonomies = () =>
  publizClient.get("https://publiz-techgoda.hieutran-fu7532.workers.dev/api/v1/taxonomies").json<BaseResponse<Taxonomy[]>>();
export type CreateTagInput = {
  name: string;
  slug: string;
  type: TagType;
  organizationId?: number;
  userId: number;
  taxonomyId: number;
};
export const createTag = (input: CreateTagInput) => {
  return publizClient
    .post("https://publiz-techgoda.hieutran-fu7532.workers.dev/admin/api/v1/tags", { json: input })
    .json<BaseResponse<Tag>>();
};
export const publizClient = ky.extend({
  prefixUrl: import.meta.env.VITE_BASE_PUBLIZ_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        const token = await firebaseAuth.currentUser?.getIdToken();
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
  },
});

export const getMyProfile = () =>
  publizClient.get("https://publiz-techgoda.hieutran-fu7532.workers.dev/api/v1/users/my_profile").json<BaseResponse<User>>();








