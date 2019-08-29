const opportunityModel = require('../models/opportunities');

module.exports = {
    getById: function(req, res, next) {
        console.log(req.body);
        opportunityModel.findById(req.params.opportunityId, function(err, opportunityInfo) {
            if (err) {
                next(err);
            } else {
                res.json({ 
                    status:"success", 
                    message: "opportunity found", 
                    data: {opportunities: opportunityInfo}
                });
            }
        })
    },
    getAll: function(req, res, next) {
        let opportunitiesList = [];

        opportunityModel.find({}, function(err, opportunities) {
            if(err) {
                next(err);
            } else {
                for (let opportunity of opportunities) {
                    opportunitiesList.push({name: opportunity.name, status: opportunity.status});
                }
                res.json({status:"success", message: "Opportunities list found!!!", data:{opportunities: opportunitiesList}});
            }
        });
    },
    updateById: function(req, res, next) {
        opportunityModel.findByIdAndUpdate(req.params.opportunityId,{name:req.body.name}, function(err, opportunityInfo){
            if(err)
                next(err);
            else {
                res.json({status:"success", message: "Opportunity updated successfully!!!", data:null});
            }
        });
    },
    deleteById: function(req, res, next) {
        opportunityModel.findByIdAndRemove(req.params.opportunityId, function(err, opportunityInfo) {
            if(err)
                next(err);
            else {
                res.json({status:"success", message: "Opportunity deleted successfully!!!", data:null});
            }
        });
    },
    create: function(req, res, next) {
        opportunityModel.create({ name: req.body.name, status: req.body.status }, function (err, result) {
        if (err) 
            next(err);
        else
            res.json({status: "success", message: "Opportunity added successfully!!!", data: null});
        });
    }
}