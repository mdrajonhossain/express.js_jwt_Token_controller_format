var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const user_controller = require('../controller/user_controller');
const authverifyface = require('../middleware/auth_middleware');


router.get('/', user_controller.root);
 


function generateAccessToken(username) {
  return jwt.sign(username, "sasdfasdfasfd", { expiresIn: '1800s' });
}


router.post('/login', function(req, res, next){

	  const token = jwt.sign({
	  		"username": req.body.username,
			"password": req.body.password,
	  	}, "123456abcdefg");



    return res.json({
     	"username": req.body.username,
		"password": req.body.password,
		"token": token
    });
      

})

const check  = (req, res, next)=>{
	const { authorization } = req.headers;
	
	try {
		if(authorization){
			const token = authorization.split(' ')[1];
	  		var decoded = jwt.verify(token, '123456abcdefg');
	  		const { username, userId} = decoded;
	  		req.username = "Md. Rajon Hossain";
	  		req.password = "password";  		
	  		req.token = authorization;  		
	  		req.message = "Success";
	  		next();
  		}else{
  			req.message = "authorization false";
  			next()
  		}
	} catch(error) {		
  		next("authorization Faild");
	}
}





// router.post('/test', check, function(req, res){

// 		return res.json({
// 			"Username": req.username,
// 			"Message": req.message,
// 			"token": req.token
// 		})

// })
 


router.post('/test', check, user_controller.userface);

module.exports = router;




