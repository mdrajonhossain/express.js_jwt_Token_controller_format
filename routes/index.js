var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const user_controller = require('../controller/user_controller');
const authverifyface = require('../middleware/auth_middleware');
require('dotenv').config();



router.get('/', user_controller.root);
 

 

router.post('/login', function(req, res, next){
	  
	  const token = jwt.sign({
	  		"username": req.body.username			
	  		}, process.env.JWT_SECTRET, {expiresIn:'10h'});




	    return res.json({
	    	"status": "Success",
	     	"username": req.body.username,
			"password": req.body.password,
			"token": token
	    });
})



const isAuthenticate = (req, res, next)=>{
	const { authorization } = req.headers;		
	try {
		if(authorization){
			const token = authorization.split(' ')[1];
	  		var decoded = jwt.verify(token, process.env.JWT_SECTRET);
	  		var { username, password} = decoded;
	  		req.username = username;
	  		req.password = password;
	  		req.token = authorization;
	  		req.status = "Success";
	  		next();
  		}else{  			
  			return res.json({"Status": "Unauthorization"})
  		}
	}catch(error) {		
  		return res.json({"Status": "Authorization Not Match"})
	}
};





router.post('/test', isAuthenticate, function(req, res, next){

		return res.json({
			"status": req.status,
			"profilename" : "rajonhossain",
			"username": req.username,
			"password" : req.password,
			"data": [{"name": "sadfasdf"}]
		})

})
 




module.exports = router;




