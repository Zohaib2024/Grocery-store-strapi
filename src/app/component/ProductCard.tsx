// import Image from "next/image";
// function ProductCard({
//     product,
//     imageUrl,
//     onAddToCart,
//     cartItems, // Include cartItems in the props
//     dispatch,
//   }: {
//     product: any;    imageUrl: string;
//     onAddToCart: (product: any) => void;
//     cartItems: CartItem[]; // Add cartItems type here
//     dispatch: any;
//   }) {
//     return (
//       <Card className="p-4 flex flex-col items-center mb-10">
//         <Link href={`/product/${product.id}`} passHref>
//           <div className="flex flex-col items-center">
//             <CardTitle className="text-lg md:text-2xl mb-2">
//               {product.Title}
//             </CardTitle>
//             <CardDescription className="text-gray-600 text-md md:text-xl text-center mb-4">
//               Rs {product.Price}
//             </CardDescription>
//             <Image
//               src={imageUrl}
//               width={200}
//               height={200}
//               alt={product.Title}
//               className="rounded-md mb-4 w-[200px] md:w-auto"
//             />
//           </div>
//         </Link>

//         <Button
//           onClick={() => onAddToCart(product)}
//           className="bg-green-700 hover:bg-green-800 text-white md:h-10"
//         >
//           Add to Cart
//         </Button>
//       </Card>
//     );
//   }
