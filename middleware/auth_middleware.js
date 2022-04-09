var jwt = require('jsonwebtoken');


const auth_middleware = (req, res, next)=>{
	const { authorization } = req.headers;
	
	try{
	const token = authorization.split(' ')[1];
	const decoded = jwt.verify(token, "154364asdfasdf"); 	
	next();
	}catch(error){
		next("unathorized_rajon");		
	}
}


module.exports = auth_middleware;





 