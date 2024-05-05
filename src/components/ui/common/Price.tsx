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
    <div className="flex justify-center [font-family:Lato] relative top-0.5">
      <span className="relative bottom-0.5">
        $
      </span>
      <span className="text-lg text-black/90" data-testid={`${testIdPrefix?.toLowerCase().split(" ").join("-")}-tsx-price`}>
        {noIntToPrice ? price : intToPrice(price)}
      </span>
    </div>
  );
}

export default Price;
