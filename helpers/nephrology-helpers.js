var db=require('../config/connection')
var collection=require('../config/collections')
var objectId=require('mongodb').ObjectID
module.exports={
    addNephrology:(nephrology,callback)=>{
        
        db.get().collection('nephrology').insertOne(nephrology).then((data)=>{
            console.log(data);
            callback(data.ops[0]._id)
        })
    },
    getAllnephrology:()=>{
        return new Promise(async(resolve,reject)=>{
            let nephrologys=await db.get().collection(collection.NEPHROLOGY_COLLECTION).find().toArray()
            resolve(nephrologys)
        })
    },
    deleteNephrology:(nephrologyId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.NEPHROLOGY_COLLECTION).removeOne({_id:objectId(nephrologyId)}).then((response)=>{
                //console.log(response);
                resolve(response)
            })
        })
    }
}