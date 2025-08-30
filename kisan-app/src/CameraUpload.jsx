import { useState } from "react";
import { Link } from "react-router-dom";

export default function CameraUpload() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (image) formData.append("image", image);

    const res = await fetch("http://localhost:5000/predict", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    alert("✅ Image uploaded & saved in DB");
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-green-700 mb-4 text-center">
          📷 Camera Upload
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-64 object-cover rounded-xl border"
            />
          )}

          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            className="w-full"
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            Upload
          </button>
        </form>

        <Link
          to="/"
          className="block text-center mt-4 text-green-600 hover:underline"
        >
          ⬅ Back to Home
        </Link>
      </div>
    </div>
  );
}
