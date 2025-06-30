import { CategoryList } from "@/components/category/list";
import PageHeading from "@/components/ui/page-heading";

const Page = () => {
  return (
    <div>
      <PageHeading
        title="Category List"
        link="/categories/create"
        buttonText="Add New Category"
      />
      <div>
        <CategoryList />
      </div>
    </div>
  );
};

export default Page;
