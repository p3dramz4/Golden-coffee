import { useState } from "react";
import Comment from "@/components/modules/comment/Comment";
import CommentForm from "./CommentForm";

const Comments = ({ productID, comments = [], product }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const commentsPerPage = 5;

  const pageCount = Math.ceil(comments.length / commentsPerPage);

  const acceptedComments = comments.filter(comment => comment.isAccept);

  const currentComments = acceptedComments.slice(
    currentPage * commentsPerPage,
    Math.min((currentPage + 1) * commentsPerPage, acceptedComments.length)
  );

  const handlePageChange = newPage => {
    setCurrentPage(newPage);
  };

  return (
    <div className="font-Dana text-zinc-700 dark:text-white">
      <p>نظرات ({acceptedComments.length}) :</p>
      <hr />

      <main className="lg:flex gap-5 lg:gap-8 xl:gap-10">
        <div className="flex flex-col justify-around xl:min-w-[540px]">
          <p>
            {acceptedComments.length} دیدگاه برای{" "}
            {product?.name || "محصول نامشخص"}
          </p>
          <div>
            {currentComments.map(comment => (
              <Comment key={comment._id} {...comment} />
            ))}
          </div>

          {acceptedComments.length > commentsPerPage && (
            <div className="flex justify-center my-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg mx-2 hover:bg-gray-400 transition-all"
                disabled={currentPage === 0}
                onClick={() => handlePageChange(currentPage - 1)}>
                قبلی
              </button>
              <div className="flex items-center gap-2">
                {Array.from({ length: pageCount }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index)}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === index
                        ? "bg-teal-600 text-white"
                        : "bg-gray-300 text-gray-700"
                    } hover:bg-teal-500 hover:text-white transition-all`}>
                    {index + 1}
                  </button>
                ))}
              </div>
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg mx-2 hover:bg-gray-400 transition-all"
                disabled={currentPage === pageCount - 1}
                onClick={() => handlePageChange(currentPage + 1)}>
                بعدی
              </button>
            </div>
          )}
        </div>
        <div className="w-full lg:w-1/2">
          <CommentForm productID={productID} />
        </div>
      </main>
    </div>
  );
};

export default Comments;
