const Enquiry = require('../models/enquiryModel');

const factory = require('./handlerFactory');

exports.getAllEnquiries = factory.getAll(Enquiry);
exports.getEnquiry = factory.getOne(Enquiry);
exports.createEnquiry = factory.createOne(Enquiry);
exports.updateEnquiry = factory.updateOne(Enquiry);
exports.deleteEnquiry = factory.deleteOne(Enquiry);
