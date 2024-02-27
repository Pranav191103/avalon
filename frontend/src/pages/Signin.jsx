import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return;
      }

      navigate("/");
      setLoading(false);

      console.log(formData);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-3 w-1/3 mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="email"
            id="email"
            className="p-3 border rounded-lg "
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="password"
            id="password"
            className="p-3 border rounded-lg "
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>
        <div className="flex gap-2 mt-5">
          <p>Do you currently have no account?</p>
          <Link to={"/sign-up"}>
            <span className="text-blue-700">Sign Up</span>
          </Link>
        </div>
        {error && <p className="text-red-500">{error.message}</p>}
      </div>
    </div>
  );
};
export default SignIn;
