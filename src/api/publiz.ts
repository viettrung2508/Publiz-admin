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
  photoUrl: string;
};
export type TagType = "SYSTEM" | "DEFAULT";
export type Taxonomy = {
  id: number;
  name: string;
  slug: string;
  type: TagType;
  organizationId?: number;
  userId: number;
};
export type CreateTaxonomyInput = {
  name: string;
  slug: string;
};
export type Organization = {
  id: number;
  name: string;
  slug: string;
  description: string;
  metadata: {
    email: string,
    phone: string,
    cover?: {
      src: string;
    } | null;
    avatar?: {
      src: string;
    } | null;
    website: string,
    metaSchemaId: number,
  };

  verified: boolean;
  ownerId: number;
};
export type CreateOrganizationInput = {
  name: string;
  description: string;
  // metadata: {
  //   avatar?: {
  //     src: string;
  //   } | null;
  // };
};
export type MetaType = "SYSTEM" | "DEFAULT";

export type MetaSchema = {
  id: number;
  name: string;
  version: number;
  target: string;
  isDefault: boolean;
  type: MetaType;
  organizationId?: number;
  schema: {
    type: string;
    properties: {
      excerpt: {
        type: string;
        maxLength: number;
      };
      featuredImage: {
        type: string;
        properties: {
          src: {
            type: string;
          }
        }
        additionalProperties: boolean;
      }

    }
    additionalProperties: boolean
  }
  createdAt: string;
  updatedAt: string;
};
export type MetadataSchema = {
  type: string;
  required: string[];
  properties: Record<
    string,
    {
      type: string;
      [key: string]: string;
    }
  >;
};
export const getMetaSchemas = () =>
  publizClient.get("api/v1/meta_schemas").json<BaseResponse<MetaSchema[]>>();

export const getTaxonomies = () =>
  publizClient.get("api/v1/taxonomies").json<BaseResponse<Taxonomy[]>>();

export const createTaxonomy = (input: CreateTaxonomyInput) => {
  return publizClient
    .post("admin/api/v1/taxonomies", { json: input })
    .json<BaseResponse<Taxonomy>>();
};
export const getOrganization = () =>
  publizClient.get("api/v1/organizations").json<BaseResponse<Organization[]>>();
export const updateTaxonomies = (
  id: number,
  input: CreateTaxonomyInput
) => {
  return publizClient
    .put(`admin/api/v1/taxonomies/${id}`, { json: input })
    .json<BaseResponse<Taxonomy>>();
};


export const createOrganization = (input: CreateOrganizationInput) => {
  return publizClient
    .post("https://techgoda-publiz-dev.fibotree.com/api/v1/organizations", { json: input })
    .json<BaseResponse<Organization>>();
};
// export const updateOrganization = (
//   id: number,
//   input: CreateOrganizationInput
// ) => {
//   return publizClient
//     .put(`admin/api/v1/organizations/${id}`, { json: input })
//     .json<BaseResponse<Organization>>();
// };

export type Tag = {
  id: number;
  name: string;
  slug: string;
  type: TagType;
  organizationId?: number;
  userId: number;
  taxonomyId: number;
};

export const getTags = () =>
  publizClient.get("api/v1/tags").json<BaseResponse<Tag[]>>();


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
    .post("/api/v1/tags", { json: input })
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
  publizClient.get("api/v1/users/my_profile").json<BaseResponse<User>>();








