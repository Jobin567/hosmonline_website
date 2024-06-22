var db=require('../config/connection')
var collection=require('../config/collections')
var objectId=require('mongodb').ObjectID
module.exports={
    addCardiology:(cardiology,callback)=>{
        
        db.get().collection('cardiology').insertOne(cardiology).then((data)=>{
            console.log(data);
            callback(data.ops[0]._id)
        })
    },
    getAllcardiology:()=>{
        return new Promise(async(resolve,reject)=>{
            let cardiologys=await db.get().collection(collection.CARDIOLOGY_COLLECTION).find().toArray()
            resolve(cardiologys)
        })
    },
    deleteCardiology:(cardiologyId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.CARDIOLOGY_COLLECTION).removeOne({_id:objectId(cardiologyId)}).then((response)=>{
                //console.log(response);
                resolve(response)
            })
        })
    
    }
}