import { GraphAI } from "graphai";
import { slackAgent } from "@graphai/slack_agent";

const graph_data = {
    version: 0.5,
    nodes: {
      node1: {
        value: "hello, GraphAI",
      },
      node2: {
        agent: "slackAgent",
        inputs: { message: ":node1" },
        params: { post_channel: "#amaterasu" },
        isResult: true,
      },
    },
  };

const agents = { slackAgent };

const graph = new GraphAI(graph_data, agents);
graph.run().then((r) => {console.log(r)});