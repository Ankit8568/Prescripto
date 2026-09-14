import mongoose from "mongoose";
import bcrypt from "bcrypt";
import doctorModel from "./models/doctorModel.js";
import "dotenv/config";

const doctors = [
  {
    name: "Dr. Richard James",
    email: "richard@example.com",
    speciality: "General physician",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Richard James has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 50,
    image:
      "https://res.cloudinary.com/tlpkufxr/image/upload/v1789413762/doc1.png",
    address: {
      line1: "17th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },

  {
    name: "Dr. Emily Larson",
    email: "emily@example.com",
    speciality: "Gynecologist",
    degree: "MBBS",
    experience: "3 Years",
    about:
      "Dr. Emily Larson has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 60,
    image:
      "https://res.cloudinary.com/tlpkufxr/image/upload/v1789413762/doc2.png",
    address: {
      line1: "27th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },

  {
    name: "Dr. Sarah Patel",
    email: "sarah@example.com",
    speciality: "Dermatologist",
    degree: "MBBS",
    experience: "1 Years",
    about:
      "Dr. Sarah Patel has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 30,
    image:
      "https://res.cloudinary.com/tlpkufxr/image/upload/v1789413764/doc3.png",
    address: {
      line1: "37th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },

  {
    name: "Dr. Christopher Lee",
    email: "christopher.lee@example.com",
    speciality: "Pediatricians",
    degree: "MBBS",
    experience: "5 Years",
    about:
      "Dr. Christopher Lee is dedicated to providing comprehensive and compassionate healthcare for children and families.",
    fees: 40,
    image:
      "https://res.cloudinary.com/tlpkufxr/image/upload/v1789413762/doc4.png",
    address: {
      line1: "47th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },

  {
    name: "Dr. Jennifer Garcia",
    email: "jennifer.garcia@example.com",
    speciality: "Neurologist",
    degree: "MBBS",
    experience: "6 Years",
    about:
      "Dr. Jennifer Garcia focuses on accurate diagnosis and personalized treatment while providing attentive patient care.",
    fees: 70,
    image:
      "https://res.cloudinary.com/tlpkufxr/image/upload/v1789413762/doc5.png",
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },

  {
    name: "Dr. Andrew Williams",
    email: "andrew.williams@example.com",
    speciality: "General physician",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Andrew Williams provides comprehensive medical care with an emphasis on prevention and effective treatment.",
    fees: 50,
    image:
      "https://res.cloudinary.com/tlpkufxr/image/upload/v1789413764/doc6.png",
    address: {
      line1: "67th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },

  {
    name: "Dr. Christopher Davis",
    email: "christopher.davis@example.com",
    speciality: "Orthopedic",
    degree: "MBBS",
    experience: "7 Years",
    about:
      "Dr. Christopher Davis specializes in musculoskeletal care and focuses on helping patients achieve better mobility and health.",
    fees: 80,
    image:
      "https://res.cloudinary.com/tlpkufxr/image/upload/v1789413764/doc7.png",
    address: {
      line1: "77th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },

  {
    name: "Dr. Timothy White",
    email: "timothy.white@example.com",
    speciality: "Cardiologist",
    degree: "MBBS",
    experience: "8 Years",
    about:
      "Dr. Timothy White is committed to cardiovascular health through careful diagnosis, prevention, and personalized treatment.",
    fees: 90,
    image:
      "https://res.cloudinary.com/tlpkufxr/image/upload/v1789413765/doc8.png",
    address: {
      line1: "87th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },

  {
    name: "Dr. Ava Mitchell",
    email: "ava.mitchell@example.com",
    speciality: "Gynecologist",
    degree: "MBBS",
    experience: "5 Years",
    about:
      "Dr. Ava Mitchell provides compassionate healthcare with a focus on women's health and personalized treatment.",
    fees: 65,
    image:
      "https://res.cloudinary.com/tlpkufxr/image/upload/v1789413765/doc9.png",
    address: {
      line1: "97th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },

  {
    name: "Dr. Jeffrey King",
    email: "jeffrey.king@example.com",
    speciality: "Dermatologist",
    degree: "MBBS",
    experience: "6 Years",
    about:
      "Dr. Jeffrey King provides specialized dermatological care with an emphasis on accurate diagnosis and effective treatment.",
    fees: 55,
    image:
      "https://res.cloudinary.com/tlpkufxr/image/upload/v1789413765/doc10.png",
    address: {
      line1: "107th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },

  {
    name: "Dr. Zoe Kelly",
    email: "zoe.kelly@example.com",
    speciality: "Pediatricians",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Zoe Kelly is dedicated to providing friendly and comprehensive healthcare for children and families.",
    fees: 45,
    image:
      "https://res.cloudinary.com/tlpkufxr/image/upload/v1789413765/doc11.png",
    address: {
      line1: "117th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },

  {
    name: "Dr. Patrick Harris",
    email: "patrick.harris@example.com",
    speciality: "Gastroenterologist",
    degree: "MBBS",
    experience: "9 Years",
    about:
      "Dr. Patrick Harris focuses on digestive health through detailed evaluation, diagnosis, and individualized treatment.",
    fees: 85,
    image:
      "https://res.cloudinary.com/tlpkufxr/image/upload/v1789413765/doc12.png",
    address: {
      line1: "127th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },

  {
    name: "Dr. Chloe Evans",
    email: "chloe.evans@example.com",
    speciality: "General physician",
    degree: "MBBS",
    experience: "3 Years",
    about:
      "Dr. Chloe Evans is committed to delivering reliable primary healthcare with an emphasis on prevention and patient well-being.",
    fees: 45,
    image:
      "https://res.cloudinary.com/tlpkufxr/image/upload/v1789413759/doc13.png",
    address: {
      line1: "137th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },

  {
    name: "Dr. Ryan Martinez",
    email: "ryan.martinez@example.com",
    speciality: "Orthopedic",
    degree: "MBBS",
    experience: "7 Years",
    about:
      "Dr. Ryan Martinez provides orthopedic care focused on diagnosis, recovery, mobility, and long-term patient health.",
    fees: 75,
    image:
      "https://res.cloudinary.com/tlpkufxr/image/upload/v1789413763/doc14.png",
    address: {
      line1: "147th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },

  {
    name: "Dr. Amelia Hill",
    email: "amelia.hill@example.com",
    speciality: "Cardiologist",
    degree: "MBBS",
    experience: "8 Years",
    about:
      "Dr. Amelia Hill is dedicated to heart health through preventive care, detailed diagnosis, and personalized treatment.",
    fees: 95,
    image:
      "https://res.cloudinary.com/tlpkufxr/image/upload/v1789413764/doc15.png",
    address: {
      line1: "157th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
];

const seedDoctors = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    console.log("✅ MongoDB Connected");

    const password = await bcrypt.hash("doctor123", 10);

    await doctorModel.deleteMany({});

    const doctorsWithRequiredFields = doctors.map((doctor) => ({
      ...doctor,
      password,
      available: true,
      date: Date.now(),
      slots_booked: {},
    }));

    await doctorModel.insertMany(doctorsWithRequiredFields);

    console.log("✅ 15 Doctors added successfully");

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

seedDoctors();
