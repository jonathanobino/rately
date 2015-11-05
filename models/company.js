const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    dateAdded: {type: Date, default: Date.now},
    name: String,
    address: String,
    comments:[{
    	text: String,
    	address: String,
    	rating: Number,
    	project: String,
    	dateAdded: {type: Date, default: Date.now},
    	user: {name:String, id:String}
    }]
});

const company = module.exports.raw = mongoose.model('Company', companySchema);

var comment = module.exports.comment = (companyId,comment) =>{
    return new Promise((resolve,reject)=>{
        company.findOne({_id:companyId})
        .exec((err,cmp) => {
            cmp.comments.push(comment);
            cmp.save((err, response) => {
                if(err) reject(err)
                else    resolve(response);
            });
        })
    })
}

var search = module.exports.searchByRegex = regex =>{
    return new Promise((resolve,reject)=>{
        regex = new RegExp(regex , "ig");
        company.find({name:regex})
        .limit(10)
        .select('name address')
        .exec((err,response) => {
                if(err) reject(err);
                else resolve(response);
            });
    })
}

var getById = module.exports.getById = companyId =>{
    return new Promise((resolve,reject)=>{
        company.findOne({
            _id:companyId
        })
        .exec((err,response) => {
            if(err) reject(err);
            else {
                var total = response.comments.reduce((prev,curr) =>{
                    prev += curr.rating;
                    return prev;
                },0);
                response = response.toObject();
                response.media = total / response.comments.length;
                resolve(response);
            }
        })
    })
}

var insert = module.exports.insertNew = newCompany => {
    return new Promise((resolve,reject) => {
        new company(newCompany)
            .save((err,response)=>{
                if(err) reject(err);
                else resolve(response);
            })
    })
}

var findByCommentId = module.exports.findByCommentId = id =>{
    return new Promise((resolve,reject)=>{
        company.findOne({'comments._id':id})
        .select('comments')
        .exec((err,response)=>{
            if(err) reject(err);
            else resolve(response);
        })
    })
}
