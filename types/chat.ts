interface IQueryPayload {
  msg: string;
  corpus_id?: string;
  k: string;
  mask: string;
  conversation_id?: string;
}

export type { IQueryPayload };
