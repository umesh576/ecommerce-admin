import { ProductList } from "@/component/products/list";
import PageHeading from "@/component/ui/page-heading";
const Page = () => {
  return (
    <div>
      <PageHeading
        title="Products List"
        link="/products/create"
        buttonText="Add New Product"
      />
      <div>
        <ProductList />
      </div>
    </div>
  );
};

export default Page;
