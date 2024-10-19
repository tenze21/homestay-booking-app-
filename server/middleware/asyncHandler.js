// this is to handle async requests like performing actions on the database.


// wrap the asynchronous function in the asyncHandler
// router.get('/', asyncHandler(async(req, res) => {
//     const products= await Product.find({});
//     res.json(products);
// }));

const asyncHandler= fn=>(req,res,next)=>{
    Promise.resolve(fn(req,res,next)).catch(next);
}

export default asyncHandler;