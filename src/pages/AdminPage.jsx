import { useLoaderData } from "react-router-dom";
import ListProducts from "../components/ListProducts";
import { useEffect, useState } from "react";
import { json } from "react-router-dom";
import { removeCookie } from "../stores/Cookie";
export default function AdminPage() {
  const response = useLoaderData();
  const [products, setProducts] = useState(response.products);
  useEffect(() => {
    return () => {
      removeCookie("admin-token");
    };
  }, []);
  function handleChange(e) {
    const products = response.products.filter(
      (product) =>
        product.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        product.price.toLowerCase().includes(e.target.value.toLowerCase()) ||
        product.category.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setProducts(products);
  }
  return (
    <div className="flex flex-col gap-[5px] m-[10px]">
      <div className="font-semibold">Products</div>
      <input
        type="text"
        className="p-[3px] border-[1px] border-gray-400 w-[400px]"
        placeholder="Enter Search"
        onChange={handleChange}
      />
      <ListProducts products={products} />
    </div>
  );
}

export async function loader() {
  const res = await fetch(
    `https://PhoneShopBackEnd.onrender.com/admin/get-all`
  );
  if (!res.ok) {
    throw json({ message: "Something wrong with server", status: 500 });
  } else {
    return res;
  }
}
