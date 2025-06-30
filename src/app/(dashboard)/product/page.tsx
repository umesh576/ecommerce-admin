import { ProductList } from "@/components/products/list";
import PageHeading from "@/components/ui/page-heading";

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
