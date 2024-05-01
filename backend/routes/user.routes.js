const express =require("express");
const router =express.Router();
const { registerUser,loginUser,
    getAllUser,getOneUser,
    deleteUserById,updateUserById,
    getTotalUsers
}= require("../controllers/user.controller");
const {isAdmin,isUser} =require("../middleware/checkUserType")




router.post("/signup",registerUser);
router.post("/login",loginUser);
router.get("/findall",isAdmin,getAllUser);
router.get("/findone/:id",isUser,getOneUser);
router.get("/total",isAdmin,getTotalUsers);
router.delete("/delete/:id",isAdmin,deleteUserById);
router.put("/update/:id",isUser,updateUserById);





module.exports =router;

 