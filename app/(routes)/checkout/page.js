"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GlobalApi from "@/lib/GlobalApi";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { ArrowBigRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

function page() {
  // const user = JSON.parse(sessionStorage.getItem("user"));
  // const jwt = sessionStorage.getItem("jwt");
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [cartItemList, setCartItemList] = useState([]);
  const [subTotal, setSubTotal] = useState(0);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // provide an initial value
  const [zip, setZip] = useState(""); // provide an initial value
  const [address, setAddress] = useState("");
  
  const usernameRef = useRef("");
  const emailRef = useRef("");
  const phoneRef = useRef("");
  const zipRef = useRef("");
  const addressRef = useRef("");
  const [totalAmount, setTotalAmount] = useState();
  const router = useRouter();

  
  const [user, setUser] = useState(null);
  const [jwt, setJwt] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const jwt = sessionStorage.getItem("jwt");
      const user = JSON.parse(sessionStorage.getItem("user"));
  
      setIsLogin(jwt ? true : false);
      setUser(user);
      setJwt(jwt);
    }
  }, []);

  useEffect(() => {
    if (!jwt) {
      router.push("/sign-in");
    }
    getCartItems();
  }, []);
  const getCartItems = async () => {
    const cartItemList_ = await GlobalApi.getCartItems(user.user_id, jwt);
    console.log(cartItemList_);
    setTotalCartItem(cartItemList_.length);
    setCartItemList(cartItemList_);
  };

  useEffect(() => {
    let total = 0;
    cartItemList.forEach((element) => {
      total = total + element.amount;
    });
    setTotalAmount((total * 0.9 + 15).toFixed(2));
    setSubTotal(total.toFixed(2));
  }, [cartItemList]);

  const calculateTotalAmount = () => {
    const totalAmount = subTotal * 0.9 + 15;

    return totalAmount;
  };

  const onApprove = (data) => {
    console.log(data);
    console.log("isi cart", cartItemList);

    let quantities = [];
    let amounts = [];
    let productIds = [];

    cartItemList.forEach((item) => {
      if (item.quantity !== null && item.quantity !== undefined) {
        quantities.push(item.quantity);
        amounts.push(item.amount);
        productIds.push(item.productId); // assuming products is an object with an id property
      } else {
        console.error("Item quantity is null or undefined:", item);
      }
    });

    const payload = {
      username: usernameRef.current,
      email: emailRef.current,
      phone: phoneRef.current,
      zip: zipRef.current,
      address: addressRef.current,
      totalOrderAmount: totalAmount,
      userId: user.user_id,
      paymentId: data.paymentID,
      quantity: quantities,
      amount: amounts,
      productId: productIds,
    };

    console.log(payload);
    GlobalApi.createOrder(payload, jwt).then((res) => {
      console.log(res);
      toast("Order places Succesfully");
      cartItemList.forEach((item,index)=>{
        GlobalApi.deleteCartItem(item.id).then(res=>{

        })
      })
    });
    router.replace("/order-confirmation")
  };

  return (
    <div>
      <h2 className="p-3 bg-primary text-xl font-bold text-center text-white">
        Checkout
      </h2>
      <div className="p-5 md:px-10 grid grid-cols-1 md:grid-cols-3 py-8">
        <div className="md:col-span-2 mx-20 mb-4">
          <h2 className="font-nold text-3xl">Billing Details</h2>
          <div className="grid grid-cols-2 gap-10 mt-3">
            <Input
              placeholder="Name"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                usernameRef.current = e.target.value; // update the ref when state changes
              }}
            />
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                emailRef.current = e.target.value; // update the ref when state changes
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-10 mt-3">
            <Input
              placeholder="Phone"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                phoneRef.current = e.target.value; // update the ref when state changes
              }}
            />
            <Input placeholder="Zip"  onChange={(e) => {
                setZip(e.target.value);
                zipRef.current = e.target.value; // update the ref when state changes
              }} />
          </div>
          <div className="mt-3">
            <Input
              placeholder="Address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                addressRef.current = e.target.value; // update the ref when state changes
              }}
            />
          </div>
        </div>
        <div className="mx-10 border">
          <h2 className="p-3 bg-gray-200 font-bold text-center">
            Total Cart ({totalCartItem})
          </h2>
          <div className="p-4 flex flex-col gap-4">
            <h2 className="font-bold flex justify-between">
              Subtotal : <span>${subTotal}</span>
            </h2>
            <hr />
            <h2 className="flex justify-between">
              Delivery: : <span>$ 15.00</span>
            </h2>
            <h2 className="flex justify-between">
              Tax (9%) : <span>${(totalCartItem * 0.9).toFixed(2)}</span>
            </h2>
            <hr />
            <h2 className="font-bold flex justify-between">
              Total : <span>${calculateTotalAmount()}</span>
            </h2>
            {/* <Button onClick={() => onApprove({ paymentId: 123 })}>
              <ArrowBigRight />
            </Button> */}

            {totalAmount>15&& <PayPalButtons
              disabled={!(username&&email&&address&&zip)}
              style={{ layout: "horizontal" }}
              onApprove={onApprove}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: totalAmount,
                        currency_code: "USD",
                      },
                    },
                  ],
                });
              }}
              />
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
