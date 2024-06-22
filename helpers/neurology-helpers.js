var db=require('../config/connection')
var collection=require('../config/collections')
var objectId=require('mongodb').ObjectID
module.exports={
    addNeurology:(neurology,callback)=>{
        
        db.get().collection('neurology').insertOne(neurology).then((data)=>{
            console.log(data);
            callback(data.ops[0]._id)
        })
    },
    getAllneurology:()=>{
        return new Promise(async(resolve,reject)=>{
            let neurologys=await db.get().collection(collection.NEUROLOGY_COLLECTION).find().toArray()
            resolve(neurologys)
        })
    },
    deleteNeurology:(neurologyId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.NEUROLOGY_COLLECTION).removeOne({_id:objectId(neurologyId)}).then((response)=>{
                //console.log(response);
                resolve(response)
            })
        })
    }
}