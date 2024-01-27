import MongoDao from "../mongo.dao.js";
import { UserModel } from "./user.model.js";

export default class UserMongoDao extends MongoDao {
  constructor() {
    super(UserModel);
  }
    async loginUser(user){
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
}