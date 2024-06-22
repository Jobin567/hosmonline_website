var db=require('../config/connection')
var collection=require('../config/collections')
var objectId=require('mongodb').ObjectID
module.exports={
    addOp:(op,callback)=>{
        
        db.get().collection('op').insertOne(op).then((data)=>{
            console.log(data);
            callback(data.ops[0]._id)
        })
    },
    getAllop:()=>{
        return new Promise(async(resolve,reject)=>{
            let ops=await db.get().collection(collection.OP_COLLECTION).find().toArray()
            resolve(ops)
        })
    },
    deleteOp:(opId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.OP_COLLECTION).removeOne({_id:objectId(opId)}).then((response)=>{
                //console.log(response);
                resolve(response)
            })
        })
    }
}