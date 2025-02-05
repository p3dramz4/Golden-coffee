import connectToDB from "@/configs/db";
import ProductModel from "@/models/Product";
import { writeFile } from "fs/promises";
import path from "path";


export async function GET(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const productID = searchParams.get("id");
    const smell = searchParams.get("smell");
    const limit = parseInt(searchParams.get("limit")) || 0;
    const page = parseInt(searchParams.get("page")) || 1;
    const skip = (page - 1) * limit;

    console.log("Request Params:", { productID, smell, limit, page, skip });

    if (productID) {
      console.log(`Fetching product with ID: ${productID}`);
      const product = await ProductModel.findById(productID).populate(
        "comments"
      );

      if (!product) {
        console.error(`Product with ID ${productID} not found.`);
        return Response.json({ message: "Product not found" }, { status: 404 });
      }
      console.log(`Found product:`, product);
      return Response.json(product, { status: 200 });

    } else if (smell) {
      console.log(`Fetching related products with smell: ${smell}`);
      const relatedProducts = await ProductModel.find({ smell }).limit(4);

      if (relatedProducts.length === 0) {
        console.log(`No related products found for smell: ${smell}`);
      } else {
        console.log(`Found related products:`, relatedProducts);
      }
       return Response.json(relatedProducts, { status: 200 });

    } else {
      console.log("Fetching all products with pagination");
      const totalProducts = await ProductModel.countDocuments();
      const totalPages = Math.ceil(totalProducts / limit);

      console.log(
        `Total products: ${totalProducts}, Total pages: ${totalPages}`
      );

      const products = await ProductModel.find({}, "-__v")
        .populate("comments")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

      if (!products.length) {
        console.log("No products found.");
        return Response.json({ message: "No products found" }, { status: 404 });
      }

      console.log(`Found products:`, products);
      return Response.json(
        {
          products,
          totalPages,
          currentPage: page,
          totalProducts,
        },
        { status: 200 }
      );
    }
  } catch (err) {
    console.error("Error in GET /api/products:", err);
    return Response.json(
      { message: "An error occurred", error: err.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectToDB();

    let body;
    let isFormData = req.headers
      .get("content-type")
      ?.includes("multipart/form-data");

    if (isFormData) {
      const formData = await req.formData();
      body = {
        name: formData.get("name"),
        price: formData.get("price"),
        shortDescription: formData.get("shortDescription"),
        longDescription: formData.get("longDescription"),
        weight: formData.get("weight"),
        suitableFor: formData.get("suitableFor"),
        smell: formData.get("smell"),
        tags: formData.get("tags"),
        images: formData.getAll("images"), // چند تصویر
      };
    } else {
      body = await req.json();
    }

    if (Array.isArray(body)) {
      const products = body.map(product => {
        const {
          name,
          price,
          shortDescription,
          longDescription,
          weight,
          suitableFor,
          smell,
          tags,
          images,
        } = product;

        if (
          !name ||
          !price ||
          !shortDescription ||
          !longDescription ||
          !weight ||
          !suitableFor ||
          !smell ||
          !tags ||
          !images
        ) {
          throw new Error(
            "All fields are required for each product in the array"
          );
        }

        return {
          name,
          price,
          shortDescription,
          longDescription,
          weight,
          suitableFor,
          smell,
          tags,
          images,
        };
      });

      const createdProducts = await ProductModel.insertMany(products);
      return Response.json(
        { message: "Products created successfully", data: createdProducts },
        { status: 201 }
      );
    } else {
      let {
        name,
        price,
        shortDescription,
        longDescription,
        weight,
        suitableFor,
        smell,
        tags,
        images,
      } = body;

      if (
        !name ||
        !price ||
        !shortDescription ||
        !longDescription ||
        !weight ||
        !suitableFor ||
        !smell ||
        !tags
      ) {
        throw new Error("All fields are required");
      }

      if (isFormData && images.length > 0) {
        const imagePaths = [];
        for (const img of images) {
          const buffer = Buffer.from(await img.arrayBuffer());
          const filename = Date.now() + "-" + img.name;
          const imgPath = path.join(process.cwd(), "public/uploads", filename);
          await writeFile(imgPath, buffer);
          imagePaths.push(`/uploads/${filename}`);
        }
        images = imagePaths;
      }

      const product = await ProductModel.create({
        name,
        price,
        shortDescription,
        longDescription,
        weight,
        suitableFor,
        smell,
        tags,
        images,
      });

      return Response.json(
        { message: "Product created successfully", data: product },
        { status: 201 }
      );
    }
  } catch (err) {
    return Response.json(
      { message: "An error occurred", error: err.message },
      { status: 500 }
    );
  }
}

// Image Uploader
export async function PUT(req) {
  const formData = await req.formData();
  const img = formData.get("img");

  // Validation
  if (!img) {
    return Response.json(
      { message: "Product has not image !!" },
      { status: 400 }
    );
  }

  try {
    const buffer = Buffer.from(await img.arrayBuffer());
    const filename = Date.now() + img.name;

    await writeFile(
      path.join(process.cwd(), "public/uploads/" + filename),
      buffer
    );

    // ✅
    return Response.json(
      { message: "File uploaded successfully :))" },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return Response.json({ message: err.message }, { status: 500 });
  }
}
