var express = require('express');
var router = express.Router();
const productHelpers = require('../helpers/product-helpers');
const userHelpers = require('../helpers/user-helpers');
const opHelpers = require('../helpers/op-helpers');
const dermatologyHelpers = require('../helpers/dermatology-helpers');
const neurologyHelpers = require('../helpers/neurology-helpers');
const nephrologyHelpers = require('../helpers/nephrology-helpers');
const obsestricHelpers = require('../helpers/obsestric-helpers');
const cardiologyHelpers = require('../helpers/cardiology-helpers');
const labHelpers = require('../helpers/lab-helpers');
const verifyLogin=(req,res,next)=>{
  if(req.session.user.loggedIn){
    next()
  }else{
    res.redirect('/login')
  }
}
/* GET home page. */
router.get('/', async function(req, res, next) {
  let user=req.session.user
  console.log(user);
  let cartCount=null
  if(req.session.user){
  cartCount=await userHelpers.getCartCount(req.session.user._id)
  }
  productHelpers.getAllProducts().then((products)=>{
    
    res.render('user/view-products2',{products,user,cartCount});
  })
  
});
router.get('/view-products', async function(req, res, next) {
  let user=req.session.user
  console.log(user);
  let cartCount=null
  if(req.session.user){
  cartCount=await userHelpers.getCartCount(req.session.user._id)
  }
  productHelpers.getAllProducts().then((products)=>{
    
    res.render('user/view-products',{products,user,cartCount});
  })
  
});
router.get('/op', async function(req, res, next) {
  let user=req.session.user
  console.log(user);
  let cartCount=null
  if(req.session.user){
  cartCount=await userHelpers.getCartCount(req.session.user._id)
  }
  opHelpers.getAllop().then((ops)=>{
    
    res.render('user/op',{ops,user,cartCount});
  })
  
});
router.get('/dermatology', async function(req, res, next) {
  let user=req.session.user
  console.log(user);
  let cartCount=null
  if(req.session.user){
  cartCount=await userHelpers.getCartCount(req.session.user._id)
  }
  dermatologyHelpers.getAlldermatology().then((dermatologys)=>{
    
    res.render('user/dermatology',{dermatologys,user,cartCount});
  })
  
});
router.get('/cardiology', async function(req, res, next) {
  let user=req.session.user
  console.log(user);
  let cartCount=null
  if(req.session.user){
  cartCount=await userHelpers.getCartCount(req.session.user._id)
  }
  cardiologyHelpers.getAllcardiology().then((cardiologys)=>{
    
    res.render('user/cardiology',{cardiologys,user,cartCount});
  })
  
});
router.get('/view-labs', async function(req, res, next) {
  let user=req.session.user
  console.log(user);
  let cartCount=null
  if(req.session.user){
  cartCount=await userHelpers.getCartCount(req.session.user._id)
  }
  labHelpers.getAllLabs().then((labs)=>{
    
    res.render('user/view-labs',{labs,user,cartCount});
  })
  
});
router.get('/nephrology', async function(req, res, next) {
  let user=req.session.user
  console.log(user);
  let cartCount=null
  if(req.session.user){
  cartCount=await userHelpers.getCartCount(req.session.user._id)
  }
  nephrologyHelpers.getAllnephrology().then((nephrologys)=>{
    
    res.render('user/nephrology',{nephrologys,user,cartCount});
  })
  
});
router.get('/neurology', async function(req, res, next) {
  let user=req.session.user
  console.log(user);
  let cartCount=null
  if(req.session.user){
  cartCount=await userHelpers.getCartCount(req.session.user._id)
  }
  neurologyHelpers.getAllneurology().then((neurologys)=>{
    
    res.render('user/neurology',{neurologys,user,cartCount});
  })
  
});
router.get('/obsestric', async function(req, res, next) {
  let user=req.session.user
  console.log(user);
  let cartCount=null
  if(req.session.user){
  cartCount=await userHelpers.getCartCount(req.session.user._id)
  }
  obsestricHelpers.getAllobsestric().then((obsestrics)=>{
    
    res.render('user/obsestric',{obsestrics,user,cartCount});
  })
  
});
router.get('/login',(req,res)=>{
  if(req.session.user){
    res.redirect('/')
  }else{
  res.render('user/login',{'loginErr':req.session.userLoginErr})
  req.session.userLoginErr=false
  }
})
router.get('/signup',(req,res)=>{
  res.render('user/signup')
})
router.post('/signup',(req,res)=>{
  userHelpers.doSignup(req.body).then((response)=>{
   console.log(response);
  
    req.session.user=response
    req.session.user.loggedIn=true
    res.redirect('/')
  })
})
router.post('/login',(req,res)=>{
  userHelpers.doLogin(req.body).then((response)=>{
    if(response.status){
     
      req.session.user=response.user
      req.session.user.loggedIn=true
      res.redirect('/')
    }else{
      req.session.userLoginErr="Invalid username or password"
      res.redirect('/login')
    }
    })
})
router.get('/logout',(req,res)=>{
  req.session.user=null
  res.redirect('/')
})
router.get('/cart',verifyLogin,async(req,res)=>{
  let products=await userHelpers.getCartProducts(req.session.user._id)
  let totalValue=await userHelpers.getTotalAmount(req.session.user._id)
  console.log(products);
  res.render('user/cart',{products,user:req.session.user,totalValue})
  })  

router.get('/add-to-cart/:id',(req,res)=>{
  console.log("api call")
  userHelpers.addToCart(req.params.id,req.session.user._id).then(()=>{
    res.json({status:true})
  })
})
router.post('/change-product-quantity',(req,res,next)=>{
  console.log(req.body);
  userHelpers.changeProductQuantity(req.body).then(async(response)=>{
    response.total=await userHelpers.getTotalAmount(req.body.user)
     res.json(response)
  })
})
router.get('/place-order',verifyLogin,async(req,res)=>{
  let total=await userHelpers.getTotalAmount(req.session.user._id)
  res.render('user/place-order',{total,user:req.session.user})
})
router.get('/booking',verifyLogin,async(req,res)=>{
  
  res.render('user/booking',{user:req.session.user})
})
router.post('/place-order',async(req,res)=>{
  let products=await userHelpers.getCartProductList(req.body.userId)
  let totalPrice=await userHelpers.getTotalAmount(req.body.userId)
   userHelpers.placeOrder(req.body,products,totalPrice).then((orderId)=>{
    if(req.body['payment-method']=='COD'){
   res.json({codSuccess:true})
    }else{
    userHelpers.generateRazorpay(orderId,totalPrice).then((response)=>{
     res.json(response)
    })
    }
  })
  
  console.log(req.body);
})
router.post('/booking',async(req,res)=>{
  userHelpers.booking(req.body).then(()=>{
    res.json({codSuccess:true})
  })
  console.log(req.body);
})
router.get('/book-success',(req,res)=>{
  res.render('user/book-success',{user:req.session.user})
})
router.get('/about',(req,res)=>{
  res.render('user/about',{user:req.session.user})
})
router.get('/developer',(req,res)=>{
  res.render('user/developer',{user:req.session.user})
})
router.post('/book-success',(req,res)=>{
  res.render('/',{user:req.session.user})
})
router.get('/order-success',(req,res)=>{
  res.render('user/order-success',{user:req.session.user})
})
router.get('/books',async(req,res)=>{
  let books=await userHelpers.getBookOrders(req.session.user._id)
  res.render('user/books',{user:req.session.user,books})
})
router.get('/orders',async(req,res)=>{
  let orders=await userHelpers.getUserOrders(req.session.user._id)
  res.render('user/orders',{user:req.session.user,orders})
})
router.get('/view-book-products/:id',async(req,res)=>{
  let ops=await userHelpers.getBookProducts(req.params.id)
  res.render('user/view-book-products',{user:req.session.user,ops})
})
router.get('/view-order-products/:id',async(req,res)=>{
  let products=await userHelpers.getOrderProducts(req.params.id)
  res.render('user/view-order-products',{user:req.session.user,products})
})
router.post('/verify-payment',(req,res)=>{
  console.log(req.body);
  userHelpers.verifyPayment(req.body).then(()=>{
   userHelpers.changePaymentStatus(req.body['receipt']).then(()=>{
    console.log("Payment Successfull")
    res.json({status:true})
   }) 
  }).catch((err)=>{
    console.log(err);
    res.json({status:'Payment failed'})
  })
})
router.get('/op',(req,res)=>{
  res.render('user/op')
})
router.get('/view-products1',(req,res)=>{
  res.render('user/view-products1')
})
router.get('/medicinefront',(req,res)=>{
  res.render('user/medicinefront')
})
router.get('/dermatology',(req,res)=>{
  res.render('user/dermatology')
})
router.get('/cardiology',(req,res)=>{
  res.render('user/cardiology')
})
router.get('/view-labs',(req,res)=>{
  res.render('user/view-labs')
})
router.get('/obsestric',(req,res)=>{
  res.render('user/obsestric')
})
router.get('/neurology',(req,res)=>{
  res.render('user/neurology')
})
router.get('/view-products',(req,res)=>{
  res.render('user/view-products')
})
router.get('/nephrology',(req,res)=>{
  res.render('user/nephrology')
})





module.exports = router;
