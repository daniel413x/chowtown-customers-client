import Price from "@/components/ui/common/Price";

function DotSeparator() {
  return <div className="border-0 border-dotted border-b-2 border-b-stone-500 flex-1" />;
}

interface LineItemProps {
  label: string;
  price: string | number;
  quantity?: number;
  noIntToPrice?: boolean;
}

function LineItem({
  label,
  price,
  quantity,
  noIntToPrice,
}: LineItemProps) {
  return (
    <div className="flex justify-between w-full [font-size:12px] ">
      <div className="relative">
        <span className="uppercase">
          {label}
        </span>
        {!quantity ? null : (
          <div className="absolute -bottom-1">
            <span>
              Qt.
              {quantity}
            </span>
          </div>
        )}
      </div>
      <DotSeparator />
      <Price price={price} noIntToPrice={noIntToPrice} />
    </div>
  );
}

export default LineItem;
