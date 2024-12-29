import { initMongoose } from "@/lib/mongoose";
import Product from "@/models/Products";

export async function findAllProducts()
{
    return await Product.find().exec();
}

export default async function handle(req, res)
{
    await initMongoose();
    const {ids} = req.query;
    const idsArray = ids.split(",");

    if(ids)
    {
        res.json( await Product.find({'_id':{$in:idsArray}}).exec());
    }
    else res.json( findAllProducts() );
}