"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const PropertyContactForm = ({ property }) => {
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.target);

    // ✅ Log all key-value pairs from the FormData
    console.log("🟦 Form Data being sent:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const res = await fetch("/api/add-message", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        console.error("❌ Server error response:", result);
        toast.error(result.error || "Failed to send message");
      } else {
        toast.success("✅ Message sent successfully!");
        setSubmitted(true);
      }
    } catch (err) {
      console.error("❌ Fetch error:", err);
      toast.error("An error occurred while sending the message");
    } finally {
      setSubmitting(false);
    }
  };

  if (!session) {
    return <p className="text-red-500">Please login to send a message.</p>;
  }

  if (submitted) {
    return (
      <p className="text-green-500">Your message has been sent successfully!</p>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="Property" defaultValue={property._id} />
        <input type="hidden" name="Receiver" defaultValue={property.owner} />

        <div className="mb-4">
          <label className="block mb-1">Name:</label>
          <input
            name="Name"
            required
            className="w-full border rounded px-3 py-2"
            placeholder="Your name"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Email:</label>
          <input
            name="Email"
            type="email"
            required
            className="w-full border rounded px-3 py-2"
            placeholder="Your email"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Phone:</label>
          <input
            name="Phone"
            className="w-full border rounded px-3 py-2"
            placeholder="Your phone number"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Message:</label>
          <textarea
            name="Message"
            className="w-full border rounded px-3 py-2 h-24"
            placeholder="Your message"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          {submitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default PropertyContactForm;
