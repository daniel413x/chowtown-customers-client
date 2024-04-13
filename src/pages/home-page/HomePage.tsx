import landingImage from "@/assets/landing.png";
import appDownloadImage from "@/assets/appDownload.png";
import Searchbar from "@/components/ui/common/Searchbar";

function HomePage() {
  return (
    <div className="flex flex-col gap-12">
      <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-orange-600">
          Tuck into takeaway today...
        </h1>
        <span className="text-xl text-orange-500">
          ...with food just a click away!
        </span>
        <Searchbar
          placeholder="Search"
        />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <img
          src={landingImage}
          alt="App illustrations"
        />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Order takeaway even faster!
          </span>
          <span>
            Download the ChowTown App for faster ordering and personalized recommendations
          </span>
          <img
            src={appDownloadImage}
            alt="App download buttons"
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
