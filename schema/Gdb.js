const typeDefs = `
  scalar Date

  input NoteInput {
    created: Date,
    note: String
  }

  type Note {
    created: Date,
    note: String!,  
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
    gdbs(project: String, status: String, sort: String, searchRFA: String, offset: Int): [Gdb]!
    totalCountFilter(project: String, status: String, searchRFA: String): Int!
    status: [String]!
    projects: [String]!
    getTotalGDBs: Int!
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
    updateGdb(
      _id: String!
      project: String
      rfaid: String
      status: String
      created: Date,
      updated: Date,
      description: String,
      notes: [NoteInput]
    ): Gdb
    updateStatus(
      _id: String!
      rfaid: String!
      status: String!
    ): Gdb
  }
`;

module.exports = typeDefs;
