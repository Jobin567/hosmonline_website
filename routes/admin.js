var express = require('express');
const { render } = require('../app')
var router = express.Router();
var productHelper=require('../helpers/product-helpers');
const productHelpers = require('../helpers/product-helpers');
var opHelper=require('../helpers/op-helpers');
const opHelpers = require('../helpers/op-helpers');
var dermatologyHelper=require('../helpers/dermatology-helpers');
const dermatologyHelpers = require('../helpers/dermatology-helpers');
var cardiologyHelper=require('../helpers/cardiology-helpers');
const cardiologyHelpers = require('../helpers/cardiology-helpers');
var neurologyHelper=require('../helpers/neurology-helpers');
const neurologyHelpers = require('../helpers/neurology-helpers');
var nephrologyHelper=require('../helpers/nephrology-helpers');
const nephrologyHelpers = require('../helpers/nephrology-helpers');
var obsestricHelper=require('../helpers/obsestric-helpers');
const obsestricHelpers = require('../helpers/obsestric-helpers');
const BookHelpers = require('../helpers/book-helpers');
var adminHelper=require('../helpers/admin-helpers');
const adminHelpers = require('../helpers/admin-helpers');
var labHelper=require('../helpers/lab-helpers');
const labHelpers = require('../helpers/lab-helpers');
const userHelpers = require('../helpers/user-helpers');
var userHelper=require('../helpers/user-helpers');

const verifyALogin=(req,res,next)=>{
  if(req.session.admin.loggedIn){
    next()
  }else{
    res.redirect('/adminLogin')
  }
}
/* GET users listing. */
router.get('/', function(req, res, next) {
  
  productHelpers.getAllProducts().then((products)=>{
    console.log(products);
    res.render('admin/front',{admin:true,products});
  }) 
  
});
router.get('/o', function(req, res, next) {
  
opHelpers.getAllop().then((ops)=>{
  console.log(ops);
  res.render('admin/view-o',{admin:true,ops});
})
});
router.get('/p', function(req, res, next) {
  
  cardiologyHelpers.getAllcardiology().then((cardiologys)=>{
    console.log(cardiologys);
    res.render('admin/view-o',{admin:true,cardiologys});
  })
  });
  router.get('/q', function(req, res, next) {
    
    dermatologyHelpers.getAlldermatology().then((dermatologys)=>{
      console.log(dermatologys);
      res.render('admin/view-o',{admin:true,dermatologys});
    })
    });
    router.get('/r', function(req, res, next) {
      
      neurologyHelpers.getAllneurology().then((neurologys)=>{
        console.log(neurologys);
        res.render('admin/view-o',{admin:true,neurologys});
      })
      });
      router.get('/s', function(req, res, next) {
        
        nephrologyHelpers.getAllnephrology().then((nephrologys)=>{
          console.log(nephrologys);
          res.render('admin/view-o',{admin:true,nephrologys});
        })
        });
        router.get('/t', function(req, res, next) {
          
          obsestricHelpers.getAllobsestric().then((obsestrics)=>{
            console.log(obsestrics);
            res.render('admin/view-o',{admin:true,obsestrics});
          })
          });
          router.get('/u', function(req, res, next) {
            
            productHelpers.getAllProducts().then((products)=>{
              console.log(products);
              res.render('admin/view-products',{admin:true,products});
            })
            });
            router.get('/v', function(req, res, next) {
              
              labHelpers.getAllLabs().then((labs)=>{
                console.log(labs);
                res.render('admin/view-labs',{admin:true,labs});
              })
              });
              
              
              
              
              
              
              
              router.get("/allOrders",async function(req,res){
                let orders = await adminHelpers.getUserOrders()
                res.render("admin/all-orders",{admin:true, orders})
              })
              
              
              router.get("/allUsers",async (req,res)=>{
                let users=await adminHelpers.getAllUsers(req.session)
                res.render("admin/all-users",{admin:true,users})
              })
              
router.get('/add-product',function(req,res){
  res.render('admin/add-product',{admin:true})
})

router.post('/add-product',(req,res)=>{

productHelpers.addProduct(req.body,(id)=>{
  
    res.redirect("/admin")
 
  
  
})
})
router.get('/add-lab',function(req,res){
  res.render('admin/add-lab',{admin:true})
})
router.post('/add-lab',(req,res)=>{

labHelpers.addLab(req.body,(id)=>{
  let image=req.files.Image
  image.mv('./public/lab-images/'+id+'.jpg',(err,done)=>{
    if(!err){
      res.redirect("/admin")
    }else{
      console.log(err);
    }
  })
  
})
})
router.get('/add-appointment',function(req,res){
  res.render('admin/add-appointment',{admin:true})
})
router.post('/add-appointment',(req,res)=>{

opHelpers.addOp(req.body,(id)=>{
  let image=req.files.Image
  image.mv('./public/op-images/'+id+'.jpg',(err,done)=>{
    if(!err){
      res.redirect("/admin")
    }else{
      console.log(err);
    }
  })
  
})
})
router.get('/add-cardiology',function(req,res){
  res.render('admin/add-cardiology',{admin:true})
})
router.post('/add-cardiology',(req,res)=>{

cardiologyHelpers.addCardiology(req.body,(id)=>{
  let image=req.files.Image
  image.mv('./public/cardiology-images/'+id+'.jpg',(err,done)=>{
    if(!err){
      res.redirect("/admin")
    }else{
      console.log(err);
    }
  })
  
})
})
router.get('/add-dermatology',function(req,res){
  res.render('admin/add-dermatology',{admin:true})
})
router.post('/add-dermatology',(req,res)=>{

dermatologyHelpers.addDermatology(req.body,(id)=>{
  let image=req.files.Image
  image.mv('./public/dermatology-images/'+id+'.jpg',(err,done)=>{
    if(!err){
      res.redirect("/admin")
    }else{
      console.log(err);
    }
  })
  
})
})
router.get('/add-neurology',function(req,res){
  res.render('admin/add-neurology',{admin:true})
})
router.post('/add-neurology',(req,res)=>{

neurologyHelpers.addNeurology(req.body,(id)=>{
  let image=req.files.Image
  image.mv('./public/neurology-images/'+id+'.jpg',(err,done)=>{
    if(!err){
      res.redirect("/admin")
    }else{
      console.log(err);
    }
  })
  
})
})
router.get('/add-nephrology',function(req,res){
  res.render('admin/add-nephrology',{admin:true})
})
router.post('/add-nephrology',(req,res)=>{

nephrologyHelpers.addNephrology(req.body,(id)=>{
  let image=req.files.Image
  image.mv('./public/nephrology-images/'+id+'.jpg',(err,done)=>{
    if(!err){
      res.redirect("/admin")
    }else{
      console.log(err);
    }
  })
  
})
})
router.get('/add-obsestric',function(req,res){
  res.render('admin/add-obsestric',{admin:true})
})
router.post('/add-obsestric',(req,res)=>{

obsestricHelpers.addObsestric(req.body,(id)=>{
  let image=req.files.Image
  image.mv('./public/obsestric-images/'+id+'.jpg',(err,done)=>{
    if(!err){
      res.redirect("/admin")
    }else{
      console.log(err);
    }
  })
  
})
})
router.get('/delete-product/:id',(req,res)=>{
  let proId=req.params.id
   console.log(proId);
   productHelpers.deleteProduct(proId).then((response)=>{
    res.redirect('/admin/u')
   })
   
})
router.get('/delete-lab/:id',(req,res)=>{
  let labId=req.params.id
   console.log(labId);
   labHelpers.deleteLab(labId).then((response)=>{
    res.redirect('/admin/v')
   })
   
})
router.get('/delete-op/:id',(req,res)=>{
  let opId=req.params.id
   console.log(opId);
   opHelpers.deleteOp(opId).then((response)=>{
    res.redirect('/admin/o')
   })
   
})
router.get('/delete-cardiology/:id',(req,res)=>{
  let cardiologyId=req.params.id
   console.log(cardiologyId);
   cardiologyHelpers.deleteCardiology(cardiologyId).then((response)=>{
    res.redirect('/admin/p')
   })
   
})
router.get('/delete-dermatology/:id',(req,res)=>{
  let dermatologyId=req.params.id
   console.log(dermatologyId);
   dermatologyHelpers.deleteDermatology(dermatologyId).then((response)=>{
    res.redirect('/admin/q')
   })
   
})
router.get('/delete-neurology/:id',(req,res)=>{
  let neurologyId=req.params.id
   console.log(neurologyId);
   neurologyHelpers.deleteNeurology(neurologyId).then((response)=>{
    res.redirect('/admin/r')
   })
   
})
router.get('/delete-nephrology/:id',(req,res)=>{
  let nephrologyId=req.params.id
   console.log(nephrologyId);
   nephrologyHelpers.deleteNephrology(nephrologyId).then((response)=>{
    res.redirect('/admin/s')
   })
   
})
router.get('/delete-obsestric/:id',(req,res)=>{
  let obsestricId=req.params.id
   console.log(obsestricId);
   obsestricHelpers.deleteObsestric(obsestricId).then((response)=>{
    res.redirect('/admin/t')
   })
   
})

router.get('/orders',async(req,res)=>{
  let orders=await userHelpers.getUserOrders()
  res.render('admin/orders',{orders,admin:true})
})



  

router.get('/department',function(req,res){
  res.render('admin/department',{admin:true})
})
router.post('/department',(req,res)=>{

productHelpers.addProduct(req.body,(id)=>{
  let image=req.files.Image
  image.mv('./public/product-images/'+id+'.jpg',(err,done)=>{
    if(!err){
      res.render("admin/add-product")
    }else{
      console.log(err);
    }
  })
  
})
})
router.get('/add-appointment',function(req,res){
  res.render('admin/add-appointment',{admin:true})
})

router.post('/add-appointment',(req,res)=>{

  opHelpers.addop(req.body,(id)=>{
    let image=req.files.Image
    image.mv('./public/op-images/'+id+'.jpg',(err,done)=>{
      if(!err){
        res.render("admin/department")
      }else{
        console.log(err);
      }
    })
    
  })
  })
  router.get('/add-dermatology',function(req,res){
    res.render('admin/add-dermatology',{admin:true})
  })
  
  router.post('/add-dermatology',(req,res)=>{
  
    dermatologyHelpers.adddermatology(req.body,(id)=>{
      let image=req.files.Image
      image.mv('./public/dermatology-images/'+id+'.jpg',(err,done)=>{
        if(!err){
          res.render("admin/add-department")
        }else{
          console.log(err);
        }
      })
      
    })
    })
    router.get('/add-cardiology',function(req,res){
      res.render('admin/add-cardiology',{admin:true})
    })
    
    router.post('/add-cardiology',(req,res)=>{
    
      cardiologyHelpers.addcardiology(req.body,(id)=>{
        let image=req.files.Image
        image.mv('./public/cardiology-images/'+id+'.jpg',(err,done)=>{
          if(!err){
            res.render("admin/add-department")
          }else{
            console.log(err);
          }
        })
        
      })
      })
      router.get('/add-neurology',function(req,res){
        res.render('admin/add-neurology',{admin:true})
      })
      
      router.post('/add-neurology',(req,res)=>{
      
        neurologyHelpers.addneurology(req.body,(id)=>{
          let image=req.files.Image
          image.mv('./public/neurology-images/'+id+'.jpg',(err,done)=>{
            if(!err){
              res.render("admin/add-neurology")
            }else{
              console.log(err);
            }
          })
          
        })
        })
        router.get('/add-nephrology',function(req,res){
          res.render('admin/add-nephrology',{admin:true})
        })

        
        router.post('/add-nephrology',(req,res)=>{
        
          nephrologyHelpers.addnephrology(req.body,(id)=>{
            let image=req.files.Image
            image.mv('./public/nephrology-images/'+id+'.jpg',(err,done)=>{
              if(!err){
                res.render("admin/add-nephrology")
              }else{
                console.log(err);
              }
            })
            
          })
          })
          router.get('/users',function(req,res){
            BookHelpers.getAllusers().then((books,user)=>{
    
              res.render('admin/users',{books,user,admin:true});
            
          })
        })
          
          router.get('/add-obsestric',function(req,res){
            res.render('admin/add-obsestric',{admin:true})
          })
          
          router.post('/add-obsestric',(req,res)=>{
          
            obsestricHelpers.addobsestric(req.body,(id)=>{
              let image=req.files.Image
              image.mv('./public/obsestric-images/'+id+'.jpg',(err,done)=>{
                if(!err){
                  res.render("admin/add-obsestric")
                }else{
                  console.log(err);
                }
              })
              
            })
            })
           
            
module.exports = router;