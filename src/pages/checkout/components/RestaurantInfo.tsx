interface RestaurantInfoProps {
  label: string;
  figure: string | number;
}

function RestaurantInfo({
  label,
  figure,
}: RestaurantInfoProps) {
  return (
    <div className="flex flex-col">
      <span className="text-xs uppercase">
        {label}
        :
      </span>
      <span className="">
        {figure}
      </span>
    </div>
  );
}

export default RestaurantInfo;
