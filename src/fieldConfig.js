// fieldConfig.js

export const fieldConfig = [
  {
    type: "section",
    label: "Cafe Details",
    fields: [
      { name: "cafe_name", label: "Cafe Name", type: "text", required: true },
      { name: "famous_game_list", label: "Famous Games", type: "text" },
      { name: "description", label: "Description", type: "text" },
    ],
  },
  {
    type: "section",
    label: "Owner Information",
    fields: [
      { name: "owner_name", label: "Owner Name", type: "text", required: true },
      { name: "contact_info.phone", label: "Phone Number", type: "tel", required: true },
      { name: "contact_info.email", label: "Email", type: "email", required: true },
      { name: "vendor_account_email", label: "Vendor Account Email", type: "email" },
    ],
  },
  {
    type: "section",
    label: "Business Registration",
    fields: [
      {
        name: "business_registration_details.registration_number",
        label: "Registration Number",
        type: "text",
        required: true,
      },
      {
        name: "business_registration_details.registration_date",
        label: "Registration Date",
        type: "date",
        required: true,
      },
    ],
  },
  {
    type: "section",
    label: "Physical Address",
    fields: [
      {
        name: "physicalAddress.addressLine1",
        label: "Address Line 1",
        type: "text",
        required: true,
      },
      {
        name: "physicalAddress.addressLine2",
        label: "Address Line 2",
        type: "text",
      },
      {
        name: "physicalAddress.pincode",
        label: "Pincode",
        type: "number",
        required: true,
      },
      {
        name: "physicalAddress.state",
        label: "State",
        type: "text",
        required: true,
      },
      {
        name: "physicalAddress.country",
        label: "Country",
        type: "text",
        required: true,
      },
      {
        name: "physicalAddress.latitude",
        label: "Latitude",
        type: "text",
      },
      {
        name: "physicalAddress.longitude",
        label: "Longitude",
        type: "text",
      },
      {
        name: "physicalAddress.is_active",
        label: "Is Active?",
        type: "checkbox",
      },
    ],
  },
  {
    type: "section",
    label: "Documents Submitted",
    fields: [
      {
        name: "document_submitted.business_registration",
        label: "Business Registration",
        type: "checkbox",
      },
      {
        name: "document_submitted.owner_identification_proof",
        label: "Owner ID Proof",
        type: "checkbox",
      },
      {
        name: "document_submitted.tax_identification_number",
        label: "Tax ID Number",
        type: "checkbox",
      },
      {
        name: "document_submitted.bank_acc_details",
        label: "Bank Account Details",
        type: "checkbox",
      },
      {
        name: "document_submitted.lease_agreement",
        label: "Lease Agreement",
        type: "checkbox",
      },
      {
        name: "document_submitted.insurance_proof",
        label: "Insurance Proof",
        type: "checkbox",
      },
      {
        name: "document_submitted.utilities_bill",
        label: "Utilities Bill",
        type: "checkbox",
      },
    ],
  },
  {
    type: "section",
    label: "Cafe Timing",
    fields: [
      {
        name: "timing.opening_time",
        label: "Opening Time (e.g. 09:00 am)",
        type: "text",
        required: true,
      },
      {
        name: "timing.closing_time",
        label: "Closing Time (e.g. 11:00 pm)",
        type: "text",
        required: true,
      },
      {
        name: "slot_duration",
        label: "Slot Duration (mins)",
        type: "number",
        required: true,
      },
    ],
  },
  {
    type: "section",
    label: "Days Open",
    fields: [
      { name: "opening_day.mon", label: "Monday", type: "checkbox" },
      { name: "opening_day.tue", label: "Tuesday", type: "checkbox" },
      { name: "opening_day.wed", label: "Wednesday", type: "checkbox" },
      { name: "opening_day.thu", label: "Thursday", type: "checkbox" },
      { name: "opening_day.fri", label: "Friday", type: "checkbox" },
      { name: "opening_day.sat", label: "Saturday", type: "checkbox" },
      { name: "opening_day.sun", label: "Sunday", type: "checkbox" },
    ],
  },
  {
    type: "section",
    label: "Available Games",
    fields: [
      { name: "available_games.ps5.total_slot", label: "PS5 Slots", type: "number" },
      { name: "available_games.ps5.single_slot_price", label: "PS5 Slot Price", type: "number" },
      { name: "available_games.xbox.total_slot", label: "Xbox Slots", type: "number" },
      { name: "available_games.xbox.single_slot_price", label: "Xbox Slot Price", type: "number" },
      { name: "available_games.pc.total_slot", label: "PC Slots", type: "number" },
      { name: "available_games.pc.single_slot_price", label: "PC Slot Price", type: "number" },
      { name: "available_games.vr.total_slot", label: "VR Slots", type: "number" },
      { name: "available_games.vr.single_slot_price", label: "VR Slot Price", type: "number" },
    ],
  },
  {
    type: "section",
    label: "Amenities",
    fields: [
      { name: "amenities.24/7", label: "24/7 Access", type: "checkbox" },
      { name: "amenities.Parking", label: "Parking", type: "checkbox" },
      { name: "amenities.seating_area", label: "Seating Area", type: "checkbox" },
      { name: "amenities.sound_system", label: "Sound System", type: "checkbox" },
      { name: "amenities.washroom", label: "Washroom", type: "checkbox" },
      { name: "amenities.air_conditioner", label: "Air Conditioner", type: "checkbox" },
    ],
  },
];
