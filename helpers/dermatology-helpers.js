var db=require('../config/connection')
var collection=require('../config/collections')
var objectId=require('mongodb').ObjectID
module.exports={
    addDermatology:(dermatology,callback)=>{
        
        db.get().collection('dermatology').insertOne(dermatology).then((data)=>{
            console.log(data);
            callback(data.ops[0]._id)
        })
    },
    getAlldermatology:()=>{
        return new Promise(async(resolve,reject)=>{
            let dermatologys=await db.get().collection(collection.DERMATOLOGY_COLLECTION).find().toArray()
            resolve(dermatologys)
        })
    },
    deleteDermatology:(dermatologyId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.DERMATOLOGY_COLLECTION).removeOne({_id:objectId(dermatologyId)}).then((response)=>{
                //console.log(response);
                resolve(response)
            })
        })
    }
}