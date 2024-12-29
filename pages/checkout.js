import Layout from "@/components/Layout";
import { ProductsContext } from "@/components/ProductsContext";
import { useContext, useEffect, useState } from "react";

export default function CheckoutPage() {
  const [productsInCartInfo, setProductsInCartInfo] = useState([]);
  const { selectedProducts, setSelectedProducts } = useContext(ProductsContext);
  const uniqIds = [...new Set(selectedProducts)];
  const [name, setName] = useState();
  const [contact, setContact] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [pincode, setPincode] = useState();
  let orderTotal = 0,
    deliveryCharges = 0,
    subTotal = 0;

  useEffect(() => {
    fetch("api/products?ids=" + uniqIds.join(","))
      .then((response) => response.json())
      .then((json) => setProductsInCartInfo(json));
  }, [selectedProducts]);

  function addMoreOfThisProduct(id) {
    setSelectedProducts((prev) => [...prev, id]);
    console.log(productsInCartInfo);
  }

  function removeOneOfThisProduct(id) {
    const idx = selectedProducts.indexOf(id);
    if (idx !== -1) {
      setSelectedProducts((prev) =>
        prev.filter((value, index) => index != idx)
      );
    }
  }

  if (selectedProducts?.length && productsInCartInfo.length) {
    for (let id of selectedProducts) {
      const price = productsInCartInfo.find((p) => p._id === id).price;
      orderTotal += price;
    }
    if (orderTotal > 10000) deliveryCharges = 0;
    else deliveryCharges = 10;

    subTotal = deliveryCharges + orderTotal;
  }

  return (
    <Layout>
      <h1 className="font-bold text-4xl w-full flex justify-center mt-2">
        Checkout
      </h1>
      {!productsInCartInfo.length && (
        <div className="mt-7">No Products in your shopping cart</div>
      )}
      {productsInCartInfo.length && (
        <div className="mt-7">Products in your cart :</div>
      )}
      {productsInCartInfo.length &&
        productsInCartInfo.map((productInCart) => (
          <div className="flex items-center gap-3 my-5">
            <div className="bg-gray-100 p-3 rounded-xl w-24 shrink-0">
              <img src={productInCart.picture} alt="" />
            </div>
            <div>
              <h3 className="font-bold text-lg">{productInCart.name}</h3>
              <p className="text-sm leading-4 text-gray-300">
                {productInCart.description}
              </p>
              <div className="flex mt-2">
                <div className="font-bold grow">${productInCart.price}</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => removeOneOfThisProduct(productInCart._id)}
                    className="bg-red-400 px-2 rounded-lg text-gray-800 w-6 flex justify-center items-center"
                  >
                    -
                  </button>
                  <span>
                    {
                      selectedProducts.filter((id) => id === productInCart._id)
                        .length
                    }
                  </span>
                  <button
                    onClick={() => addMoreOfThisProduct(productInCart._id)}
                    className="bg-emerald-500 px-2 rounded-lg text-gray-800 w-6  flex justify-center items-center"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      {productsInCartInfo.length && (
        <form action="/api/checkout" method="POST">
          <div>
            <div className="mt-8">
              <h3>Delivery Details :</h3>
              <input
                type="text"
                placeholder="Full Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                name="name"
                className="bg-gray-200 w-full px-4 py-2 rounded-xl my-2 text-gray-500"
              />
              <input
                type="number"
                placeholder="Contact No."
                onChange={(e) => setContact(e.target.value)}
                value={contact}
                name="contact"
                className="bg-gray-200 w-full px-4 py-2 rounded-xl my-2 text-gray-500"
              />
              <input
                required
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                name="email"
                className="bg-gray-200 w-full px-4 py-2 rounded-xl my-2 text-gray-500"
              />
            </div>
            <div className="mt-5">
              <h3>Delivery Address :</h3>
              <input
                type="text"
                placeholder="Address Line 1"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                name="address"
                className="bg-gray-200 w-full px-4 py-2 rounded-xl my-2 text-gray-500"
              />
              <input
                type="text"
                placeholder="City"
                onChange={(e) => setCity(e.target.value)}
                value={city}
                name="city"
                className="bg-gray-200 w-full px-4 py-2 rounded-xl my-2 text-gray-500"
              />
              <input
                type="text"
                placeholder="State"
                onChange={(e) => setState(e.target.value)}
                value={state}
                name="state"
                className="bg-gray-200 w-full px-4 py-2 rounded-xl my-2 text-gray-500"
              />
              <input
                type="number"
                placeholder="Pincode"
                onChange={(e) => setPincode(e.target.value)}
                value={pincode}
                name="pincode"
                className="bg-gray-200 w-full px-4 py-2 rounded-xl my-2 text-gray-500"
              />
            </div>
            <div className="mt-8">
              <div className="flex my-3">
                <h3 className="grow font-bold text-gray-400">Order Total:</h3>
                <h3 className="font-bold">${orderTotal}</h3>
              </div>
              <div className="flex my-3">
                <h3 className="grow font-bold text-gray-400">Delivery:</h3>
                <h3 className="font-bold">${deliveryCharges}</h3>
              </div>
              <div className="flex my-3 border-t pt-3 border-dashed border-emerald-500">
                <h3 className="grow font-bold text-gray-400">Total:</h3>
                <h3 className="font-bold">${subTotal}</h3>
              </div>
            </div>
            <input
              type="hidden"
              name="products"
              value={selectedProducts.join(",")}
            />
            <button
              type="submit"
              className="bg-emerald-500 px-5 py-2 rounded-xl font-bold text-white w-full my-4 shadow-emerald-300 shadow-lg"
            >
              Pay ${subTotal}
            </button>
          </div>
        </form>
      )}
    </Layout>
  );
}
