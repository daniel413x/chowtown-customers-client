import logo from "@/assets/logo-white.png";

function Footer() {
  return (
    <div className="bg-orange-500 py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <span className="text-3xl text-white font-bold tracking-tight">
          <img
            src={logo}
            alt="Company logo"
            className="w-3/4"
          />
        </span>
        <span className="text-white font-bold tracking-tight flex gap-4">
          <span>
            Privacy Policy
          </span>
          &bull;
          <span>
            Terms of Service
          </span>
        </span>
      </div>
    </div>
  );
}

export default Footer;
