import { useState } from "react";
import { AlertCircle } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function Profile() {
  const [formData, setFormData] = useState({
    firstName: "Petter",
    lastName: "Cetera",
    city: "London",
    postalCode: "E2 4XF",
    address: "123 Example",
    email: "petter@gmail.com",
    phone: "+442223334444",
    password: "Password",
    showProfile: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
      case "lastName":
        if (!value.trim()) return "This field is required";
        if (value.trim().length < 2) return "Must be at least 2 characters";
        if (!/^[a-zA-Z\s]+$/.test(value)) return "Only letters are allowed";
        return "";

      case "city":
        if (!value.trim()) return "City is required";
        if (!/^[a-zA-Z\s]+$/.test(value)) return "Only letters are allowed";
        return "";

      case "postalCode":
        if (!value.trim()) return "Postal code is required";
        return "";

      case "address":
        if (!value.trim()) return "Address is required";
        if (value.trim().length < 5)
          return "Address must be at least 5 characters";
        return "";

      case "email":
        if (!value.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Invalid email format";
        return "";

      case "phone":
        if (!value.trim()) return "Phone is required";
        if (!/^[\d\s+()-]+$/.test(value)) return "Invalid phone format";
        if (value.replace(/\D/g, "").length < 10)
          return "Phone must be at least 10 digits";
        return "";

      case "password":
        if (!value) return "Password is required";
        if (value.length < 6) return "Password must be at least 6 characters";
        return "";

      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (touched[name]) {
      const error = validateField(name, newValue);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    const newTouched = {};

    Object.keys(formData).forEach((key) => {
      if (key !== "showProfile") {
        newTouched[key] = true;
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });

    setTouched(newTouched);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      toast.success("Profile saved successfully!", {
        duration: 3000,
        position: "top-right",
        style: {
          background: "#fff",
          color: "green",
          fontWeight: "400",
        },
      });
      console.log("Form submitted:", formData);
    } else {
      toast.error("Please fix the errors in the form", {
        duration: 3000,
        position: "top-right",
        style: {
          background: "#dc2626",
          color: "#fff",
          fontWeight: "500",
        },
      });
    }
  };

  return (
    <div className="ms-[240px] p-8">
      <Toaster />

      <div className=" bg-white rounded-lg">
        <div className="bg-[#008B5D] rounded-t-lg p-6 flex items-center gap-4">
          <img
            src="/img/bag.png"
            className="h-[72px] p-2 bg-white rounded-full"
            alt=""
          />
          <div className="text-white">
            <h1 className="text-2xl font-semibold mb-2">Premium Account</h1>
            <p className="text-[15px] text-emerald-50 leading-relaxed">
              You have a premium account, granting you access to all the
              remarkable features offered by ResumeDone. With this privilege,
              you can indulge in the freedom of downloading an unlimited number
              of resumes and cover letters in both PDF and Word formats.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 px-0">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Personal Information
          </h2>

          <div className="flex gap-8">
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <div
                    className={`relative border rounded-lg bg-white pb-2 ${
                      formData.firstName ? "pt-4" : "pt-2"
                    } px-4 ${
                      errors.firstName && touched.firstName
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <label
                      className={`${
                        formData.firstName ? "block" : "hidden"
                      } absolute -top-2 bg-white px-2 left-2 text-xs text-gray-600`}
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full text-base text-gray-900 bg-transparent border-0 focus:outline-none p-0"
                    />
                  </div>
                  {errors.firstName && touched.firstName && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <div
                    className={`relative border rounded-lg bg-white  ${
                      formData.lastName ? "pt-4" : "pt-2"
                    }  pb-2 px-4 ${
                      errors.lastName && touched.lastName
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <label
                      className={`${
                        formData.lastName ? "block" : "hidden"
                      } absolute -top-2 bg-white px-2 left-2 text-xs text-gray-600`}
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      placeholder="Last Name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full text-base text-gray-900 bg-transparent border-0 focus:outline-none p-0"
                    />
                  </div>
                  {errors.lastName && touched.lastName && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <div
                    className={`relative border rounded-lg bg-white  ${
                      formData.city ? "pt-4" : "pt-2"
                    }  pb-2 px-4 ${
                      errors.city && touched.city
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <label
                      className={`${
                        formData.city ? "block" : "hidden"
                      } absolute -top-2 bg-white px-2 left-2 text-xs text-gray-600`}
                    >
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      placeholder="City Name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full text-base text-gray-900 bg-transparent border-0 focus:outline-none p-0"
                    />
                  </div>
                  {errors.city && touched.city && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.city}
                    </p>
                  )}
                </div>

                <div>
                  <div
                    className={`relative border rounded-lg bg-white  ${
                      formData.postalCode ? "pt-4" : "pt-2"
                    }  pb-2 px-4 ${
                      errors.postalCode && touched.postalCode
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <label
                      className={`${
                        formData.postalCode ? "block" : "hidden"
                      } absolute -top-2 bg-white px-2 left-2 text-xs text-gray-600`}
                    >
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      placeholder="Postal Code"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full text-base text-gray-900 bg-transparent border-0 focus:outline-none p-0"
                    />
                  </div>
                  {errors.postalCode && touched.postalCode && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.postalCode}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <div
                  className={`relative border rounded-lg bg-white  ${
                    formData.address ? "pt-4" : "pt-2"
                  }  pb-2 px-4 ${
                    errors.address && touched.address
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                >
                  <label
                    className={`${
                      formData.address ? "block" : "hidden"
                    } absolute -top-2 bg-white px-2 left-2 text-xs text-gray-600`}
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    placeholder="Address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full text-base text-gray-900 bg-transparent border-0 focus:outline-none p-0"
                  />
                </div>
                {errors.address && touched.address && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.address}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <div
                    className={`relative border rounded-lg bg-white  ${
                      formData.email ? "pt-4" : "pt-2"
                    }  pb-2 px-4 ${
                      errors.email && touched.email
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <label
                      className={`${
                        formData.email ? "block" : "hidden"
                      } absolute -top-2 bg-white px-2 left-2 text-xs text-gray-600`}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      placeholder="Email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full text-base text-gray-900 bg-transparent border-0 focus:outline-none p-0 pr-8"
                    />
                  </div>
                  {errors.email && touched.email && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <div
                    className={`relative border rounded-lg bg-white  ${
                      formData.phone ? "pt-4" : "pt-2"
                    }  pb-2 px-4 ${
                      errors.phone && touched.phone
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <label
                      className={`${
                        formData.phone ? "block" : "hidden"
                      } absolute -top-2 bg-white px-2 left-2 text-xs text-gray-600`}
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      placeholder="Phone"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full text-base text-gray-900 bg-transparent border-0 focus:outline-none p-0"
                    />
                  </div>
                  {errors.phone && touched.phone && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="mb-6 col-span-1">
                  <div
                    className={`relative border w-full rounded-lg bg-white  ${
                      formData.password ? "pt-4" : "pt-2"
                    }  pb-2 px-4 max-w-xs ${
                      errors.password && touched.password
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <label
                      className={`${
                        formData.password ? "block" : "hidden"
                      } absolute -top-2 bg-white px-2 left-2 text-xs text-gray-600`}
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      placeholder="Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full text-base text-gray-900 bg-transparent border-0 focus:outline-none p-0"
                    />
                  </div>
                  {errors.password && touched.password && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-6">
                Use this email to log in to your{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  resumedone.io
                </a>{" "}
                account and receive notifications.
              </p>

              <button
                type="submit"
                className="bg-[#1688FE] hover:bg-blue-600 text-white font-medium px-8 py-3 w-[170px] rounded-md transition-colors"
              >
                Save
              </button>

              <div className="mt-6 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="showProfile"
                  name="showProfile"
                  checked={formData.showProfile}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="showProfile" className="text-sm text-gray-600">
                  Show my profile to serious employers on{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    hirethesbest.io
                  </a>{" "}
                  for free
                </label>
              </div>
            </div>

            <div className="flex-shrink-0">
              <div className="w-[144px] h-[144px] rounded-full overflow-hidden bg-gradient-to-br from-emerald-200 to-teal-100">
                <img
                  src="/img/user2.png"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </form>
        <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Delete account
          </h2>
          <p className="text-gray-600 mb-4">
            If you delete your account you’ll be permanently removing it from
            our systems – you can’t undo it.
          </p>
          <button className="text-red-600 font-medium hover:underline">
            Yes, Delete my account
          </button>
        </div>

        <div className="w-full mt-8">
          <p className="text-gray-700 text-sm">
            <a href="#" className="text-blue-600 hover:underline">
              Get in touch with our support team
            </a>{" "}
            if you have any question or want to leave some feedback. <br />
            We’ll be happy to hear from you.
          </p>
        </div>

        <footer className="w-full flex flex-wrap gap-10 text-sm text-gray-500 mt-6 border-t pt-4">
          <a href="#">Terms & Conditions</a>
          <a href="#">Privacy Policy</a>
          <a href="#">FAQ</a>
          <a href="#">Contact Us</a>
        </footer>
      </div>
    </div>
  );
}