import bcrypt from 'bcryptjs';

const matchPassword= async (enteredPassword, userPassword)=>{
    return await bcrypt.compare(enteredPassword, userPassword);
}
export default matchPassword;