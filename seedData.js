require('dotenv').config();
const mongoose = require('mongoose');
const Parts = require('./server/partschema.js');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// Seed data matching the hardcoded IDs in products.html
const parts = [
  // NEW PRODUCTS (shown in carousel - these IDs MUST match products.html)
  {
    _id: '5ae7b25df36d282906c489fd',
    name: 'Racing Turbo lvl 1',
    part_id: 'TURBO-001',
    price: 800,
    img: '../assets/exploded-turbo.png',
    type: 'Engine',
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
    details: 'High-flow cold air intake with washable filter. Adds 10-15 HP and improves throttle response. Includes heat shield for maximum performance.',
    new: false
  },
  {
    name: 'Sport Exhaust System',
    part_id: 'EXHAUST-001',
    price: 899,
    img: '../assets/exhaustwide.png',
    type: 'Exhaust',
    details: 'Cat-back exhaust system with 3-inch piping. Aggressive sound with gains of 15-20 HP. T304 stainless steel construction.',
    new: false
  },
  {
    name: 'Performance Clutch Kit',
    part_id: 'CLUTCH-001',
    price: 549,
    img: '../assets/gearbox.png',
    type: 'Drivetrain',
    details: 'Stage 2 clutch kit for modified engines. Handles up to 400 ft-lbs of torque. Includes pressure plate, disc, and throw-out bearing.',
    new: false
  },
  {
    name: 'Racing Wheels - 18"',
    part_id: 'WHEELS-001',
    price: 1200,
    img: '../assets/wheel.jpg',
    type: 'Wheels',
    details: 'Lightweight forged aluminum wheels. Set of 4. Reduces unsprung weight by 20 lbs total. Available in gunmetal or matte black finish.',
    new: false
  },
  {
    name: 'Short Shifter Kit',
    part_id: 'SHIFT-001',
    price: 189,
    img: '../assets/shifter.jpeg',
    type: 'Interior',
    details: 'Reduces shift throw by 40% for faster gear changes. CNC machined from billet aluminum. Direct bolt-on installation.',
    new: false
  },
  {
    name: 'Oil Cooler Kit',
    part_id: 'COOL-001',
    price: 449,
    img: '../assets/motor.png',
    type: 'Engine',
    details: '25-row oil cooler with thermostatic sandwich plate. Maintains optimal oil temperatures during track use. Includes all mounting hardware and lines.',
    new: false
  },
  {
    name: 'Carbon Fiber Hood',
    part_id: 'BODY-001',
    price: 1499,
    img: '../assets/elanorHD.jpg',
    type: 'Exterior',
    details: 'OEM-style carbon fiber hood. Reduces front-end weight by 15 lbs. UV-protected clear coat finish. Functional vents for heat extraction.',
    new: false
  },
  {
    name: 'ECU Tune',
    part_id: 'TUNE-001',
    price: 599,
    img: '../assets/motor.png',
    type: 'Electronics',
    details: 'Professional ECU calibration service. Adds 25-40 HP depending on modifications. Includes 3 custom maps (Valet, Street, Race).',
    new: false
  },
  {
    name: 'Strut Tower Brace',
    part_id: 'BRACE-001',
    price: 129,
    img: '../assets/suspension-icon.png',
    type: 'Suspension',
    details: 'Aluminum strut tower brace improves chassis rigidity. Reduces body flex during hard cornering. Anodized finish in multiple colors.',
    new: false
  },
  {
    name: 'Racing Seats - Pair',
    part_id: 'SEATS-001',
    price: 899,
    img: '../assets/seats.jpeg',
    type: 'Interior',
    details: 'FIA-approved racing bucket seats. Fixed-back design with side bolsters. Pair includes mounting brackets. Available in black or red.',
    new: false
  },
  {
    name: 'Sway Bar Kit',
    part_id: 'SWAY-001',
    price: 349,
    img: '../assets/suspension-icon.png',
    type: 'Suspension',
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
