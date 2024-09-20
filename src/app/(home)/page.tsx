import Feed from "./components/Feed";
import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";

export default function Home() {
  return (
    <main className="my-2">
      <div className="container">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-3">
            <LeftSide />
          </div>

          <div className="col-span-6">
            <Feed />
          </div>

          <div className="col-span-3">
            <RightSide />
          </div>
        </div>
      </div>
    </main>
  );
}
