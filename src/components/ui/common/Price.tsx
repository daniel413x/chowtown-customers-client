import { intToPrice } from "@/lib/utils";

interface PriceProps {
  price: string | number;
  noIntToPrice?: boolean;
}

function Price({
  price,
  noIntToPrice,
}: PriceProps) {
  return (
    <div className="flex justify-center">
      <span>
        $
      </span>
      <span className="text-xl">
        {noIntToPrice ? price : intToPrice(price)}
      </span>
    </div>
  );
}

export default Price;
