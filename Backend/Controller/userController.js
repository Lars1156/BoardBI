const User = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secret = "Kishan@1156";

const registerUser = async(req ,res)=>{
    try {
        const {userName , email, password , role}= req.body;
        console.log("**User Data model", req.body);
        if(!userName || !email || !password || !role){
            return res.status(400).json({msg:"Please Enter the All required tuples"});
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(409).json({msg:"User is Alredy Exist"});
        }
        const vaildRole = ['Admin', 'Manger', 'Developer', 'Intren', 'Tester'];
        if(!vaildRole.includes(role)){
           return res.status(400).json({msg:"Invailde Role "});
        }
        // Creating A new User And Save the Database
        const newUser = new User({
            userName ,
            email, 
            password, 
            role
        });
        await newUser.save();
        return res.status(200).json({msg:'Register User Sucessfully '});             
    } catch (error) {
        return res.status(500).json({msg:"Internal server Error"});
    }
}

const loginUser = async(req,res)=>{
    try {
        const{email , password} = req.body
        console.log("**Login User data", req.body);
        const user = await User.findOne({email});
        console.log(user);
        
        if(!user){
            return res.status(404).json({msg:"User not Found"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, msg: "Invalid credentials" });
        }
        user.status = 'Active';
        await user.save();
        // Genarate the json web token 
        const toekn = jwt.sign(
            {
                id : user._id,
                role:user.role
            },
            secret,{
                expiresIn:'1h'
            }
        );
        return res.status(200).json({msg:"Login sucessfully " , toekn})
    } catch (error) {
        console.error('Fecting the BoardIo Users:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};
// Logout Controller
const logoutUser = async(req, res)=>{
    const userId = req.body . userId
    try {
        const user = await User.findById({userId});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
          user.status = 'Inactive';
          await user.save();

      return  res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        
    }
};

const getUser = async(req,res) =>{
        try {
            const users = await User.find(); // Fetch all users
            res.status(200).json(users);
          } catch (error) {
            res.status(500).json({ message: 'Error fetching users', error });
          }
    }  
// const getAllDeveloper = async(req,res)=>{
//     try {
//         // Find All User Role 
//         const developerRole = await User.findOne({role: 'Developer' });
//         if(!developerRole.length){
//           return res.status(404).json({msg: "Role is Not Matched"})
//         }

//         return res.status(200).json({user:developerRole});
//     } catch (error) {
//         console.error('Error fetching Tech Support users:', error.message);
//         res.status(500).json({ message: 'Server Error' }); 
//     }
// };

// const getAllIntren = async(req,res)=>{
//     try {
//         const internRole = await User.findOne({role :'Intern'});
//         if(!internRole){
//             return res.status(404).json({msg:"Intern Role is Not Found"});
//         }
//         return res.status (200).json({user:internRole})
//     } catch (error) {
//         console.error('Error fetching Tech Support users:', error.message);
//         res.status(500).json({ message: 'Server Error' });
//     }
// }

module.exports = {registerUser , loginUser,logoutUser ,getUser}