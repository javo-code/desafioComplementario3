import Services from "./class.services.js";
import UserMongoDao from "../dao/mongoDB/users/user.dao.js";
const userDao = new UserMongoDao();
import jwt from "jsonwebtoken";
import "dotenv/config";

const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT;

export default class UserService extends Services {
  constructor() {
    super(userDao);
  }

  #generateToken(user) {
    const payload = {
      userId: user._id,
    };
    return jwt.sign(payload, SECRET_KEY_JWT, { expiresIn: "10m" });
  }

async register(user) {
    try {
      const { email, password } = user;
      const existUser = await userDao.getByEmail(email);
      if (!existUser) {
        if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
          return await userDao.create({
            ...user,
            password: createHash(password),
            role: 'admin'
          });
        }
        return await this.create({
          ...user,
          password: createHash(password),
        });
      } else return false;
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async login(user) {
    try {
      const userExist = await userDao.loginUser(user);
      if(userExist) return this.#generateToken(userExist);
      else return false;
    } catch (error) {
      console.log(error);
    }
  }

  async getByIdUser(id){
  try {
    const user = await userDao.getById(id);
    if (!user) return false;
    else return user;
  } catch (error) {
    console.log(error);
  }
};
}
