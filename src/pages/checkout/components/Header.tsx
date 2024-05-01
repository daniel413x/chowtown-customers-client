import Price from "@/components/ui/common/Price";

function DotSeparator() {
  return <div className="border-0 border-dotted border-b-2 border-b-stone-500 flex-1" />;
}

interface LineItemProps {
  label: string;
  price: string | number;
  noIntToPrice?: boolean;
}

function LineItem({
  label,
  price,
  noIntToPrice,
}: LineItemProps) {
  return (
    <div className="flex justify-between w-full [font-size:12px] uppercase">
      <span>
        {label}
      </span>
      <DotSeparator />
      <Price price={price} noIntToPrice={noIntToPrice} />
    </div>
  );
}

export default LineItem;
