import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductItemDetail from "./ProductItemDetail";

function ProductItem({ product }) {
  return (
    <div className="p-2 md:p-6 flex flex-col items-center justify-center gap-3 border rounded-lg hover:scale-105 hover:shadow-lg transition-all ease-in-out cursor-pointer">
      <img
        src={product?.url}
        alt={product.name}
        width={500}
        height={200}
        className="h-[200px] w-[200px] object-contain "
      />
      <h2 className="font-bold text-lg">{product.name}</h2>
      <div className="flex gap-3">
        {product.sellingPrice && (
          <h2 className="font-bold text-lg">Rp. {product.sellingPrice}</h2>
        )}
        <h2
          className={`font-bold text-lg ${
            product.sellingPrice && "line-through text-gray-500"
          }`}
        >
          Rp. {product.price}
        </h2>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          
          <Button
            variant="outline"
            className="text-primary hover:text-white hover:bg-primary"
          >
            Add to Cart
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription>
              <ProductItemDetail product={product} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ProductItem;
