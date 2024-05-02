"use client";

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const OrderSummary = () => {
  const [loaded, setLoaded] = useState(false);
  const { subTotal, tax, total, itemsInCart } = useCartStore((state) => state.getSummaryInformation());

  const router = useRouter();

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (itemsInCart === 0 && loaded === true) {
      router.replace("/empty");
    }
  }, [itemsInCart, loaded]);

  if (!loaded) return <p>Loading...</p>;

  return (
    <>
      <div className="grid grid-cols-2">
        <span>No. Products</span>
        <span className="text-right">{itemsInCart === 1 ? "1 article" : `${itemsInCart} articles`}</span>
        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>
        <span>Taxes (21%)</span>
        <span className="text-right">{currencyFormat(tax)}</span>
        <span className="text-2xl mt-5">Total: </span>
        <span className="text-right text-2xl mt-5">{currencyFormat(total)}</span>
      </div>
    </>
  );
};
