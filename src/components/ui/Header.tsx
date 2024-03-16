import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

function Header() {
  console.log();
  return (
    <div
      className="border-b-2 border-b-orange-500 py-6"
    >
      <div className="container flex mx-auto justify-between items-center">
        <Link
          className="text-3xl font-bold tracking-light text-orange-500"
          to="/"
        >
          ChowTown
        </Link>
        <HamburgerMenuIcon />
      </div>
    </div>
  );
}

export default Header;
