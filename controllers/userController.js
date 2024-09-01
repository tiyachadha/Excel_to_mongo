var User = require('../models/User');
var csv = require('csvtojson');

const importUser = async(req,res)=>{

    try{

        var userData = [];

        csv()   //taking data from the csv file uploaded in uploads
        .fromFile(req.file.path)
        .then(async(response) => {
            
            for(var x = 0; x< response.length; x++){
                userData.push({
                    fname: response[x].first_name,
                    lname: response[x].last_name,
                    ag: response[x].age,
                });
            }

            await User.insertMany(userData);

        });

        res.send({status:200, success:true,msg:'csv imported'});

    } catch (error){
        res.send({status:400, success:false,msg:error.message});

    }
 }

module.exports = {
    importUser
}