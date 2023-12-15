const router = require("express").Router();
const customer = require("../models/customerModel");

const customer_auth = require("../middleware/customer_auth");
//Here, before the postrequest..we would like to execute middleware before the request..
//because we create customer only, if the user is logggedin..so before executing this "aync(req,res)" we add a middleware "auth"
//this middleware validates the cookie and checks whether a user is loggedin or not!


//this request for creating customer...
router.post("/",customer_auth,async (req,res) => {
    try
    {
        //if name is empty..., then we are returing with bad request error!
        const {name} = req.body;
        if(!name)
        {
            return res.status(400).json({errormessage:"Username is Empty..."});
        }

        //creating new_customer user and storing it in database...
        const new_customer = await customer.create({
            name:name
        });
        
        res.status(200).send(new_customer);
    }catch(err)
    {
        console.error(err);
        res.status(500).send();
    }
});

//to get all the customers...irrespective of the user!
router.get("/",customer_auth,async (req,res) => {
    try
    {
        const customers = await customer.find();
        return res.status(200).json(customers);
    }catch(err)
    {
        console.error(err);
        res.status(500).send();
    }
});

module.exports = router;