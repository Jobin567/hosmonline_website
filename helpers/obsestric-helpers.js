var db=require('../config/connection')
var collection=require('../config/collections')
var objectId=require('mongodb').ObjectID
module.exports={
    addObsestric:(obsestric,callback)=>{
        
        db.get().collection('obsestric').insertOne(obsestric).then((data)=>{
            console.log(data);
            callback(data.ops[0]._id)
        })
    },
    getAllobsestric:()=>{
        return new Promise(async(resolve,reject)=>{
            let obsestrics=await db.get().collection(collection.OBSESTRIC_COLLECTION).find().toArray()
            resolve(obsestrics)
        })
    },
    deleteObsestric:(obsestricId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.OBSESTRIC_COLLECTION).removeOne({_id:objectId(obsestricId)}).then((response)=>{
                //console.log(response);
                resolve(response)
            })
        })
    }
    
}