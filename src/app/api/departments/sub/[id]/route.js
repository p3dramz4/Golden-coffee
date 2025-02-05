import connectToDB from "@/configs/db";
import { isValidObjectId } from "mongoose";
import SubDepartmentModel from "@/models/SubDepartment";

export async function GET(req, { params }) {
  try {
    // اتصال به دیتابیس
    connectToDB();

    // استخراج ID از پارامترها
    const id = params.id;

    // لاگ مقدار ID برای اشکال‌زدایی
    console.log("Received ID:", id);

    // اعتبارسنجی ID
    if (!id || !isValidObjectId(id)) {
      console.error("Invalid ID provided:", id);
      return new Response(JSON.stringify({ message: "ID is not valid!", id }), {
        status: 422,
      });
    }

    // جستجوی SubDepartment‌ها
    const subDepartments = await SubDepartmentModel.find({ department: id });

    // پاسخ موفق
    return new Response(JSON.stringify(subDepartments), { status: 200 });
  } catch (err) {
    console.error("Error occurred:", err);
    return new Response(
      JSON.stringify({ message: err.message || "An error occurred" }),
      { status: 500 }
    );
  }
}
