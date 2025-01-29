import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

export default function BookingForm() {
 
  const [message, setMessage] = useState("");
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:5000", data);
      setMessage("Booking successful!");
      reset();
    } catch (error) {
        console.error(error);
      setMessage("Error making booking.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 border rounded-lg shadow-lg bg-white">
      <h2 className="text-xl font-bold mb-4">Book a Table</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
  <input {...register("name", { required: "Name is required", minLength: { value: 3, message: "Name must be at least 3 characters" }})} 
         className="w-full p-2 border rounded" placeholder="Your Name" />
  {errors.name && <p className="text-red-500">{errors.name.message}</p>}

  <input {...register("contact", { required: "Contact is required", pattern: { value: /^\d{10}$/, message: "Invalid phone number" } })} 
         className="w-full p-2 border rounded" placeholder="Contact Info" />
  {errors.contact && <p className="text-red-500">{errors.contact.message}</p>}

  <input {...register("date", { required: "Date is required" })} type="date" className="w-full p-2 border rounded" />
  {errors.date && <p className="text-red-500">{errors.date.message}</p>}

  <input {...register("time", { required: "Time is required" })} type="time" className="w-full p-2 border rounded" />
  {errors.time && <p className="text-red-500">{errors.time.message}</p>}

  <input {...register("partySize", { required: "Party size is required", min: { value: 1, message: "At least 1 person" }, max: { value: 10, message: "Max 10 people" }})} 
         type="number" className="w-full p-2 border rounded" placeholder="Party Size" />
  {errors.partySize && <p className="text-red-500">{errors.partySize.message}</p>}

  <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Book Now</button>
</form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}
