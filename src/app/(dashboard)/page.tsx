// import PageHeading from "@/components/ui/page-heading";
import PageHeading from "@/component/ui/page-heading";

const Page = () => {
  return (
    <div>
      <PageHeading
        title="Products List"
        link="/products/create"
        buttonText="Add New Product"
      />
    </div>
  );
};

export default Page;
