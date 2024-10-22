import React, { useState } from "react";

const AdminCategories = () => {
  // Sample category data
  const [categories, setCategories] = useState([
    {
      _id: "1",
      name: "Deluxe Room",
      price: 120,
      description: "Spacious room with a balcony and sea view.",
      features: ["Sea view", "King-sized bed", "Free breakfast"],
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO_b-YTwImwx9xjkL6YE5MMK1rxqNgkC1_7Q&s",
    },
    {
      _id: "2",
      name: "Standard Room",
      price: 80,
      description: "Comfortable room with basic amenities.",
      features: ["Queen-sized bed", "Free Wi-Fi"],
      image: "standard_room.jpg",
    },
  ]);

  const [editCategory, setEditCategory] = useState(null);

  // Handle category update
  const handleUpdate = (id, updatedCategory) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category._id === id ? updatedCategory : category
      )
    );
    setEditCategory(null); // Exit edit mode
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-8 text-gray-800">
        Admin Categories
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-left">Features</th>
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {categories.map((category) => (
              <tr
                key={category._id}
                className="border-b border-gray-200 hover:bg-gray-100 transition duration-150"
              >
                {/* Name is non-editable */}
                <td className="py-3 px-6 text-left">{category.name}</td>

                {/* Price */}
                <td className="py-3 px-6 text-left">
                  {editCategory === category._id ? (
                    <input
                      type="number"
                      value={category.price}
                      onChange={(e) =>
                        setCategories((prev) =>
                          prev.map((cat) =>
                            cat._id === category._id
                              ? { ...cat, price: e.target.value }
                              : cat
                          )
                        )
                      }
                      className="border border-gray-300 p-2 rounded-md"
                    />
                  ) : (
                    `$${category.price}`
                  )}
                </td>

                {/* Description */}
                <td className="py-3 px-6 text-left">
                  {editCategory === category._id ? (
                    <textarea
                      value={category.description}
                      onChange={(e) =>
                        setCategories((prev) =>
                          prev.map((cat) =>
                            cat._id === category._id
                              ? { ...cat, description: e.target.value }
                              : cat
                          )
                        )
                      }
                      className="border border-gray-300 p-2 rounded-md w-full"
                    />
                  ) : (
                    category.description
                  )}
                </td>

                {/* Features */}
                <td className="py-3 px-6 text-left">
                  {editCategory === category._id ? (
                    <input
                      type="text"
                      value={category.features.join(", ")}
                      onChange={(e) =>
                        setCategories((prev) =>
                          prev.map((cat) =>
                            cat._id === category._id
                              ? {
                                  ...cat,
                                  features: e.target.value.split(", "),
                                }
                              : cat
                          )
                        )
                      }
                      className="border border-gray-300 p-2 rounded-md"
                    />
                  ) : (
                    category.features.join(", ")
                  )}
                </td>

                {/* Image */}
                <td className="py-3 px-6 text-left">
                  {editCategory === category._id ? (
                    <input
                      type="text"
                      value={category.image}
                      onChange={(e) =>
                        setCategories((prev) =>
                          prev.map((cat) =>
                            cat._id === category._id
                              ? { ...cat, image: e.target.value }
                              : cat
                          )
                        )
                      }
                      className="border border-gray-300 p-2 rounded-md"
                    />
                  ) : (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                  )}
                </td>

                {/* Actions */}
                <td className="py-3 px-6 text-center">
                  {editCategory === category._id ? (
                    <button
                      onClick={() => handleUpdate(category._id, category)}
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditCategory(category._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCategories;
