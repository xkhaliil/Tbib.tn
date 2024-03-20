interface IHealthCareProviderSpecialty {
  category: string;
  specialties: string[];
}

interface SettingsSidebarItem {
  label: string;
  href: string;
}

interface ISymptomType {
  title: string;
  description: string;
  value: string;
}

interface ILanguage {
  value: string;
  label: string;
}

export const specialties: IHealthCareProviderSpecialty[] = [
  {
    category: "Primary Care",
    specialties: ["General Practitioner", "Pediatrician", "Internist"],
  },
  {
    category: "Specialists",
    specialties: [
      "Cardiologist (Heart Specialist)",
      "Dermatologist (Skin Specialist)",
      "Endocrinologist (Diabetes Specialist)",
      "Gastroenterologist (Digestive System Specialist)",
      "Neurologist (Nervous System Specialist)",
      "Oncologist (Cancer Specialist)",
      "Ophthalmologist (Eye Specialist)",
      "Pulmonologist (Lung Specialist)",
      "Rheumatologist (Arthritis Specialist)",
      "Nephrologist (Kidney Specialist)",
      "Hematologist (Blood Specialist)",
      "Infectious Disease Specialist",
      "Allergist (Allergy Specialist)",
      "Urologist (Urinary Specialist)",
    ],
  },
  {
    category: "Surgical",
    specialties: [
      "General Surgeon",
      "Orthopedic Surgeon (Bone & Joint Surgeon)",
      "Neurosurgeon (Brain & Nervous System Surgeon)",
      "Cardiothoracic Surgeon (Heart & Chest Surgeon)",
    ],
  },
  {
    category: "Obstetrics & Gynecology",
    specialties: ["Obstetrics & Gynecology"],
  },
  {
    category: "Mental Health",
    specialties: ["Psychiatrist", "Psychologist", "Therapist"],
  },
  {
    category: "Dental Care",
    specialties: ["General Dentist", "Orthodontist", "Oral Surgeon"],
  },
  {
    category: "Physical Therapy",
    specialties: ["Physical Therapist", "Speech Therapist"],
  },
  {
    category: "Other",
    specialties: ["Other"],
  },
];

export const states: string[] = [
  "Tunis",
  "Ariana",
  "Ben Arous",
  "Mannouba",
  "Bizerte",
  "Nabeul",
  "Béja",
  "Jendouba",
  "Zaghouan",
  "Siliana",
  "Le Kef",
  "Sousse",
  "Monastir",
  "Mahdia",
  "Kasserine",
  "Sidi Bouzid",
  "Kairouan",
  "Gafsa",
  "Sfax",
  "Gabès",
  "Médenine",
  "Tozeur",
  "Kebili",
  "Tataouine",
];

export const settingsSidebarItems: SettingsSidebarItem[] = [
  { label: "Profile & Account", href: "/hp/dashboard/settings" },
  { label: "Organization", href: "/hp/dashboard/settings/organization" },
  { label: "Opening Hours", href: "/hp/dashboard/settings/opening-hours" },
  { label: "Password & Security", href: "/hp/dashboard/settings/security" },
  { label: "Notifications", href: "/hp/dashboard/settings/notifications" },
];

export enum SymptomType {
  MUSCLES_JOINTS = "Muscles & Joints",
  RESPIRATORY = "Respiratory",
  DIGESTIVE = "Digestive",
  SKIN = "Skin",
  HEAD_NECK = "Head & Neck",
  HEART_BLOOD = "Heart & Blood",
  MENTAL_HEALTH = "Mental Health",
  INFECTIONS = "Infections",
  OTHER = "Other",
}

export const symptomsTypes: ISymptomType[] = [
  {
    title: "Muscles & Joints",
    description: "Muscle pain, joint pain, muscle weakness, etc.",
    value: SymptomType.MUSCLES_JOINTS,
  },
  {
    title: "Respiratory",
    description: "Cough, shortness of breath, chest pain, etc.",
    value: SymptomType.RESPIRATORY,
  },
  {
    title: "Digestive",
    description: "Nausea, vomiting, diarrhea, constipation, etc.",
    value: SymptomType.DIGESTIVE,
  },
  {
    title: "Skin",
    description: "Rash, itching, dry skin, etc.",
    value: SymptomType.SKIN,
  },
  {
    title: "Head & Neck",
    description: "Headache, sore throat, ear pain, etc.",
    value: SymptomType.HEAD_NECK,
  },
  {
    title: "Heart & Blood",
    description: "Chest pain, palpitations, high blood pressure, etc.",
    value: SymptomType.HEART_BLOOD,
  },
  {
    title: "Mental Health",
    description: "Anxiety, depression, stress, etc.",
    value: SymptomType.MENTAL_HEALTH,
  },
  {
    title: "Infections",
    description: "Fever, chills, sore throat, etc.",
    value: SymptomType.INFECTIONS,
  },
  {
    title: "Other",
    description: "Other symptoms not listed",
    value: SymptomType.OTHER,
  },
];

export const languages: ILanguage[] = [
  { value: "Arabic", label: "Arabic" },
  { value: "English", label: "English" },
  { value: "French", label: "French" },
];
