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








