import mongoose, { Types } from "mongoose";
import { IUser } from "../interfaces/userInterface";

const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required: [true,'Username is required'],
        },
        email:{
            type:String,
            required:[true, 'E-mail is required'],
            unique: true,
        },
        password:{
            type:String,
            required:[true, 'Password is required'],
        },
        role:{
            type:String,
            enum:{
                values: ['admin', 'editor','user']
            },
            default:'user',
        }
    },
    {
        timestamps:true
    }
);

// userSchema.pre('save',async function(next){
// const roles:any=await Role.findOne({role:this.role});
//     if(roles){
//         this.profiles.push(roles._id);
//         next()
        
//     }
//     throw new Error('this is not valid role')
// })


const User = mongoose.model<IUser>('User',userSchema)
export default User;