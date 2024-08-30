import Appbar from "@/subcomponents/Appbar";
import { Auth } from "@/subcomponents/Auth";
import { Quote } from "@/subcomponents/Quote";

export default function Signup() {
  return (
    <div className="flex flex-col h-screen">
      <Appbar />
      <div className="grid place-items-center grid-cols-1 md:grid-cols-2 flex-grow-0 justify-center w-screen h-full">
        <Auth type="signup" />
        <Quote />
      </div>
    </div>
  );
}
