import { articles } from "../../data/articles";

export async function GET() {
  return Response.json(articles);
}
