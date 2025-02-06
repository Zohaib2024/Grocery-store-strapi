import Heading from "./component/Heading";
import Productlist from "./component/Productlist";
import Image from "next/image";

import Slider from "./component/Slider";
import { CategoryList } from "@/components/ui/CarosulSize";
import Header from "./component/Header";

export default async function Home() {
  return (
    <div>
      <Header />
      <div className="px-10 md:px-20">
        <Heading title="Welcome to Grocery store " />

        <Slider />
        <Heading title="Categories" />
        <CategoryList />
        <Heading title="Products" />
        <Productlist />
      </div>
    </div>
  );
}
