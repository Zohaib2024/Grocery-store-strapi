import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export function Productcard({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardTitle className="text-2xl">Product Name</CardTitle>

        <CardDescription>price </CardDescription>
        <Image
          src=""
          width={200}
          height={200}
          alt=""
          className="rounded-md mb-4"
        />
        <Button variant="green" className="h-10">
          Button
        </Button>
      </Card>
    </div>
  );
}
