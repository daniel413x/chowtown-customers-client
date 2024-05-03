import { intToPrice } from "@/lib/utils";

interface PriceProps {
  price: string | number;
  noIntToPrice?: boolean;
  testIdPrefix?: string;
}

function Price({
  price,
  noIntToPrice,
  testIdPrefix,
}: PriceProps) {
  return (
    <div className="flex justify-center">
      <span>
        $
      </span>
      <span className="text-xl" data-testid={`${testIdPrefix?.toLowerCase().split(" ").join("-")}-tsx-price`}>
        {noIntToPrice ? price : intToPrice(price)}
      </span>
    </div>
  );
}

export default Price;
