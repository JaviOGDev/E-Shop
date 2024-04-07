import { getOrderById } from "@/actions/order/get-order-by-id";
import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";

const productsInCart = [initialData.products[0], initialData.products[1], initialData.products[2]];

interface Props {
  params: {
    id: string;
  };
}

export default async function OrdersByIdPage({ params }: Props) {
  const { id } = params;

  const { ok, order } = await getOrderById(id);

  if (!ok) {
    redirect("/");
  }

  const address = order?.OrderAddress;

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Order #${id.split("-").at(-1)}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Cart */}
          <div className="flex flex-col mt-5">
            <div
              className={clsx("flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5", {
                "bg-red-500": !order!.isPaid,
                "bg-green-700": order!.isPaid,
              })}
            >
              <IoCardOutline size={30} />
              {/* <span className="mx-2">Pending payment</span> */}
              <span className="mx-2">Payment Status: {order?.isPaid ? "Paid" : "Pending"}</span>
            </div>

            {/* Items */}
            {order!.OrderItem.map((item) => (
              <div key={item.product.slug + "-" + item.size} className="flex mb-5">
                <Image
                  src={`/products/${item.product.ProductImage[0].url}`}
                  width={100}
                  height={100}
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                  alt={item.product.title}
                  className="mr-5 rounded"
                />
                <div>
                  <p>{item.product.title}</p>
                  <p>
                    ${item.price} x {item.quantity}
                  </p>
                  <p className="font-bold">Subtotal: {currencyFormat(item.price * item.quantity)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2">Delivery address</h2>
            <div className="mb-10">
              <p className="text-xl">
                {address!.firstName} {address!.lastName}
              </p>
              <p>{address!.address}</p>
              <p>{address!.address2}</p>
              <p>{address!.postalCode}</p>
              <p>
                {address!.city} {address!.countryId}
              </p>
              <p>{address!.phone}</p>
            </div>
            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10"></div>

            <h2 className="text-2xl mb-2">Order Summary</h2>
            <div className="grid grid-cols-2">
              <span>No. Products</span>
              <span className="text-right">
                {order?.itemsInOrder === 1 ? "1 article" : `${order?.itemsInOrder} articles`}
              </span>
              <span>Subtotal</span>
              <span className="text-right">{currencyFormat(order!.subTotal)}</span>
              <span>Taxes (21%)</span>
              <span className="text-right">{currencyFormat(order!.tax)}</span>
              <span className="text-2xl mt-5">Total: </span>
              <span className="text-right text-2xl mt-5">{currencyFormat(order!.total)}</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              {/* Disclaimer */}
              <div
                className={clsx("flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5", {
                  "bg-red-500": !order!.isPaid,
                  "bg-green-700": order!.isPaid,
                })}
              >
                <IoCardOutline size={30} />
                {/* <span className="mx-2">Pending payment</span> */}
                <span className="mx-2">Payment Status: {order?.isPaid ? "Paid" : "Pending"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
