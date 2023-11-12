const User      = require('../models/User')
const bcrypt    = require('bcryptjs')
const jwt       = require('jsonwebtoken')

const register =  (req, res,next) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err) {
            res.json({
                error : err
            })
        }
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password:hashedPass
        })
        user.save()
        .then(user => {
            res.json({
                message: 'User Added successfully!'
            })
        })
        .catch(error =>{
            res.json({
                message : 'An error occurred!'
            })
        })
    })

}



const login = (req,res,next) => {
    var username = req.body.username
    var password = req.body.password

    User.findOne({$or : [{email:username},{phone:username}]})
    .then(user => {
        if(user){ 
            bcrypt.compare(password, user.password,function(err, result){
                if(err) {
                    res.json({
                        error: err
                    })
                }
                if(result){
                    let token = jwt.sign({name: user.name}, 'verySecretValue',{expiresIn : '1h'})
                   /* res.json({
                        message: 'See Products http://localhost:3200/products',
                        message: 'See Orders http://localhost:3200/orders
                        Login Successful!\n',
                        token,
                        message: 'See Products http://localhost:3200/products',
                        message: 'See Orders http://localhost:3200/orders'
                    }) */
                    res.json({
                        message: 'Login Successful!',
                        token,
                        SeeProducts:  'http://localhost:3200/products',
                        CheckOrders: 'http://localhost:3200/orders',
                        url: "http://localhost:3200/api/login" 
                    })
                } else {
                    res.json({
                        message: 'Password doesn not matched!'
                    })
                }
            })

        } else{
            res.json({
              message : 'No user Found!'  
            })
        }

    })
}

module.exports  =   {
    register , login
}