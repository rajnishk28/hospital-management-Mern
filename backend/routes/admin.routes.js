const express =require("express");
const router =express.Router();
const { registerAdmin,loginAdmin,
    findOneAdminById,deleteAdminById,updateAdminById}= require("../controllers/admin.controller");
const {isAdmin,isUser} =require("../middleware/checkUserType")




router.post("/signup",registerAdmin);
router.post("/login",loginAdmin);
router.get("/findone/:id",isAdmin,findOneAdminById);
router.delete("/delete/:id",isAdmin,deleteAdminById);
router.put("/update/:id",isAdmin,updateAdminById);






module.exports =router;

 