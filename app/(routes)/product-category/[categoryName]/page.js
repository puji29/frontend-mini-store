
import GlobalApi from "@/lib/GlobalApi";
import React from "react";
import TopCategory from "../_components/TopCategory";
import ProductList from "@/app/_components/ProductList";

async function ProductCategory({ params }) {
  const productList = await GlobalApi.getProductByCategory(params?.categoryName);
  
  const categoryList = await GlobalApi.getCategoryList();
  return (
    <div>
      <h2 className="p-4 bg-primary text-white font-bold text-3xl text-center">
        {params.categoryName}
      </h2>
      <TopCategory categoryList={categoryList}
      selectedCategory={params.categoryName} />
      <div className="p-5 md:p-10">
        <ProductList productList={productList} />
      </div>
    </div>
  );
}

export default ProductCategory;
