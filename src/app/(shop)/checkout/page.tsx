import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export default function () {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Check order" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Cart */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Adjust elements</span>
            <Link href="/cart" className="underline mb-5">
              Edit cart
            </Link>

            {/* Items */}
            {productsInCart.map((product) => (
              <div key={product.slug} className="flex mb-5">
                <Image
                  src={`/products/${product.images[0]}`}
                  width={100}
                  height={100}
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                  alt={product.title}
                  className="mr-5 rounded"
                />
                <div>
                  <p>{product.title}</p>
                  <p>${product.price} x 3</p>
                  <p className="font-bold">Subtotal: ${product.price * 3}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2 font-bold">Delivery address</h2>
            <div className="mb-10">
              <p className="text-xl">Javier Orts</p>
              <p>Calle test, 123</p>
              <p>CiudadTest</p>
              <p>PaisTest</p>
              <p>CP 12345</p>
              <p>Phone: 666777888</p>
            </div>
            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10"></div>

            <h2 className="text-2xl mb-2">Order Summary</h2>
            <div className="grid grid-cols-2">
              <span>No. Products</span>
              <span className="text-right">3 articles</span>
              <span>Subtotal</span>
              <span className="text-right">$ 100</span>
              <span>Taxes (21%)</span>
              <span className="text-right">$ 21</span>
              <span className="text-2xl mt-5">Total: </span>
              <span className="text-right text-2xl mt-5">$ 121</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              {/* Disclaimer */}
              <p className="mb-5">
                <span className="text-xs">
                  By clicking the "Place Order" button, you agree to our&nbsp;
                  <a href="#" className="underline">
                    terms and conditions
                  </a>
                  of use and&nbsp;
                  <a href="#" className="underline">
                    privacy policy
                  </a>
                  .
                </span>
              </p>

              <Link
                className="flex btn-primary justify-center"
                href="/orders/123"
              >
                Place order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
