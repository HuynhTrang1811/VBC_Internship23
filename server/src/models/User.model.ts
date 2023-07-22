import mongoose, { Schema, model, ObjectId } from 'mongoose'
export interface IUserNFT {
   
    address:String
}

const UserSchema = new Schema<IUserNFT>({
   
   address:{type:String}
})

const user = model<IUserNFT>('user', UserSchema)
export default user
