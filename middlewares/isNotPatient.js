const jwt = require('jsonwebtoken');

module.exports =(req,res,next)=> {


    let user = req.user 
    if(user.role==='patient') {
        return res.status(401).json({
            error:'only an admin can do this'
        });
    }

    next()
}