var db=require('../config/connection')
var collection=require('../config/collections')
var objectId=require('mongodb').ObjectID
module.exports={
    addLab:(lab,callback)=>{
        
        db.get().collection('lab').insertOne(lab).then((data)=>{
            console.log(data);
            callback(data.ops[0]._id)
        })
    },
    getAllLabs:()=>{
        return new Promise(async(resolve,reject)=>{
            let labs=await db.get().collection(collection.LAB_COLLECTION).find().toArray()
            resolve(labs)
        })
    },

deleteLab:(labId)=>{
    return new Promise((resolve,reject)=>{
        db.get().collection(collection.LAB_COLLECTION).removeOne({_id:objectId(labId)}).then((response)=>{
            //console.log(response);
            resolve(response)
        })
    })
},
getLabDetails:(labId)=>{
    return new Promise((resolve,reject)=>{  
        db.get().collection(collection.LAB_COLLECTION).findOne({_id:objectId(labId)}).then((lab)=>{
            resolve(lab)
        })
})
},
updateLab:(labId,labDetails)=>{
    return new Promise((resolve,reject)=>{  
        db.get().collection(collection.LAB_COLLECTION)
        .updateOne({_id:objectId(labId)},{
            $set:{
                Name:labDetails.Name,
                Description:labDetails.Description,
                Price:labDetails.Price,
                Category:labDetails.Category,
            }
        }).then((response)=>{
            resolve()
        })

})
}
}