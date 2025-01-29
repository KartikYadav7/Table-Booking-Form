import BookingForm from "./components/bookingForm";
import BookingSummary from "./components/bookingSummary";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold text-center">Restaurant Table Booking</h1>
      <BookingForm />
      <BookingSummary />
    </div>
  );
}
