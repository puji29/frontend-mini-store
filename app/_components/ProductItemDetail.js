"use client";
import { debounce } from 'lodash';
import { Button } from "@/components/ui/button";
import GlobalApi from "@/lib/GlobalApi";
import { LoaderCircle, ShoppingBasket } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useState } from "react";
import { toast } from "sonner";
import { UpdateCartContext } from '../_context/UpdateCartContext';

function ProductItemDetail({ product }) {
  const jwt = sessionStorage.getItem("jwt");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const {updateCart,setUpdateCart}=useContext(UpdateCartContext)
  const [productTotalPrice, setProudctTotalPrice] = useState(
    product.sellingPrice ? product.sellingPrice : product.stock
  );
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [loading,setLoading]= useState(false)

  const addToCart = useCallback(debounce(async () => {
    if (loading) return;
  
    setLoading(true);
    if (!jwt) {
      router.push("/sign-in");
      setLoading(false);
      return;
    }
  
    const data = {
      quantity: quantity,
      amount: quantity * productTotalPrice,
      userId: user.user_id,
      productId: product.id,
    };
  
    try {
      const res = await GlobalApi.addToCart(data, jwt);
      console.log(res.data);
      toast("Added New Cart");
      setUpdateCart(!updateCart)
    } catch (e) {
      console.error(e);
      toast("Error while adding to cart");
      if (e.response && e.response.data && e.response.data.message) {
        toast(e.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  },300), [loading, jwt, quantity, productTotalPrice, user.user_id, product.id]);
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black">
      <img
        src={product.url}
        alt="image"
        width={300}
        height={300}
        className="bg-slate-200 p-5 h-[320px] w-[300px] object-contain rounded-lg"
      />
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <h2 className="text-sm  text-gray-500">{product.description}</h2>
        <div className="flex gap-3 ">
          {product.sellingPrice && (
            <h2 className="font-bold text-3xl">${(product.sellingPrice).toFixed(2)}</h2>
          )}
          <h2
            className={`font-bold text-3xl ${
              product.sellingPrice && "line-through text-gray-500"
            }`}
          >
            ${(product.price).toFixed(2)}
          </h2>
        </div>
        <h2 className="font-medium text-lg">Stock ({product.stock})</h2>
        <div className="flex flex-col items-baseline gap-3">
          <div className="flex gap-2 items-center">
            <div className="p-2 border flex gap-10 items-center px-5">
              <button
                disabled={quantity == 1}
                onClick={() => setQuantity(quantity - 1)}
              >
                -
              </button>
              <h2> {quantity}</h2>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <h2 className="text-2xl font-bold">
              {" "}
              =${(quantity * productTotalPrice).toFixed(2)}
            </h2>
          </div>
          <Button className="flex gap-3" onClick={() => addToCart()}
          disabled={loading}
          >
            <ShoppingBasket />
            {loading?<LoaderCircle className="animate-spin" />:'Add To Cart'} 
          </Button>
        </div>
        <h2>
          <span className="font-bold">Category: </span>
          {product.category_id}
        </h2>
      </div>
    </div>
  );
}

export default ProductItemDetail;
