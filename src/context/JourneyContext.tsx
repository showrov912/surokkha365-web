"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

export type Booking = {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  service: string;
  date: string; // Booking date or requested date
  time: string;
  amount: string;
  status: "Pending" | "Scheduled" | "Completed" | "Cancelled";
  address: string;
  customerType: "Residential" | "Commercial";
};

export type Customer = {
  id: string;
  name: string;
  type: "Residential" | "Commercial";
  phone: string;
  email: string;
  address: string;
  totalSpent: string;
  joined: string;
  status: "Active" | "Inactive";
};

interface JourneyContextType {
  bookings: Booking[];
  customers: Customer[];
  addBooking: (booking: Booking) => void;
  confirmSchedule: (bookingId: string, date: string, time: string) => void;
  completeService: (bookingId: string) => void;
  cancelBooking: (bookingId: string) => void;
  deleteCustomer: (customerId: string) => void;
}

const JourneyContext = createContext<JourneyContextType | undefined>(undefined);

export const useJourney = () => {
  const context = useContext(JourneyContext);
  if (!context) {
    throw new Error("useJourney must be used within a JourneyProvider");
  }
  return context;
};

// Initial Mock Data
const initialBookings: Booking[] = [
  { id: "SRK-8392", customerName: "Acme Corp", phone: "01712345678", email: "contact@acme.com", address: "Banani, Dhaka", customerType: "Commercial", service: "Corporate Termite Control", date: "Oct 12, 2026", time: "10:00 AM", amount: "৳45,000", status: "Pending" },
  { id: "SRK-8391", customerName: "John Doe", phone: "01811223344", email: "john@example.com", address: "Gulshan-2, Dhaka", customerType: "Residential", service: "General Pest Control", date: "Oct 11, 2026", time: "02:00 PM", amount: "৳3,500", status: "Pending" }
];

const initialCustomers: Customer[] = [
  { id: "CUST-1042", name: "Acme Corp", type: "Commercial", phone: "01712345678", email: "contact@acme.com", address: "Banani, Dhaka", totalSpent: "৳1,245,000", joined: "Jan 2024", status: "Active" },
  { id: "CUST-1041", name: "John Doe", type: "Residential", phone: "01811223344", email: "john@example.com", address: "Gulshan-2, Dhaka", totalSpent: "৳15,500", joined: "Mar 2025", status: "Active" }
];

export const JourneyProvider = ({ children }: { children: React.ReactNode }) => {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedBookings = localStorage.getItem("surokkha_bookings");
    const savedCustomers = localStorage.getItem("surokkha_customers");
    if (savedBookings) setBookings(JSON.parse(savedBookings));
    if (savedCustomers) setCustomers(JSON.parse(savedCustomers));
    setIsLoaded(true);
  }, []);

  // Save to localStorage when changed
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("surokkha_bookings", JSON.stringify(bookings));
      localStorage.setItem("surokkha_customers", JSON.stringify(customers));
      // Dispatch an event so other tabs/components know data changed
      window.dispatchEvent(new Event("journeyDataUpdated"));
    }
  }, [bookings, customers, isLoaded]);

  const addBooking = (booking: Booking) => {
    setBookings((prev) => [booking, ...prev]);
  };

  const confirmSchedule = (bookingId: string, date: string, time: string) => {
    setBookings((prev) => prev.map(b => 
      b.id === bookingId ? { ...b, status: "Scheduled", date, time } : b
    ));
  };

  const completeService = (bookingId: string) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    setBookings((prev) => prev.map(b => 
      b.id === bookingId ? { ...b, status: "Completed" } : b
    ));

    // Check if customer exists
    const customerExists = customers.find(c => c.phone === booking.phone);
    if (!customerExists) {
      // Add new customer
      const newCustomer: Customer = {
        id: `CUST-${Math.floor(1000 + Math.random() * 9000)}`,
        name: booking.customerName,
        type: booking.customerType,
        phone: booking.phone,
        email: booking.email,
        address: booking.address,
        totalSpent: booking.amount,
        joined: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        status: "Active"
      };
      setCustomers(prev => [newCustomer, ...prev]);
    } else {
      // Update existing customer's total spent
      setCustomers(prev => prev.map(c => {
        if (c.phone === booking.phone) {
          const existingAmount = parseInt(c.totalSpent.replace(/[^0-9]/g, '')) || 0;
          const newAmount = parseInt(booking.amount.replace(/[^0-9]/g, '')) || 0;
          return { ...c, totalSpent: `৳${(existingAmount + newAmount).toLocaleString()}` };
        }
        return c;
      }));
    }
  };

  const cancelBooking = (bookingId: string) => {
    setBookings(prev => prev.map(b => 
      b.id === bookingId ? { ...b, status: "Cancelled" } : b
    ));
  };

  const deleteCustomer = (customerId: string) => {
    setCustomers(prev => prev.filter(c => c.id !== customerId));
  };

  return (
    <JourneyContext.Provider value={{ bookings, customers, addBooking, confirmSchedule, completeService, cancelBooking, deleteCustomer }}>
      {children}
    </JourneyContext.Provider>
  );
};
