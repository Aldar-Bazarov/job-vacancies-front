import { FetchPostError } from "./errors";
import { Post, TestContext } from "./types";
import { AxiosBuilder, unpack } from "../../infrastructure";

const axios = new AxiosBuilder()
  .addBusinessErrorHandler()
  .addNotFoundErrorHandler()
  .build();

export async function fetchPostTest(context: TestContext): Promise<Post> {
  const { id } = context;
  try {
    const response = await axios.get<Post>(`/posts/${id}`);
    return unpack(response);
  } catch (err) {
    throw new FetchPostError(context, err as Error);
  }
}
