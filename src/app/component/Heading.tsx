import React from "react";
import { CardTitle } from "@/components/ui/card";

const Heading = (props: any) => {
  return (
    <CardTitle>
      <div className="text-green-700  font-bold text-2xl  md:font-extrabold md:text-5xl text-center my-10">
        {props.title}
      </div>
    </CardTitle>
  );
};

export default Heading;
