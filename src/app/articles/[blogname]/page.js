import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import Footer from "@/components/modules/Footer/footer";
import Navbar from "@/components/modules/Navbar/Navbar";
import Comment from "@/components/templates/article/comment/Comment";
import Details from "@/components/templates/article/details/Details";
import styles from "@/styles/article.module.css";
import { authUser } from "@/utils/serverHelpers";

const BlogPage = async ({ params }) => {
  const user = await authUser();
  const { blogname } = params;

  return (
    <>
      <Navbar isLogin={user ? true : false} />
      <Breadcrumb route={blogname || "مقاله"} />
      <div className={styles.container}>
        <Details blogname={blogname} />
        <Comment />
      </div>
      <Footer />
    </>
  );
};

export default BlogPage;
