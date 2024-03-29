import MongoDao from "../mongo.dao.js";
import { UserModel } from "./user.model.js";
import { isValidPassword, createHash } from "../../../../utils.js";

export default class UserMongoDao extends MongoDao {
  constructor() {
    super(UserModel);
  }
  
    async login(user){
    try {
      const { email, password } = user;
      // console.log(email);
      const userExist = await this.getByEmail(email); 
      // console.log('dao', userExist);
      if(userExist){
        const passValid = isValidPassword(userExist, password)
        if(!passValid) return false
        else return userExist
      } return false
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

async createUser(user) {
    try {
      const { email, password } = user;
      const existUser = await this.model.findOne({email});
      if(!existUser){
        if(email === 'adminCoder@coder.com' && password === 'adminCoder123'){
          const newUser = await this.model.create({
            ...user, 
            password: createHash(password),
            role: 'admin'
          })
          return newUser;
        } else {
          const newUser = await this.model.create({
            ...user, 
            password: createHash(password)})
          return newUser;
        }
      } else {
        return false;
      }
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

    async getByEmail(email){
    try {
      const userExist = await this.model.findOne({email}); 
      console.log(userExist);
      if(userExist){
        return userExist
      } return false
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }
}