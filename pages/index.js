import ProductCard from "@/components/ProductCard";
import { initMongoose } from "@/lib/mongoose";
import { useEffect, useState } from "react";
import { findAllProducts } from "./api/products";
import Layout from "@/components/Layout";

export default function Home({products}) {
  const [phrase, setPhrase] = useState([]);
  
  const categoryNames = [...new Set(products.map(product => product.category))];

  if(phrase)
  {
    products = products.filter(product => product.name.toLowerCase().includes(phrase.toString().toLowerCase()) || product.category.toLowerCase().includes(phrase.toString().toLowerCase()));
  }

  return (
    <Layout>
      <input type="text" placeholder="Search for products..." className="bg-gray-100 w-full rounded-xl py-2 px-4 text-black" value={phrase} onChange={e => setPhrase(e.target.value)}/>
      <div>
        {categoryNames.map(category => (
          <div className="mt-8 snap-start" key={category}>
          {products.find(p => p.category === category) && 
          <div><h2 className="text-2xl capitalize">{category}</h2>
            <div className="flex gap-3 overflow-x-scroll scrollbar-hide snap-start">
              {products.filter(product => product.category === category).map(product => (
                <div className="snap-start"><ProductCard product={product} /></div>
              ))}
            </div>
            </div>}            
          </div>
        ))}
      </div>
    </Layout>
  );
}


export async function getServerSideProps()
{
  await initMongoose();
  const products = await findAllProducts();
  return {
    props:{
      products:JSON.parse(JSON.stringify(products)),
    }
  }
}
