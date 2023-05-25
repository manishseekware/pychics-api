const {category_Service} = require('../services/index')


const AddCategory =  async(req,res) => {
    try{
    console.log("Add Category")
   const category = await category_Service.AddCategory(req.body);
   if(category.message === "Successfully"){
    res.status(200).json({
        message: "Successfully",
        data: category
    })
}else{
    return res.status(404).json({
        message: category.message
    })
}
    }catch(err){
        console.log(err);
        res.status(400).json({mesage: err.message});  
    }
}

const getAllCategory = async(req, res) =>{
    try{
    const category = await category_Service.getCaegory();
    if(category.message === "Successfully"){
        res.status(200).json({
        message: "Successfully",
        data: category.data
     })
    }
    }catch(error){
        console.log(error);
        res.status(400).json({message: error.message});
    }
}

const getCategoryByType= async(req, res) =>{
try{
console.log(req.query.type)
const category = await category_Service.getCategoryByType(req.query.type);
if(category.message === "Successfully"){
 return res.status(category.statuCode).json({
    message: "Successfully",
    data: category
 })
}
}catch(error){
    console.log(error);
    res.status(400).json({message: error.message});
}
}


module.exports = {
    AddCategory,
    getAllCategory,
    getCategoryByType
}