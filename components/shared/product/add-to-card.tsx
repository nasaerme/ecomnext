"use client";
import { Button } from "@/components/ui/button";
import { Cart, CartItem } from "@/types";
import { PlusIcon, MinusIcon, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { useTransition } from "react";

const AddTocart = ({ item, cart }: { cart?: Cart; item: CartItem }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleAddToCart = async () => {
    startTransition(async () => {
      const res = await addItemToCart(item);

      if (!res.success) {
        toast(res.message, {
          style: {
            background: "red",
            color: "white",
          },
        });
        return;
      }
      //handle success add to cart
      toast(
        () => (
          <>
            <Button
              onClick={() => router.push("/cart")}
              className="w-full bg-primary text-white hover:bg-gray-800"
            >
              Go To Cart
            </Button>
          </>
        ),
        { description: () => res.message }
      );
    });
  };

  const handleRemoveCart = async () => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId);

      toast(res.message, {
        style: {
          background: res.success ? "green" : "red",
          color: "white",
        },
      });

      return;
    });
  };

  //Check if item is incart
  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId);

  return existItem ? (
    <div>
      <Button type="button" variant="outline" onClick={handleRemoveCart}>
        {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <MinusIcon className="h4 w-4" />
        )}
      </Button>
      <span className="px-2">{existItem.qty}</span>
      <Button type="button" variant="outline" onClick={handleAddToCart}>
        {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <PlusIcon className="h4 w-4" />
        )}
      </Button>
    </div>
  ) : (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      {isPending ? (
        <Loader className="w-4 h-4 animate-spin" />
      ) : (
        <PlusIcon className="h4 w-4" />
      )}{" "}
      Add To Cart
    </Button>
  );
};

export default AddTocart;
