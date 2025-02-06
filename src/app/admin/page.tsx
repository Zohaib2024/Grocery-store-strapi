// // import CreateProduct from "../component/Createproduct";
// import Header from "../component/Header";
// import Products from "../component/Products";

// export default async function AdminDashboard() {
//   // Protect the page from users who are not admins
//   // const isAdmin = await checkRole("admin");
//   // if (isAdmin == true) {
//   //   redirect("/admin");
//   // } else {
//   //   redirect("/");
//   // }

//   return (
//     <div>
//       <Header />
//       {/*
//       <CreateProduct /> */}
//       <Products />
//     </div>
//   );
// }

import React from "react";
import AdminTotalproducts from "../component/AdminTotalproducts";
import AdminTotalUsers from "../component/AdminTotalusers";
import Header from "../component/Header";

const AdminDashboard = () => {
  // Sample data (this would be dynamic in a real app)
  const totalProducts = 120;
  const totalSales = 350;
  const totalUsers = 250;
  const totalRevenue = 5000;
  const newOrders = 50;
  const productsOutOfStock = 12;

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AdminTotalproducts />

          {/* Card for Total Sales */}
          <div className=" p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700">Total Sales</h3>
            <p className="text-2xl font-bold text-gray-900">{totalSales}</p>
          </div>

          {/* Card for Total Users */}
          {/* <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-700">Total Users</h3>
          <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
        </div> */}
          <AdminTotalUsers />

          {/* Card for Total Revenue */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700">
              Total Revenue
            </h3>
            <p className="text-2xl font-bold text-gray-900">${totalRevenue}</p>
          </div>

          {/* Card for New Orders */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700">New Orders</h3>
            <p className="text-2xl font-bold text-gray-900">{newOrders}</p>
          </div>

          {/* Card for Products Out of Stock */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700">
              Products Out of Stock
            </h3>
            <p className="text-2xl font-bold text-gray-900">
              {productsOutOfStock}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
