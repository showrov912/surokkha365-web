export interface LocationData {
  upazila: string;
  postcode: string;
  zone: "urban" | "developing";
}

// Sample dataset of BD postcodes mapped to our pricing zones.
// Urban = 10/7.5 rate, Developing = 7/6 rate.
export const postcodesData: LocationData[] = [
  // Urban (Dhaka, etc.)
  { upazila: "Dhanmondi", postcode: "1205", zone: "urban" },
  { upazila: "Mohammadpur", postcode: "1207", zone: "urban" },
  { upazila: "Gulshan", postcode: "1212", zone: "urban" },
  { upazila: "Banani", postcode: "1213", zone: "urban" },
  { upazila: "Mirpur", postcode: "1216", zone: "urban" },
  { upazila: "Uttara", postcode: "1230", zone: "urban" },
  { upazila: "Motijheel", postcode: "1000", zone: "urban" },
  { upazila: "Ramna", postcode: "1000", zone: "urban" },
  { upazila: "Tejgaon", postcode: "1215", zone: "urban" },
  { upazila: "Chattogram Sadar", postcode: "4000", zone: "urban" },
  { upazila: "Agrabad", postcode: "4100", zone: "urban" },
  
  // Developing (Jashore, Gazipur, Savar, etc.)
  { upazila: "Jashore Sadar", postcode: "7400", zone: "developing" },
  { upazila: "Chaugachha", postcode: "7410", zone: "developing" },
  { upazila: "Abhaynagar", postcode: "7460", zone: "developing" },
  { upazila: "Bagherpara", postcode: "7470", zone: "developing" },
  { upazila: "Savar", postcode: "1340", zone: "developing" },
  { upazila: "Gazipur Sadar", postcode: "1700", zone: "developing" },
  { upazila: "Tongi", postcode: "1710", zone: "developing" },
  { upazila: "Narayanganj Sadar", postcode: "1400", zone: "developing" },
  { upazila: "Fatullah", postcode: "1420", zone: "developing" },
  { upazila: "Sylhet Sadar", postcode: "3100", zone: "developing" }
];
