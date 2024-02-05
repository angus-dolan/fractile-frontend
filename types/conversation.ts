interface IMessageNode {
  type: "message";
  id: string;
}

interface IRefNode {
  type: "ref";
  id: string;
  ref: string;
  meta: string;
}

type Node = IMessageNode | IRefNode;
type NodeId = string;

class ContextGraph {
  private nodes: Record<NodeId, Node> = {};
  private edges: Record<NodeId, NodeId[]> = {};

  public addNode(node: Node): void {
    if (!this.nodes[node.id]) {
      this.nodes[node.id] = node;
      this.edges[node.id] = [];
    }
  }

  public addEdge(sourceId: NodeId, targetId: NodeId): void {
    if (!this.nodes[sourceId] || !this.nodes[targetId]) {
      throw new Error("One or both of the specified nodes do not exist in the graph");
    }
    this.edges[sourceId].push(targetId);
  }

  public getNode(id: NodeId): Node | undefined {
    return this.nodes[id];
  }

  public getNeighbors(id: NodeId): Node[] {
    return this.edges[id]?.map((nodeId) => this.nodes[nodeId]) || [];
  }
}

// ContextGraph
// Usage:
// const graph = new ContextGraph();
// graph.addNode({ type: "message", id: "message1" });
// graph.addNode({ type: "ref", id: "ref1", ref: "Context A", meta: "" });
// graph.addNode({ type: "ref", id: "ref2", ref: "Context B", meta: "" });

// graph.addEdge("message1", "ref1");
// graph.addEdge("message1", "ref2");

// const messageNode = graph.getNode("message1");
// console.log(messageNode);
// console.log(messageNode.type);

// const neighborsOfMessage1 = graph.getNeighbors("message1");
// console.log(neighborsOfMessage1);

type Message = {
  id?: string;
  is_human?: boolean;
  created_at?: Date;
  text: string;
  reasoning?: string;
};

type Conversation = {
  id: number;
  user_id: number;
  title: string;
  created_at: Date;
  // context?: ContextGraph;
  messages: Message[];
};

export { ContextGraph };
export type { Message, Conversation };
