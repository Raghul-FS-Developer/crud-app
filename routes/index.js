var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongodb = require ('mongodb')
require('dotenv').config();
var upload = require('../middleware/upload')
var user = require('../model/user');


mongoose.connect(process.env.URL).then(()=>console.log('db connected successfully')).catch((error)=>console.log(error))



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/add',upload.single("image"),async(req,res)=>{

  
  try {
    let result = await user(req.body);
    if (req.file) {
      result.image = req.file.location;
    }
    result.save((err)=>{
      if(err){
        console.log(err)
        res.json({
          message:'*Email Already Exist'
        })
      }else{
       res.json({
        statusCode:200
      })
      }
    })   

  } catch (error) {
    console.log(error)
  }
})
router.get('/get/:id',async(req,res)=>{
  try {
    
    let result = await user.findOne({_id:mongodb.ObjectId(req.params.id)})
    res.json(result)
  } catch (error) {
    console.log(error)
  }
})

router.get('/all',async(req,res)=>{
  try {
    let result = await user.find()
    res.json({
      data:result
    })
  } catch (error) {
    console.log(error)
  }
})
router.post('/editing/:id',upload.single("image"),async(req,res)=>{

  try {
   let ans = req.body
   if(req.file){
   ans.image = req.file.location
   }
    let step1 = await user.replaceOne({_id:mongodb.ObjectId(req.params.id)},ans)
    if(step1){
      res.json({
        statusCode:200
      })
        }

  } catch (error) {
    console.log(error)
    res.json({
      message:'*Email Already Exist'
    })
  }
}) 
 


router.delete('/delete/:id',async(req,res)=>{
  try {
    await user.deleteOne({_id:mongodb.ObjectId(req.params.id)})
    res.json({
      statusCode:200,
      message:'deleted successfully' 
    })

  } catch (error) {
   res.json('deletion failed')
    console.log(error)
  }
})





module.exports = router;
