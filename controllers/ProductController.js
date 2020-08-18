const { user, product, product_in, product_out} = require("../models");
const { uploadCloudinary } = require("./UploadController");


const response = {
    data:[],
    message: "Succes get user data",
    status: "success"
};

class ProductController{
    static async getProduct(req,res){
        try {
            const products = await product.findAll({
                include:[
                    {model : user}
                ]
            });
            response.data = products;
            response.status = "OK";
            response.message = "Success get product data";
            res.status(200).json(response);
        } catch (error) {
            response.data = undefined
            response.status = "ERROR";
            response.message = error.message;
            res.status(400).json(response);
        }
    }

    static async getProductById(req,res){
        try {
            const products = await product.findByPk(req.params.id, {
                include: [
                    { model: user }
                ]
            });
            if (!products)
                throw Error('data for params id null')
            response.data = products;
            response.message = "Success get product data by id";
            response.status = "OK";
            res.status(200).json(response);
        } catch (error) {
            response.data = undefined
            response.message = "error get data";
            response.status = "ERROR";
            response.message = error.message;
            res.status(400).json(response);
        }
    }

    static async saveProduct(req, res){
        try {
            const dataImage = await uploadCloudinary(req, res);
            const dataCreate = {...req.body, ...dataImage };
            await product.create(dataCreate);
            response.data = dataCreate;
            response.message = "create data success";
            response.status = "OK";
            res.status(200).json(response);
        } catch (error) {
            response.data = undefined
            response.status = "ERROR";
            response.message = error.message;
            res.status(400).json(response);
        }
    }

    static async updateProduct(req, res){
        try {
            await product.update(req.body, {
                where: {
                    id: req.params.id
                }
            });
            response.data = req.body;
            response.status = "OK";
            response.message = "Updated data success";
            res.status(200).json(response);
        } catch (error) {
            response.data = undefined
            response.status = "ERROR";
            response.message = error.message;
            res.status(400).json(response);
            console.log(error);
        }
    }

    static async deleteProductById(req,res){
        const { id } = req.params;
        const deluser = await product.destroy({ where: {
            id: id
        }});
        try {
            if (delProduct) {
                response.status = true;
                response.message = `Data berhasil dihapus`;
                response.data = `ID : ${id}`
                res.status(200).json(response);
            } else {
                response.data = '';
                response.status = false;
                response.message = "Data gagal dihapus!";
                res.status(400).json(response);
            }
        } catch (err) {
            response.data = '';
            response.status = false;
            response.message = err.message;
            res.status(400).json(response);
        }
    }
}

module.exports = ProductController;