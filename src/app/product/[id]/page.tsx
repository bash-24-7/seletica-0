"use client";

import Image from "next/image";
import { useState, use } from "react";
import { useRouter } from "next/navigation";
import {
  Heart,
  Truck,
  UserCheck,
  Mail,
  MapPin,
  Calendar,
  Sparkles,
  Check,
  Info,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { CATALOG, OUTSIDE_DHAKA_TAILOR_FEE } from "@/lib/catalog";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);

  const matched =
    CATALOG.find((p) => p.slug === resolvedParams.id || p.id === resolvedParams.id) ||
    CATALOG[0];

  const [measurementMethod, setMeasurementMethod] = useState<"IN_PERSON" | "SELF_EMAIL">("IN_PERSON");
  const [tailorGender, setTailorGender] = useState<"FEMALE" | "MALE">("FEMALE");
  const [locationZone, setLocationZone] = useState<"INSIDE_DHAKA" | "OUTSIDE_DHAKA">("INSIDE_DHAKA");
  const [districtDetails, setDistrictDetails] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [clientEmailForData, setClientEmailForData] = useState("");
  const [measurementNotes, setMeasurementNotes] = useState("");
  const [addedToast, setAddedToast] = useState(false);

  const travelAllowance =
    measurementMethod === "IN_PERSON" && locationZone === "OUTSIDE_DHAKA"
      ? OUTSIDE_DHAKA_TAILOR_FEE
      : 0;

  const totalItemPrice = matched.price + travelAllowance;

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();
    addItem({
      id: `${resolvedParams.id}-${measurementMethod}-${tailorGender}-${locationZone}`,
      name: matched.name,
      price: totalItemPrice,
      image: matched.images[0],
      quantity: 1,
      measurementMethod,
      tailorGender: measurementMethod === "IN_PERSON" ? tailorGender : undefined,
      locationZone: measurementMethod === "IN_PERSON" ? locationZone : undefined,
      districtDetails:
        measurementMethod === "IN_PERSON" && locationZone === "OUTSIDE_DHAKA"
          ? districtDetails
          : undefined,
      preferredDate: measurementMethod === "IN_PERSON" ? preferredDate : undefined,
      clientEmailForData: measurementMethod === "SELF_EMAIL" ? clientEmailForData : undefined,
      measurementNotes,
      travelAllowance,
    });
    setAddedToast(true);
    setTimeout(() => router.push("/cart"), 700);
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-6 pt-28 pb-24 text-brand-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <div className="flex flex-col gap-4">
          <div className="relative aspect-[3/4] w-full bg-zinc-900 overflow-hidden">
            <Image src={matched.images[0]} alt={matched.name} fill className="object-cover" priority />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="mb-8">
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="border border-white/40 px-3 py-1 text-xs tracking-widest uppercase">
                Piece {matched.stock} of {matched.totalPieces}
              </span>
              <span className="px-3 py-1 text-xs tracking-widest uppercase bg-zinc-800 text-brand-ash">
                Never Restocked • Bespoke Fit
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl mb-4">{matched.name}</h1>
            <div className="flex flex-wrap items-baseline gap-4 mb-6">
              <p className="text-2xl tracking-wider">৳{matched.price.toLocaleString()}</p>
              {travelAllowance > 0 && (
                <span className="text-xs uppercase tracking-widest text-amber-200">
                  + ৳{travelAllowance.toLocaleString()} (Outside Dhaka Tailor Travel & Costing)
                </span>
              )}
            </div>
            <p className="text-brand-ash font-light leading-relaxed text-sm">{matched.description}</p>
          </div>

          <form onSubmit={handleAddToCart} className="space-y-6 mb-10">
            <div className="border-t border-white/10 pt-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs tracking-[0.2em] uppercase flex items-center gap-2 font-medium">
                  <Sparkles size={14} /> 1. Bespoke Measurement Mapping
                </span>
                <span className="text-[10px] uppercase tracking-widest text-brand-ash">
                  No Prefixed Sizes
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setMeasurementMethod("IN_PERSON")}
                  className={`p-4 text-left border ${
                    measurementMethod === "IN_PERSON" ? "border-white bg-white/10" : "border-white/20"
                  }`}
                >
                  <UserCheck size={18} className="mb-2" />
                  <p className="font-serif text-base mb-1">In-Person Master Tailor</p>
                  <p className="text-[11px] text-brand-ash">Male or Female mapping person visits you.</p>
                </button>

                <button
                  type="button"
                  onClick={() => setMeasurementMethod("SELF_EMAIL")}
                  className={`p-4 text-left border ${
                    measurementMethod === "SELF_EMAIL" ? "border-white bg-white/10" : "border-white/20"
                  }`}
                >
                  <Mail size={18} className="mb-2" />
                  <p className="font-serif text-base mb-1">Self-Provided via Mail</p>
                  <p className="text-[11px] text-brand-ash">Send measurement data via email (Free).</p>
                </button>
              </div>
            </div>

            {measurementMethod === "IN_PERSON" && (
              <div className="bg-zinc-900/90 border border-white/15 p-5 space-y-5">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.2em] text-brand-ash mb-2.5">
                    2. Select Measurement Mapping Person
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setTailorGender("FEMALE")}
                      className={`py-3 px-4 text-xs uppercase tracking-widest border ${
                        tailorGender === "FEMALE" ? "border-white bg-white text-black font-semibold" : "border-white/20"
                      }`}
                    >
                      Female Person
                    </button>
                    <button
                      type="button"
                      onClick={() => setTailorGender("MALE")}
                      className={`py-3 px-4 text-xs uppercase tracking-widest border ${
                        tailorGender === "MALE" ? "border-white bg-white text-black font-semibold" : "border-white/20"
                      }`}
                    >
                      Male Person
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.2em] text-brand-ash mb-2.5">
                    3. Location Zone & Travel Allowance
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setLocationZone("INSIDE_DHAKA")}
                      className={`p-3.5 text-left border ${
                        locationZone === "INSIDE_DHAKA" ? "border-white bg-white/10" : "border-white/20"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs uppercase tracking-widest">Inside Dhaka</span>
                        <span className="text-[10px] text-green-400 font-bold">FREE (৳0)</span>
                      </div>
                      <p className="text-[11px] text-brand-ash">Complimentary visit inside Dhaka.</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setLocationZone("OUTSIDE_DHAKA")}
                      className={`p-3.5 text-left border ${
                        locationZone === "OUTSIDE_DHAKA" ? "border-white bg-white/10" : "border-white/20"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs uppercase tracking-widest">Outside Dhaka</span>
                        <span className="text-[10px] text-amber-200 font-bold">+৳5,000</span>
                      </div>
                      <p className="text-[11px] text-brand-ash">Travel allowance & other costing.</p>
                    </button>
                  </div>
                </div>

                {locationZone === "OUTSIDE_DHAKA" && (
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.2em] text-brand-ash mb-2 flex items-center gap-1.5">
                      <MapPin size={13} /> District / City Name (Outside Dhaka)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Chattogram, Sylhet, Rajshahi..."
                      value={districtDetails}
                      onChange={(e) => setDistrictDetails(e.target.value)}
                      className="w-full bg-black border border-white/30 px-4 py-3 text-sm text-white"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.2em] text-brand-ash mb-2 flex items-center gap-1.5">
                    <Calendar size={13} /> Preferred Visit Date
                  </label>
                  <input
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full bg-black border border-white/30 px-4 py-3 text-sm text-white"
                  />
                </div>
              </div>
            )}

            {measurementMethod === "SELF_EMAIL" && (
              <div className="bg-zinc-900/90 border border-white/15 p-5 space-y-4">
                <div className="flex items-start gap-2.5 text-xs text-brand-ash">
                  <Info size={16} className="text-white shrink-0 mt-0.5" />
                  <p>
                    Send your measurement data via mail to{" "}
                    <span className="text-white underline">seletica.official@gmail.com</span>.
                  </p>
                </div>
                <input
                  type="email"
                  required
                  placeholder="Your Email Address"
                  value={clientEmailForData}
                  onChange={(e) => setClientEmailForData(e.target.value)}
                  className="w-full bg-black border border-white/30 px-4 py-3 text-sm text-white"
                />
                <textarea
                  rows={2}
                  placeholder="Optional Measurements / Notes..."
                  value={measurementNotes}
                  onChange={(e) => setMeasurementNotes(e.target.value)}
                  className="w-full bg-black border border-white/30 p-3 text-sm text-white resize-none"
                />
              </div>
            )}

            <div className="flex gap-4 pt-2">
              <button
                type="submit"
                className="flex-1 bg-white text-black font-semibold py-4 px-6 text-xs tracking-[0.2em] uppercase hover:bg-white/90 flex items-center justify-center gap-2"
              >
                {addedToast ? (
                  <>
                    <Check size={16} /> Opening Cart...
                  </>
                ) : (
                  `Add to Cart • ৳${totalItemPrice.toLocaleString()}`
                )}
              </button>
              <button type="button" className="border border-white/30 p-4 hover:border-white">
                <Heart size={20} />
              </button>
            </div>
          </form>

          <div className="border-t border-white/10 pt-6 text-xs text-brand-ash flex items-start gap-3">
            <Truck size={18} className="shrink-0 text-white" />
            <p>
              Inside Dhaka measurement visits are complimentary. Outside Dhaka visits include a ৳5,000 travel & logistics allowance for your Male or Female specialist.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}