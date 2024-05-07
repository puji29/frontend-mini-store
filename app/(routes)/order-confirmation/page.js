import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

function OrderConfirnation() {
  return (
    <div className="flex justify-center my-20">
      <div className="border shadow-md flex flex-col justify-center p-20 rounded-md items-center gap-3 px-32">
        <CheckCircle2 className="h-24 w-24 text-primary" />
        <h2 className="font-medium text-3xl text-primary">Order Succesfully</h2>
        <h2>Thanks you so much for order</h2>
        <Link href={"/my-order"}>
          {" "}
          <Button className="mt-8">Track you order</Button>
        </Link>
      </div>
    </div>
  );
}

export default OrderConfirnation;
