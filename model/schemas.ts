import { z } from "zod";

const UserDetails = z.object({
  id: z.number(),
  email: z.string().email(),
  first_name: z.string(),
  last_name: z.string(),
  avatar: z.string().url(),
});

export const UserDataDetails = z.object({
  data: UserDetails,
});

export const UsersPerPageDetails = z.object({
  page: z.number(),
  per_page: z.number(),
  total: z.number(),
  total_pages: z.number(),
  data: z.array(UserDetails),
});

export const UserResponse = z.object({
  name: z.string(),
  job: z.string(),
  id: z.string(),
  createdAt: z.string().datetime(),
});

export const UpdatedUserResponse = z.object({
  name: z.string(),
  job: z.string(),
  updatedAt: z.string().datetime(),
});
