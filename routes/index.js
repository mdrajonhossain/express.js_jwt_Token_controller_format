var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const user_controller = require('../controller/user_controller');
const authverifyface = require('../middleware/auth_middleware');



router.get('/', user_controller.root);
 

 

router.post('/login', function(req, res, next){

	  const token = jwt.sign({
	  		"username": req.body.username,
			"password": req.body.password
	  	}, "123456abcdefg", {
	  		expiresIn:'10h'
	  	});



	    return res.json({
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
	  		var decoded = jwt.verify(token, '123456abcdefg');	  		
	  		req.username = "Md. Rajon Hossain";
	  		req.password = "password";  		
	  		req.token = authorization;  		
	  		req.message = "Success";
	  		next();
  		}else{
  			return res.json({"Status": "authorization Null"})
  		}
	} catch(error) {		
  		return res.json({"Status": "Faild"})
	}
};





router.post('/test', isAuthenticate, function(req, res, next){

		return res.json({
			"Status": req.message,
			"Username": req.username			
		})

})
 




module.exports = router;




