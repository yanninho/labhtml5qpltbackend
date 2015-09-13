'use strict';

var requireHelper = require('../require_helper')
  , feedModel = require('./modalite.model');

exports.seed = function() {
    var ObjectId = require('mongoose').Types.ObjectId;
    return feedModel.create(
    {
        "_id" : new ObjectId("5455f18e806f130183000001"),
        "nom" : "Tickets restaurants",
        "logo" : "ticketsResto.png"
    },

    /* 1 */
    {
        "_id" : new ObjectId("5455f18e806f130183000002"),
        "nom" : "Cheques dejeuner",
        "logo" : "chequesDejeuner.gif"
    },

    /* 2 */
    {
        "_id" : new ObjectId("5455f18e806f130183000003"),
        "nom" : "Cheques restaurants",
        "logo" : "chequeRestaurant.jpg"
    },

    /* 3 */
    {
        "_id" : new ObjectId("5455f18e806f130183000004"),
        "nom" : "Cheques de table",
        "logo" : "chequeDeTable.gif"
    }
    )                       
}