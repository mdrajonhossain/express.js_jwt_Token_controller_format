var jwt = require('jsonwebtoken');




 exports.userface = (req, res, next) => {

		return res.json({
			"Username": req.username,
			"Message": req.message,
			"token": req.token
		})
	}



 exports.root = (req, res, next) => {

		return res.json({
			"Username": req.username,
			"Message": req.message,
			"token": req.token,
			"messag": "data"
		})

}
























// exports.viewface = (req, res, next)=>{


// 	const token = jwt.sign({ user_id: "01" },"154364asdfasdfs", { expiresIn: "2h",});
	
// 	return res.json({
// 			"message": "Success",
// 			"data": req.body,
// 			"token": token
// 		})
// }

exports.dataface = (req, res, next)=>{
	
	

	  return res.json({
			"message": "authorization"
		})
}




