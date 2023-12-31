import { User } from "../db/models/user.model";
import bcrypt from 'bcryptjs'
import boom from '@hapi/boom'

class UserService{
  async findByName(name:string){
    const users = await User.find({
      name: {$regex: name, $options: "i"}
    }).select({name:1, lastName:1, email:1})
    if(!users.length){
      throw boom.notFound()
    }
    return users
  }
  async findbyUsername(username: string){
    const user = await User.findOne({username: username}).select({
      name:1, lastName:1, email:1, username:1, _id:0
    })
    if(!user){
      throw boom.notFound()
    }
    return user
  }
  async getUsernameById(id: string){
    const user = await User.findOne({_id:id},{username:1, _id:0})
    return user.username
  }
  async findByEmail(email: string){
    const user = await User.findOne({email: email})
    return user
  }
  async getUserById(...ids:Array<string>){
    const users = await User.find({_id: {$in: [...ids]}})
    return users
  }
  async create(user: IUser){
    const hash = await bcrypt.hash(user.password.toString(), 10)
    const rta = await User.create({
      ...user,
      password: hash
    })
    return rta
  }
  async updateOne(id:string, data:Object){
    const updated = {
      ...data,
      meta: {
        modified_date: new Date()
      }
    }
    const rta = await User.updateOne({username: id}, updated)
    return rta
  }
  async existUsers(...users:Array<String>){
    return await User.find({_id: {$in: users}})
  }
  async existUsersByEmail(...users:Array<String>){
    return await User.find({email: {$in: users}})
  }
  async updateRole(userId: string, role: string){
    await User.updateOne({_id: userId}, {$set:{role:role}})
  }
}

export default UserService
