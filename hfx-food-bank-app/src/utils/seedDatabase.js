import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

// Example data for food banks
const foodBanksData = [
  {
    name: "Halifax Central Food Bank",
    address: "123 Main Street, Halifax, NS B3H 2Z1",
    phone: "(902) 555-1234",
    email: "info@halifaxcentralfoodbank.org",
    website: "https://www.halifaxcentralfoodbank.org",
    location: { lat: 44.6488, lng: -63.5752 },
    hours: [
      { open: "10:00", close: "14:00" }, // Sunday
      { open: "09:00", close: "17:00" }, // Monday
      { open: "09:00", close: "17:00" }, // Tuesday
      { open: "09:00", close: "17:00" }, // Wednesday
      { open: "09:00", close: "17:00" }, // Thursday
      { open: "09:00", close: "17:00" }, // Friday
      { open: "10:00", close: "14:00" }  // Saturday
    ],
    wheelchairAccess: true,
    translators: true,
    dietaryOptions: true,
    parking: true,
    publicTransport: true,
    additionalServices: [
      "Emergency food hampers",
      "Nutrition counseling",
      "Community kitchen access"
    ],
    notes: "Please bring ID and proof of address when visiting."
  },
  {
    name: "Dartmouth Community Food Bank",
    address: "456 Portland Street, Dartmouth, NS B2Y 1J5",
    phone: "(902) 555-5678",
    email: "help@dartmouthfoodbank.ca",
    website: "https://www.dartmouthfoodbank.ca",
    location: { lat: 44.6658, lng: -63.5669 },
    hours: [
      { open: "Closed", close: "Closed" }, // Sunday
      { open: "10:00", close: "16:00" },   // Monday
      { open: "10:00", close: "16:00" },   // Tuesday
      { open: "10:00", close: "19:00" },   // Wednesday
      { open: "10:00", close: "16:00" },   // Thursday
      { open: "10:00", close: "16:00" },   // Friday
      { open: "09:00", close: "12:00" }    // Saturday
    ],
    wheelchairAccess: true,
    translators: false,
    dietaryOptions: true,
    parking: true,
    publicTransport: true,
    additionalServices: [
      "Baby supplies",
      "Pet food assistance",
      "Toiletries and hygiene products"
    ],
    notes: "We are located near the bus terminal. Service once per month per household."
  },
  {
    name: "North End Halifax Food Share",
    address: "789 Gottingen Street, Halifax, NS B3K 3E2",
    phone: "(902) 555-9012",
    email: "northend@foodshare.org",
    website: "https://www.northendfoodshare.org",
    location: { lat: 44.6606, lng: -63.5866 },
    hours: [
      { open: "Closed", close: "Closed" }, // Sunday
      { open: "Closed", close: "Closed" }, // Monday
      { open: "13:00", close: "19:00" },   // Tuesday
      { open: "13:00", close: "19:00" },   // Wednesday
      { open: "13:00", close: "19:00" },   // Thursday
      { open: "10:00", close: "15:00" },   // Friday
      { open: "Closed", close: "Closed" }  // Saturday
    ],
    wheelchairAccess: false,
    translators: true,
    dietaryOptions: true,
    parking: false,
    publicTransport: true,
    additionalServices: [
      "Cultural food options",
      "Cooking classes",
      "Garden produce in summer"
    ],
    notes: "Community ID accepted. We have a waiting area inside."
  },
  {
    name: "South End Community Pantry",
    address: "321 South Street, Halifax, NS B3J 2K9",
    phone: "(902) 555-3456",
    email: "contact@southendpantry.ca",
    website: "https://www.southendpantry.ca",
    location: { lat: 44.6402, lng: -63.5679 },
    hours: [
      { open: "Closed", close: "Closed" },  // Sunday
      { open: "09:00", close: "14:00" },    // Monday
      { open: "Closed", close: "Closed" },  // Tuesday
      { open: "09:00", close: "14:00" },    // Wednesday
      { open: "Closed", close: "Closed" },  // Thursday
      { open: "09:00", close: "14:00" },    // Friday
      { open: "10:00", close: "13:00" }     // Saturday
    ],
    wheelchairAccess: true,
    translators: false,
    dietaryOptions: false,
    parking: true,
    publicTransport: true,
    additionalServices: [
      "Seniors priority hours (9-10 AM)",
      "Student support program"
    ],
    notes: "Located in the church basement. Enter from the side door."
  },
  {
    name: "Bedford Food Assistance Network",
    address: "567 Bedford Highway, Bedford, NS B4A 1E7",
    phone: "(902) 555-7890",
    email: "info@bedfordfoodassistance.org",
    website: "https://www.bedfordfoodassistance.org",
    location: { lat: 44.7223, lng: -63.6582 },
    hours: [
      { open: "Closed", close: "Closed" }, // Sunday
      { open: "Closed", close: "Closed" }, // Monday
      { open: "10:00", close: "18:00" },   // Tuesday
      { open: "Closed", close: "Closed" }, // Wednesday
      { open: "10:00", close: "18:00" },   // Thursday
      { open: "Closed", close: "Closed" }, // Friday
      { open: "09:00", close: "15:00" }    // Saturday
    ],
    wheelchairAccess: true,
    translators: false,
    dietaryOptions: true,
    parking: true,
    publicTransport: false,
    additionalServices: [
      "Delivery service for seniors and disabled individuals",
      "School lunch program support"
    ],
    notes: "Appointment recommended but not required. Call ahead for faster service."
  }
];

// Function to clean up duplicates before seeding
export const cleanupDuplicates = async () => {
  try {
    console.log("Cleaning up duplicate food banks...");
    const foodBanksRef = collection(db, 'foodBanks');
    const snapshot = await getDocs(foodBanksRef);
    
    // Create a Map to track unique food banks by name
    const uniqueFoodBanks = new Map();
    const duplicates = [];
    
    // Identify duplicates
    snapshot.docs.forEach(doc => {
      const data = doc.data();
      if (!uniqueFoodBanks.has(data.name)) {
        uniqueFoodBanks.set(data.name, doc.id);
      } else {
        // This is a duplicate
        duplicates.push(doc.id);
      }
    });
    
    console.log(`Found ${duplicates.length} duplicate food banks`);
    
    // Delete duplicates
    for (const duplicateId of duplicates) {
      await deleteDoc(doc(db, 'foodBanks', duplicateId));
      console.log(`Deleted duplicate food bank with ID: ${duplicateId}`);
    }
    
    return duplicates.length;
  } catch (error) {
    console.error("Error cleaning up duplicates:", error);
    return 0;
  }
};

// Function to seed food banks data into Firestore
export const seedFoodBanks = async () => {
  try {
    // First, clean up any duplicates
    const deleteCount = await cleanupDuplicates();
    console.log(`Cleaned up ${deleteCount} duplicate food banks`);
    
    // Check what's left in the database
    const foodBanksRef = collection(db, 'foodBanks');
    const snapshot = await getDocs(foodBanksRef);
    
    // Track existing food bank names to avoid adding duplicates
    const existingNames = new Set();
    snapshot.docs.forEach(doc => {
      const data = doc.data();
      existingNames.add(data.name);
    });
    
    console.log(`Found ${existingNames.size} unique food banks already in database`);
    
    // Add only food banks that don't already exist
    let addedCount = 0;
    for (const foodBank of foodBanksData) {
      if (!existingNames.has(foodBank.name)) {
        await addDoc(foodBanksRef, foodBank);
        console.log(`Added new food bank: ${foodBank.name}`);
        addedCount++;
      } else {
        console.log(`Skipping existing food bank: ${foodBank.name}`);
      }
    }
    
    console.log(`Added ${addedCount} new food banks`);
    
    return { 
      success: true, 
      message: `Database updated: ${deleteCount} duplicates removed, ${addedCount} new food banks added.` 
    };
    
  } catch (error) {
    console.error('Error seeding database:', error);
    return { success: false, message: `Error seeding database: ${error.message}` };
  }
};

// Function to clear all food banks
export const clearAllFoodBanks = async () => {
  try {
    console.log("Clearing all food banks...");
    const foodBanksRef = collection(db, 'foodBanks');
    const snapshot = await getDocs(foodBanksRef);
    
    let deleteCount = 0;
    for (const document of snapshot.docs) {
      await deleteDoc(doc(db, 'foodBanks', document.id));
      deleteCount++;
    }
    
    console.log(`Deleted ${deleteCount} food banks`);
    return { success: true, message: `Deleted ${deleteCount} food banks` };
  } catch (error) {
    console.error("Error clearing food banks:", error);
    return { success: false, message: `Error clearing food banks: ${error.message}` };
  }
};
