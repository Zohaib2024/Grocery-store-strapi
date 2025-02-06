// "use client";
// import { useState, useEffect } from "react";
// import dynamic from "next/dynamic";

// // Dynamically import the DisplayRevenue component
// const DisplayRevenue = dynamic(() => import("../component/DisplayRevenue"), {
//   ssr: false,
// });

// interface RevenueData {
//   id: number;
//   documentId: string;
//   revenue: number;
//   createdAt: string;
//   updatedAt: string;
//   publishedAt: string;
// }

// const UpdateRevenue: React.FC = (props: any) => {
//   const [revenue, setRevenue] = useState<number>(0);

//   const API_URL = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/total-revenues/2`;
//   const AUTH_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || ""; // Optional: Add authentication token if required

//   // Fetch the current revenue from Strapi
//   useEffect(() => {
//     const fetchRevenue = async () => {
//       try {
//         const response = await fetch(API_URL);
//         const result = await response.json();
//         if (result.data) {
//           setRevenue(result.data.revenue);
//         }
//       } catch (error) {
//         console.error("Error fetching revenue:", error);
//       }
//     };

//     fetchRevenue();
//   }, []);

//   // Function to update revenue in Strapi
//   const handleUpdateRevenue = async () => {
//     try {
//       // const o = props.orderrev;
//       // const r = props.DisplayRev;
//       // console.log("lst revenue " + revenue);
//       console.log("lst revenue " + revenue);
//       const newRevenue = revenue + 10; // Increase revenue by 10
//       console.log("lst revenue " + newRevenue);
//       // const newRevenue = r + o; // Increase revenue by 10

//       const response = await fetch("/api/order-update", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`, // If required
//         },
//         body: JSON.stringify({
//           data: { revenue: newRevenue }, // Correct JSON structure
//         }),
//       });

//       if (!response.ok) {
//         const errorText = await response.text(); // Read error message
//         throw new Error(`Error ${response.status}: ${errorText}`);
//       }

//       const result = await response.json();
//       setRevenue(result.data.revenue);
//     } catch (error) {
//       console.error("Error updating revenue:", error);
//     }
//   };

//   return (
//     <div>
//       {props.DisplayRev}
//       {props.orderrev}
//       <h2>Current Revenue: {revenue}</h2>
//       <button onClick={handleUpdateRevenue}>Increase Revenue</button>
//     </div>
//   );
// };

// export default UpdateRevenue;
