import { useEffect, useState } from "react";
import axios from "axios";

export default function BookingSummary() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/bookings").then((res) => {
      setBookings(res.data);
    });
  }, []);

  const deleteBooking = (id) => {
    axios.delete(`http://localhost:5000/${id}`).then(() => {
      setBookings(bookings.filter((b) => b._id !== id));
    });
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Your Bookings</h2>
      {bookings.map((b) => (
        <div key={b._id} className="p-4 border rounded mt-2 flex justify-between">
          <div>
            <p><strong>{b.name}</strong></p>
            <p>{b.date} - {b.time}</p>
          </div>
          <button onClick={() => deleteBooking(b._id)} className="text-red-600">Cancel</button>
        </div>
      ))}
    </div>
  );
}
