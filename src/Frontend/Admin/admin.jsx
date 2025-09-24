import { useState } from "react";

export default function Admin() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Cakes");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const [deleteCategory, setDeleteCategory] = useState("Cakes");
  const [deleteName, setDeleteName] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");

  // Add Product
  const handleAddProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", image);

    const response = await fetch("http://localhost:5000/admin/add-product", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setMessage(data.message);

    if (response.ok) {
      setName("");
      setCategory("Cakes");
      setPrice("");
      setDescription("");
      setImage(null);
    }
  };

  // Delete Product
  const handleDeleteProduct = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/admin/delete-product", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category: deleteCategory, name: deleteName }),
    });

    const data = await response.json();
    setDeleteMessage(data.message);

    if (response.ok) {
      setDeleteCategory("Cakes");
      setDeleteName("");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-md rounded mt-10">
      <h1 className="text-2xl font-bold text-center mb-10">Admin Panel</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Add Product Form */}
        <div className="p-6 rounded bg-gray-100 shadow">
          <h2 className="text-xl font-semibold mb-4">Add Product</h2>
          <form onSubmit={handleAddProduct} className="space-y-4">
            <div>
              <label className="block font-medium">Product Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block font-medium">Category:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border rounded"
                required
              >
                <option value="Cakes">Cakes</option>
                <option value="Puffs">Puffs</option>
                <option value="Sweets">Sweets</option>
                <option value="Cookies">Cookies</option>
                <option value="Snacks">Snacks</option>
              </select>
            </div>

            <div>
              <label className="block font-medium">Price (₹):</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block font-medium">Description:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded"
                rows="4"
              ></textarea>
            </div>

            <div>
              <label className="block font-medium">Product Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-blue-600 text-white font-semibold p-2 rounded"
            >
              Add Product
            </button>
          </form>

          {message && (
            <p className="mt-4 text-center text-green-600 font-medium">{message}</p>
          )}
        </div>

        {/* Delete Product Form */}
        <div className="p-6 rounded bg-gray-100 shadow">
          <h2 className="text-xl font-semibold mb-4">Delete Product</h2>
          <form onSubmit={handleDeleteProduct} className="space-y-4">
            <div>
              <label className="block font-medium">Category:</label>
              <select
                value={deleteCategory}
                onChange={(e) => setDeleteCategory(e.target.value)}
                className="w-full p-2 border rounded"
                required
              >
                <option value="Cakes">Cakes</option>
                <option value="Puffs">Puffs</option>
                <option value="Sweets">Sweets</option>
                <option value="Cookies">Cookies</option>
                <option value="Snacks">Snacks</option>
              </select>
            </div>

            <div>
              <label className="block font-medium">Product Name:</label>
              <input
                type="text"
                value={deleteName}
                onChange={(e) => setDeleteName(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter product name"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold p-2 rounded"
            >
              Delete Product
            </button>
          </form>

          {deleteMessage && (
            <p className="mt-4 text-center text-red-600 font-medium">
              {deleteMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
