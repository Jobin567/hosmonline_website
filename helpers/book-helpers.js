var db=require('../config/connection')
var collection=require('../config/collections')
var objectId=require('mongodb').ObjectID
module.exports={
    addUsers:(book,callback)=>{
        
        db.get().collection('booking').insertOne(book).then((data)=>{
            console.log(data);
            callback(data.ops[0]._id)
        })
    },
    getAllusers:()=>{
        return new Promise(async(resolve,reject)=>{
            let books=await db.get().collection(collection.BOOK_COLLECTION).find().toArray()
            resolve(books)
        })
    },
    deleteUsers:(bookId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.BOOK_COLLECTION).removeOne({_id:objectId(bookId)}).then((response)=>{
                //console.log(response);
                resolve(response)
            })
        })
    
    }
}