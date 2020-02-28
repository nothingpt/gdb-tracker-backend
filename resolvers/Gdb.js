// resolvers\Gdb.js

const mongoose = require('mongoose');
const moment = require('moment');
const { GraphQLDate } = require('graphql-iso-date');

const Gdb = require('../models/gdb');

const resolvers = {
  Date: GraphQLDate,
  Query: {
    gdbs: async () => await Gdb.find({}),
    gdb: async (parenct, args) => {
      const results = await Gdb.find({ rfaid: args.rfaid }, (err, results) => {
        if (err) return err;

        return results;
      })

      return results;
    },
    status: async (parent, args) => {
      const results = await Gdb.find({}, (err, statuses) => {
        if (err) return err;
      }).distinct('status');

      return results;
    }
  },
  Mutation: {
    createGdb: async (parent, args, ctx, info) => {
      const { project, rfaid, description, status } = args;
      var created;
      var updated = moment().format("YYYY-MM-DD");

      if (!args.created || created == undefined) {
        created = moment().format("YYYY-MM-DD");
      } else {
        created = args.created;
      }

      let { notes } = args;

      const newGdb = new Gdb({
        project: project.toUpperCase(),
        rfaid: rfaid.toUpperCase(),
        description,
        status,
        args,
        created,
        updated
      });

      newGdb.notes.push(notes);

      const error = await newGdb.save();

      if (error) return error;

      return newGdb;
    },
    updateStatus: async (parent, {rfaid, status}, ctx, info) => {
      const result = await Gdb.findOneAndUpdate({rfaid}, {status}, {new: true}, (err, gdb) => {
        if (err) return err;
      })

      return result;
    }
  }
}

module.exports = resolvers;
