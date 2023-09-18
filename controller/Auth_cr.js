const dbOperation = require('../service/Operation');
const commonFunc = require('../utils/commonFunc');
const AuthModel = require('../models/AuthModel');
const Config = require('../utils/Config');


//todoLater*: make secure during creating admin user
const signUp = async(req,res,next)=>{
    const data = req.body;
    try {
        let time = commonFunc.RealDateToTimeStamps(new Date());
        const cookieOptions = {
          secure: Config.env === "production",
          httpOnly: true,
        };
        let user = new AuthModel({...data,createdAT:time,updatedAT:time})
        let isExisted = await dbOperation.findSingleDataDb(AuthModel,'email',data.email)
        if(!isExisted){
            isExisted = await dbOperation.saveToDb(user);
        }
        const payload={name:isExisted.name,email:isExisted.email,_id:isExisted._id};

        const token = commonFunc.createJwtToken(payload);
        const refreshToken = commonFunc.generateRefreashToken(payload);

        res.cookie("refreshToken", refreshToken, cookieOptions);
        return res.status(201).json({message:'Signup completed successfully',user:isExisted,token});
    } catch (e) {
        next(e);
    }
}

//todoLater:make two different route for get user and login
//todoLater:send jwt token by api header
const login = async(req,res,next)=>{
    try{
        console.log("everything is cool and fair");
        const {email}=req.body;
        let user = await dbOperation.findSingleDataDb(AuthModel,'email',email);
        if(!user?.email){
            throw commonFunc.error('User not found',400);
        }
        const cookieOptions = {
          secure: Config.env === "production",
          httpOnly: true,
        };
        const payload={name:user.name,email:user.email,_id:user._id};
        const token = commonFunc.createJwtToken(payload);
        const refreshToken = commonFunc.generateRefreashToken(payload);
        
        res.cookie("refreshToken", refreshToken, cookieOptions);
        res.status(200).json({user,token});
        
    }catch(e){
        next(e);
    }
}

const SendAccessToken = async(req,res,next)=>{
    try{
        const { refreshToken } = req.cookies;
        const cookieOptions = {
          secure: Config.env === "production",
          httpOnly: true,
        };
        res.cookie("refreshToken", refreshToken, cookieOptions);
        let verifiedToken = null;
            // verify refresh token
        verifiedToken = commonFunc.verifyRefreshToken(refreshToken);
        const {email} = verifiedToken;
        const isUserExist = await dbOperation.findSingleDataDb(AuthModel,"email",email);
        if(!isUserExist){
            throw commonFunc.error(404, "User is not exist");
        }
    
        const newAccessToken = commonFunc.generateAccessToken({
          email: isUserExist.email,
          role: isUserExist.role,
          id: isUserExist._id,
        });
    
        res.status(200).json({token:newAccessToken});
    }catch(e){
        next(e);
    }
}

module.exports = {
   signUp,
   login,
   SendAccessToken
};