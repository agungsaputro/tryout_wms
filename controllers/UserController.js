const { user} = require("../models");

const response = {
    data:[],
    message: "Succes get user data",
    status: "success"
};

class UserController{
    static async getUser(req, res){
        try {
            const users = await user.findAll();
            response.data = users;
            response.message = "Succes get user data";
            res.status(200).json(response);
        } catch (error) {
            response.data = undefined
            response.status = "error";
            response.message = error.message;
            res.status(400).json(response);
        }
    }

    static async getUserById(req, res){
        try{
            const users = await user.findByPk(req.params.id, {
            });
            if (!users)
                throw Error('data for params id null')
            response.data = users;
            response.message = "Succes get user data";
            res.status(200).json(response);
        }catch(error){
            response.data = undefined
            response.message = "error get user data";
            response.status = "error";
            response.message = error.message;
            res.status(400).json(response);
        }
    }

    static async saveUser(req, res) {
        const {
            body: {full_name, username, email, phone_number, salt, password}
        } = req;

        try {
            const saveUser = await user.create({
                full_name, username, email, phone_number, salt, password
            });
            response.data = {
              full_name: saveUser.full_name,
              username: saveUser.username,
              email: saveUser.email,
              phone_number: saveUser.phone_number,
              salt: saveUser.salt,
              password: saveUser.password,

            };
            response.status = true;
            response.message = "succes add user data"
            res.status(201).json(response);
        } catch (error) {
            response.status = "fail!";
            response.data = '';
            response.message = error.message;
            res.status(400).json(response);
        }
    }

    static async deleteUserById(req, res){
        const { id } = req.params;
        const deluser = await user.destroy({ where: {
            id: id
        }});
        try {
            if (deluser) {
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

    static async updateUserById(req, res){
        try {
            await user.update(req.body, {
                where: {
                    id: req.params.id
                }
            });
            response.data = req.body;
            console.log(req.body)
            response.message = "succes updated user data";
            res.status(200).json(response);
            console.log(response)
        } catch (error) {
            response.data = undefined
            response.status = "error updated user data";
            response.message = error.message;
            res.status(400).json(response);
            console.log(error);
        }
    }
}

module.exports = UserController;