require('dotenv').config();
const mongoose = require('mongoose');
const Parts = require('./server/partschema.js');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// Seed data matching the hardcoded IDs in products.html and main.html
const parts = [
  // ON SALE NOW products (shown on main.html - these IDs MUST match main.html)
  {
    _id: '5ae7b1fff36d282906c489c2',
    name: 'Street Turbo lvl 1',
    part_id: 'STURBO-001',
    price: 300,
    img: '../assets/exploded-turbo.png',
    type: 'Engine',
    short_description: 'Entry-level street turbo. Perfect for daily drivers seeking +50 HP.',
    details: 'Affordable turbocharger kit for street use. Adds approximately 50 HP with stock internals. Includes basic hardware and gaskets. Great entry point for turbo builds.',
    new: false,
    sale: true
  },
  {
    _id: '5ae7b24bf36d282906c489f3',
    name: 'Street Turbo lvl 2',
    part_id: 'STURBO-002',
    price: 400,
    img: '../assets/exploded-turbo.png',
    type: 'Engine',
    short_description: 'Mid-range street turbo. +75 HP with improved spool.',
    details: 'Upgraded street turbo with improved compressor wheel. Delivers 75+ HP gains with better throttle response. Includes intercooler piping and blow-off valve.',
    new: false,
    sale: true
  },
  {
    _id: '5ae7b257f36d282906c489f5',
    name: 'Street Turbo lvl 3',
    part_id: 'STURBO-003',
    price: 500,
    img: '../assets/exploded-turbo.png',
    type: 'Engine',
    short_description: 'Premium street turbo. +100 HP with ceramic bearings.',
    details: 'Top-tier street turbo with ceramic ball bearings for minimal lag. Capable of 100+ HP gains. Complete kit includes wastegate, intercooler, and all hardware.',
    new: false,
    sale: true
  },

  // NEW PRODUCTS (shown in carousel - these IDs MUST match products.html)
  {
    _id: '5ae7b25df36d282906c489fd',
    name: 'Racing Turbo lvl 1',
    part_id: 'TURBO-001',
    price: 800,
    img: '../assets/exploded-turbo.png',
    type: 'Engine',
    short_description: 'Entry-level performance turbo. +100 HP boost for street use.',
    details: 'High-performance turbocharger for street racing. Increases horsepower by 100+ HP. Includes all necessary gaskets and hardware for installation.',
    new: true
  },
  {
    _id: '5ae7bf09f36d282906c48eb1',
    name: 'Racing Suspension Package 2',
    part_id: 'SUSP-002',
    price: 800,
    img: '../assets/suspension.png',
    type: 'Suspension',
    short_description: 'Mid-tier coilover kit. Adjustable damping with 1-2" drop.',
    details: 'Complete coilover suspension kit with adjustable damping. Lowers vehicle 1-2 inches for improved handling and aggressive stance.',
    new: true
  },
  {
    _id: '5ae7bfe8f36d282906c48eee',
    name: 'Brake Kit 3',
    part_id: 'BRAKE-003',
    price: 2500,
    img: '../assets/disc-brake.png',
    type: 'Brakes',
    short_description: 'Premium 6-piston calipers with slotted rotors. Track-ready.',
    details: 'Premium 6-piston brake caliper kit with slotted rotors. Dramatically improves stopping power and reduces brake fade during aggressive driving.',
    new: true
  },
  {
    _id: '5ae7bf29f36d282906c48eb6',
    name: 'Racing Suspension Package 3',
    part_id: 'SUSP-003',
    price: 2500,
    img: '../assets/suspension.png',
    type: 'Suspension',
    short_description: 'Top-tier air suspension with app control. Adjustable ride height.',
    details: 'Premium air suspension system with electronic damping control. Adjustable ride height via smartphone app. Track-ready performance with street comfort.',
    new: true
  },
  {
    _id: '5ae7b265f36d282906c489fe',
    name: 'Racing Turbo lvl 2',
    part_id: 'TURBO-002',
    price: 1000,
    img: '../assets/exploded-turbo.png',
    type: 'Engine',
    short_description: 'Advanced ball-bearing turbo. +150 HP with quick spool.',
    details: 'Advanced ball-bearing turbo with internal wastegate. Supports up to 150+ HP gains with proper tuning. Quick spool for minimal lag.',
    new: true
  },

  // ADDITIONAL PRODUCTS (for "ALL PRODUCTS" section)
  {
    name: 'Cold Air Intake System',
    part_id: 'INTAKE-001',
    price: 299,
    img: '../assets/intake.webp',
    type: 'Engine',
    short_description: 'High-flow intake with heat shield. +10-15 HP and better throttle.',
    details: 'High-flow cold air intake with washable filter. Adds 10-15 HP and improves throttle response. Includes heat shield for maximum performance.',
    new: false
  },
  {
    name: 'Sport Exhaust System',
    part_id: 'EXHAUST-001',
    price: 899,
    img: '../assets/exhaustwide.png',
    type: 'Exhaust',
    short_description: 'Cat-back 3" stainless steel system. Aggressive sound +15-20 HP.',
    details: 'Cat-back exhaust system with 3-inch piping. Aggressive sound with gains of 15-20 HP. T304 stainless steel construction.',
    new: false
  },
  {
    name: 'Performance Clutch Kit',
    part_id: 'CLUTCH-001',
    price: 549,
    img: '../assets/gearbox.png',
    type: 'Drivetrain',
    short_description: 'Stage 2 clutch kit. Handles 400 ft-lbs torque.',
    details: 'Stage 2 clutch kit for modified engines. Handles up to 400 ft-lbs of torque. Includes pressure plate, disc, and throw-out bearing.',
    new: false
  },
  {
    name: 'Racing Wheels - 18"',
    part_id: 'WHEELS-001',
    price: 1200,
    img: '../assets/wheel.jpg',
    type: 'Wheels',
    short_description: 'Forged aluminum wheels set of 4. 20 lbs lighter total.',
    details: 'Lightweight forged aluminum wheels. Set of 4. Reduces unsprung weight by 20 lbs total. Available in gunmetal or matte black finish.',
    new: false
  },
  {
    name: 'Short Shifter Kit',
    part_id: 'SHIFT-001',
    price: 189,
    img: '../assets/shifter.jpeg',
    type: 'Interior',
    short_description: 'CNC billet shifter. 40% shorter throws for faster shifts.',
    details: 'Reduces shift throw by 40% for faster gear changes. CNC machined from billet aluminum. Direct bolt-on installation.',
    new: false
  },
  {
    name: 'Oil Cooler Kit',
    part_id: 'COOL-001',
    price: 449,
    img: '../assets/motor.png',
    type: 'Engine',
    short_description: '25-row oil cooler with thermostatic plate. Track-ready cooling.',
    details: '25-row oil cooler with thermostatic sandwich plate. Maintains optimal oil temperatures during track use. Includes all mounting hardware and lines.',
    new: false
  },
  {
    name: 'Carbon Fiber Hood',
    part_id: 'BODY-001',
    price: 1499,
    img: '../assets/elanorHD.jpg',
    type: 'Exterior',
    short_description: 'OEM-style carbon hood. 15 lbs lighter with functional vents.',
    details: 'OEM-style carbon fiber hood. Reduces front-end weight by 15 lbs. UV-protected clear coat finish. Functional vents for heat extraction.',
    new: false
  },
  {
    name: 'ECU Tune',
    part_id: 'TUNE-001',
    price: 599,
    img: '../assets/motor.png',
    type: 'Electronics',
    short_description: 'Pro ECU tune +25-40 HP. Includes 3 custom maps.',
    details: 'Professional ECU calibration service. Adds 25-40 HP depending on modifications. Includes 3 custom maps (Valet, Street, Race).',
    new: false
  },
  {
    name: 'Strut Tower Brace',
    part_id: 'BRACE-001',
    price: 129,
    img: '../assets/suspension-icon.png',
    type: 'Suspension',
    short_description: 'Aluminum strut brace. Reduces chassis flex in corners.',
    details: 'Aluminum strut tower brace improves chassis rigidity. Reduces body flex during hard cornering. Anodized finish in multiple colors.',
    new: false
  },
  {
    name: 'Racing Seats - Pair',
    part_id: 'SEATS-001',
    price: 899,
    img: '../assets/seats.jpeg',
    type: 'Interior',
    short_description: 'FIA-approved bucket seats. Fixed-back design with bolsters.',
    details: 'FIA-approved racing bucket seats. Fixed-back design with side bolsters. Pair includes mounting brackets. Available in black or red.',
    new: false
  },
  {
    name: 'Sway Bar Kit',
    part_id: 'SWAY-001',
    price: 349,
    img: '../assets/suspension-icon.png',
    type: 'Suspension',
    short_description: 'Adjustable sway bars. Reduces body roll by 50%.',
    details: 'Adjustable front and rear sway bars. Reduces body roll by up to 50%. Three-way adjustable end links included.',
    new: false
  }
];

// Seed the database
async function seedDatabase() {
  try {
    // Clear existing parts
    await Parts.deleteMany({});
    console.log('Cleared existing parts');

    // Insert new parts
    await Parts.insertMany(parts);
    console.log(`Successfully seeded ${parts.length} parts to the database!`);

    // Display summary
    const newParts = parts.filter(p => p.new);
    const regularParts = parts.filter(p => !p.new);
    console.log(`\n📦 Summary:`);
    console.log(`   - New products: ${newParts.length}`);
    console.log(`   - Regular products: ${regularParts.length}`);
    console.log(`   - Total products: ${parts.length}`);

    // Close connection
    mongoose.connection.close();
    console.log('\n✅ Database seeding complete!');
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
  }
}

seedDatabase();
