export default (user,statusCode,res)=>{
    try {
        const token = user.getJwtToken()
        //options for cookie
        const options = {
            expires : new Date(
                Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
            ),
            httpOnly : true ,
        }
        res.status(statusCode).cookie("token",token,options).json({
            // message : "Hello" + " " + user.name + " " +"login successfully " ,
            token,    
            success : true,
            user
        })
    } catch (error) {
        console.log(error)
    }
}