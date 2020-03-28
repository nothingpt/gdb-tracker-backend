const typeDefs = `
  scalar Date

  input NoteInput {
    created: Date,
    note: String
  }

  type Note {
    created: Date,
    note: String!
  }

  type Gdb {
    _id: ID
    project: String!
    rfaid: String!
    description: String!
    status: String!
    notes: [Note]
    created: Date
    updated: Date
  }

  type Query {
    gdb(rfaid: String!): Gdb
    gdbs: [Gdb]!
    status: [String]!
    projects: [String]!
  }

  type Mutation {
    createGdb(
      project: String!,
      rfaid: String!,
      description: String!,
      status: String!,
      notes: NoteInput,
      created: Date
    ): Gdb
    updateStatus(
      rfaid: String!
      status: String!
    ): Gdb
  }
`;

module.exports = typeDefs;
