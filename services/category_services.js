const {Category} = require('../models/index');


const AddCategory = async(body) => {
const category = await Category.create(body);
if(category){
    return {
        message: "Successfully",
        statuCode: 200,
        data: Category
    }
}else{
    return {
        message: "Error",
        statuCode: 500,
        data: null
    }
}
}

const getCaegory = async() =>{
const category =  await  Category.aggregate([
    {
      $group: { _id: '$name', list: { $push: '$$ROOT' } },
    },
  ])
  if(category){
    return {
      message: "Successfully",
      statuCode: 200,
      data: category
    }
  }else {
    return {
      message: "Error",
      statuCode: 500,
      data: null
    }
  }
}


const getCateoryByName = (name) =>{
    const category = category.findOne({name: name});
    if(category){
        return {
            message: "Successfully",
            statuCode: 200,
            data: Category
        }
    }else {
        return {
            message: "Error",
            statuCode: 500,
            data: null
        }
    }
}

const getCategoryByType = async () => {
  const category = await  Category.aggregate([
    {
      $group: { _id: '$type', list: { $push: '$$ROOT' } },
    },
  ]);
  console.log(category);
  if(category){
    return {
      message: "Successfully",
      statuCode: 200,
      data: category
    }
  }else {
    return {
      message: "Error",
      statuCode: 500,
      data: null
    }
  }
};




module.exports = {
    AddCategory,
    getCaegory,
    getCategoryByType
}




