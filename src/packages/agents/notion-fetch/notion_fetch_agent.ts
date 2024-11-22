import { AgentFunction, AgentFunctionInfo } from "graphai";
import { Client } from '@notionhq/client'

export const notionFetchAgent: AgentFunction = async ({ params, namedInputs }) => {
  const token = process.env.NOTION_TOKEN ?? namedInputs.slack_token;
  const dbId = process.env.NOTION_DB ?? namedInputs.slack_token;
  if (!token) {
    throw new Error("NOTION_TOKEN is not set in environment variables.");
  }
  if (!dbId) {
    throw new Error("Notion DB ID is not set in params.");
  }

  const message = namedInputs.message ?? params.message;
  const text = Array.isArray(message) ? message.join("\n") : message;
  const notion = new Client({
    auth: token
  })
  const pages = await notion.databases.query({
    database_id: dbId,
    filter: {
      property: '担当者',
     "people": {
      "contains": "96cc51c1-6074-4730-8fc5-a22ec9028aa7"
    }
    }
  })
  const results = pages.results.map(page => {return {title: page['properties']['Name']['title'][0]['plain_text'], id: page.id}});
  return results;
};

const notionFetchAgentInfo: AgentFunctionInfo = {
  name: "notionFetchAgent",
  agent: notionFetchAgent,
  mock: notionFetchAgent,

  samples: [],
  description: "Notion fetch agent",
  category: ["messaging"],
  author: "Receptron team",
  repository: "https://github.com/receptron/graphai",
  license: "MIT",
};

export default notionFetchAgentInfo;