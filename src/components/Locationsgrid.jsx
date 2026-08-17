"use client";

import LocationCard from "./LocationCard";

const locations = [
  {
    id: "kolkata",
    tag: "Headquarters",
    city: "Kolkata",
    country: "India",
    address: "4th Floor, Salt Lake Sector V, Kolkata, WB 700091",
    phone: "+91 33 4000 1122",
    email: "kolkata@acceliaclinicalsolutions.com",
    hours: "Mon–Fri, 9:30 AM–6:30 PM IST",
    mapUrl: "https://maps.google.com/?q=Salt+Lake+Sector+V+Kolkata",
  },
  {
    id: "bengaluru",
    tag: "Regional Office",
    city: "Bengaluru",
    country: "India",
    address: "Tower B, Outer Ring Road, Bengaluru, KA 560103",
    phone: "+91 80 4000 3344",
    email: "bengaluru@acceliaclinicalsolutions.com",
    hours: "Mon–Fri, 9:30 AM–6:30 PM IST",
    mapUrl: "https://maps.google.com/?q=Outer+Ring+Road+Bengaluru",
  },
  {
    id: "hyderabad",
    tag: "Regional Office",
    city: "Hyderabad",
    country: "India",
    address: "HITEC City, Madhapur, Hyderabad, TG 500081",
    phone: "+91 40 4000 5566",
    email: "hyderabad@acceliaclinicalsolutions.com",
    hours: "Mon–Fri, 9:30 AM–6:30 PM IST",
    mapUrl: "https://maps.google.com/?q=HITEC+City+Hyderabad",
  },
  {
    id: "distributed",
    tag: "Remote-First",
    city: "Distributed Team",
    country: "Across India",
    address: "Site coordinators and CRAs embedded near every active trial site",
    phone: "+91 90000 12345",
    email: "team@acceliaclinicalsolutions.com",
    hours: "Always-on, follow-the-sun coverage",
  },
];

export default function LocationsGrid() {
  return (
    <section
      className="py-16 sm:py-20 px-4 sm:px-6"
      style={{ backgroundColor: "#f6f9ff" }}
    >
      <div className="max-w-5xl mx-auto">
        <h2
          className="text-3xl sm:text-4xl font-semibold"
          style={{
            color: "#0b1e3d",
            fontFamily: "var(--font-display, 'Sora', sans-serif)",
          }}
        >
          Where to find us
        </h2>
        <p
          className="mt-3 max-w-xl text-sm sm:text-base"
          style={{ color: "#64748b" }}
        >
          Headquartered in Kolkata, with regional teams and site-embedded staff
          across India.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {locations.map((loc) => (
            <LocationCard key={loc.id} location={loc} />
          ))}
        </div>
      </div>
    </section>
  );
}
