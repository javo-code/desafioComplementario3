import MongoDao from "../mongo.dao.js";
import { UserModel } from "./user.model.js";
import { isValidPassword } from "../../../utils.js";

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

  
  async getByEmail(email){
    try {
      const userExist = await UserModel.findOne({email}); 
      // console.log(userExist);
      if(userExist){
       return userExist
      } return false
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }
}