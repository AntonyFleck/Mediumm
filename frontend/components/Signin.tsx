import { Quote } from "@/subcomponents/Quote";
import { Auth } from "@/subcomponents/Auth";
import Appbar from "@/subcomponents/Appbar";

export default function Signin() {
  return (
    <div className="flex flex-col h-screen ">
      <Appbar />
      <div className="grid place-items-center grid-cols-1 md:grid-cols-2 justify-center h-full">
        <Auth type="signin" />
        <Quote />
      </div>
    </div>
  );
}
