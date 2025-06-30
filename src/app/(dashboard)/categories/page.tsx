import { CategoryList } from "@/component/category/list";
import PageHeading from "@/component/ui/page-heading";
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
