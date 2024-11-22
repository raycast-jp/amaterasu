import { GraphAI } from "graphai";
import {notionFetchAgent} from "./agents/notion-fetch/index";
const graph_data = {
    version: 0.5,
    nodes: {
      node1: {
        value: "hello, GraphAI",
      },
      node2: {
        agent: "notionFetchAgent",
        inputs: { message: ":node1" },
        params: { post_channel: "#amaterasu" },
        isResult: true,
      },
    },
  };

const agents = { notionFetchAgent };

const graph = new GraphAI(graph_data, agents);
graph.run().then((r) => {console.log(r)});