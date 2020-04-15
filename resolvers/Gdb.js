// resolvers\Gdb.js

const mongoose = require('mongoose');
const moment = require('moment');
const { GraphQLDateTime } = require('graphql-iso-date');

const Gdb = require('../models/gdb');

const resolvers = {
  Date: GraphQLDateTime,
  Query: {
    gdbs: async (parent, args) => {
      let sort = 'updated';
      if (args.sort) {
        sort = args.sort;
      }

      let {project, status, searchRFA} = args;

      if (!searchRFA) {
        searchRFA = '';
      }

      let results;

      if((!project || project.toUpperCase() === 'ALL') && (status && status !== 'NotClosed')) {
        results = await Gdb.find({status: status, rfaid:{ '$regex' : searchRFA, '$options' : 'i' }}).sort(sort)
      } else if ((!project || project.toUpperCase() === 'ALL') && status === 'NotClosed') {
        results = await Gdb.find({status: { $ne: "Closed"}, rfaid:{ '$regex' : searchRFA, '$options' : 'i' }}).sort(sort)
      } else if (project && (!status || status.toUpperCase() === 'ALL')) {
        results = await Gdb.find({project: project, rfaid:{ '$regex' : searchRFA, '$options' : 'i' }}).sort(sort)
      } else if (project && (status && status !== 'NotClosed')) {
        results = await Gdb.find({project: project, status: status, rfaid:{ '$regex' : searchRFA, '$options' : 'i' }}).sort(sort)
      } else if (project && status === 'NotClosed') {
        results = await Gdb.find({project: project, status: { $ne: "Closed"}, rfaid:{ '$regex' : searchRFA, '$options' : 'i' }}).sort(sort)
      } else if ((!project || project.toUpperCase() === 'ALL') && (!status || status.toUpperCase() === 'ALL') && searchRFA === '') {
        results = await Gdb.find({}).sort(sort)
      } else {
        results = await Gdb.find({rfaid:{ '$regex' : searchRFA, '$options' : 'i' }}).sort(sort)
      }

      return results
    },
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
    },
    projects: async (parent, args) => {
      const results = await Gdb.find({}, (err, projects) => {
        if (err) return err;
      }).distinct('project');

      return results;
    }
  },
  Mutation: {
    createGdb: async (parent, args, ctx, info) => {
      const { project, rfaid, description, status } = args;
      var created;
      var updated = moment();

      if (!args.created || created == undefined) {
        created = moment();
      } else {
        console.log(created)
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

      if (notes) {
        newGdb.notes.push(notes);
      }

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
