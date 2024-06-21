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
      "Cardiologist",
      "Dermatologist",
      "Endocrinologist",
      "Gastroenterologist",
      "Neurologist",
      "Oncologist",
      "Ophthalmologist",
      "Pulmonologist",
      "Rheumatologist",
      "Nephrologist",
      "Hematologist",
      "Infectious Disease Specialist",
      "Allergist",
      "Urologist",
    ],
  },
  {
    category: "Surgical",
    specialties: [
      "General Surgeon",
      "Orthopedic Surgeon",
      "Neurosurgeon",
      "Cardiothoracic Surgeon",
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

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
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
  { value: "Italian", label: "Italian" },
  { value: "Spanish", label: "Spanish" },
];

export const paymentMethods = [
  { value: "Cash", label: "Cash" },
  { value: "Credit Card", label: "Credit Card" },
  { value: "Debit Card", label: "Debit Card" },
  { value: "Cheque", label: "Cheque" },
];

interface InsuranceCompany {
  label: string;
  value: string;
}

export const insuranceCompanies: InsuranceCompany[] = [
  {
    label: "STAR Assurances",
    value: "STAR Assurances",
  },
  {
    label: "Comar Assurances",
    value: "Comar Assurances",
  },
  { label: "Maghrebia Assurance", value: "Maghrebia Assurance" },
  { label: "Assurances BIAT", value: "Assurances BIAT" },
  { label: "Attijari Assurance", value: "Attijari Assurance" },
  { label: "Tunis Re", value: "Tunis Re" },
  {
    label: "GAT Assurances",
    value: "GAT Assurances",
  },
  { label: "Salim Insurance", value: "Salim Insurance" },
  { label: "Amen Insurance", value: "Amen Insurance" },
  { label: "Astree Assurances", value: "Astree Assurances" },
  { label: "Lloyd Assurances", value: "Lloyd Assurances" },
  { label: "Carte Assurances", value: "Carte Assurances" },
  { label: "CNAM", value: "CNAM" },
  {
    label: "CTAMA",
    value: "CTAMA",
  },
  { label: "TAA", value: "TAA" },
  {
    label: "AMI Assurances",
    value: "AMI Assurances",
  },
];

export const healthcareServices: { label: string; value: string }[] = [
  { label: "Routine Checkups", value: "Routine Checkups" },
  { label: "Preventive Care", value: "Preventive Care" },
  { label: "Immunizations", value: "Immunizations" },
  { label: "Health Risk Assessments", value: "Health Risk Assessments" },
  {
    label: "Management of Chronic Illnesses",
    value: "Management of Chronic Illnesses",
  },
  { label: "Acute Illness Treatment", value: "Acute Illness Treatment" },
  { label: "Basic Diagnostic Tests", value: "Basic Diagnostic Tests" },
  { label: "Referral to Specialists", value: "Referral to Specialists" },
  { label: "Childhood Immunizations", value: "Childhood Immunizations" },
  { label: "Developmental Screening", value: "Developmental Screening" },
  { label: "Newborn Care", value: "Newborn Care" },
  { label: "Adolescent Health Care", value: "Adolescent Health Care" },
  {
    label: "Treatment of Childhood Illnesses",
    value: "Treatment of Childhood Illnesses",
  },
  { label: "Nutritional Guidance", value: "Nutritional Guidance" },
  { label: "Behavioral Counseling", value: "Behavioral Counseling" },
  {
    label: "Growth and Development Monitoring",
    value: "Growth and Development Monitoring",
  },
  {
    label: "Diagnosis and Treatment of Internal Diseases",
    value: "Diagnosis and Treatment of Internal Diseases",
  },
  {
    label: "Complex Diagnostic Evaluations",
    value: "Complex Diagnostic Evaluations",
  },
  {
    label: "Preventive Health Screenings",
    value: "Preventive Health Screenings",
  },
  {
    label: "Coordination of Specialty Care",
    value: "Coordination of Specialty Care",
  },
  { label: "Adult Immunizations", value: "Adult Immunizations" },
  {
    label: "Electrocardiograms (EKG/ECG)",
    value: "Electrocardiograms (EKG/ECG)",
  },
  { label: "Echocardiograms", value: "Echocardiograms" },
  { label: "Stress Testing", value: "Stress Testing" },
  { label: "Cardiac Catheterization", value: "Cardiac Catheterization" },
  {
    label: "Management of Heart Disease",
    value: "Management of Heart Disease",
  },
  { label: "Pacemaker Implantation", value: "Pacemaker Implantation" },
  { label: "Heart Failure Management", value: "Heart Failure Management" },
  { label: "Hypertension Treatment", value: "Hypertension Treatment" },
  {
    label: "Skin Cancer Screening and Treatment",
    value: "Skin Cancer Screening and Treatment",
  },
  { label: "Acne Treatment", value: "Acne Treatment" },
  {
    label: "Eczema and Psoriasis Management",
    value: "Eczema and Psoriasis Management",
  },
  { label: "Mole and Lesion Removal", value: "Mole and Lesion Removal" },
  { label: "Cosmetic Dermatology", value: "Cosmetic Dermatology" },
  { label: "Laser Treatments", value: "Laser Treatments" },
  { label: "Hair Loss Treatment", value: "Hair Loss Treatment" },
  { label: "Allergy Testing", value: "Allergy Testing" },
  { label: "Diabetes Management", value: "Diabetes Management" },
  { label: "Thyroid Disorder Treatment", value: "Thyroid Disorder Treatment" },
  {
    label: "Hormone Replacement Therapy",
    value: "Hormone Replacement Therapy",
  },
  { label: "Osteoporosis Management", value: "Osteoporosis Management" },
  { label: "Metabolic Disorders", value: "Metabolic Disorders" },
  { label: "Pituitary Gland Disorders", value: "Pituitary Gland Disorders" },
  { label: "Adrenal Gland Disorders", value: "Adrenal Gland Disorders" },
  { label: "Cholesterol Management", value: "Cholesterol Management" },
  { label: "Endoscopy", value: "Endoscopy" },
  { label: "Colonoscopy", value: "Colonoscopy" },
  {
    label: "Treatment of Irritable Bowel Syndrome (IBS)",
    value: "Treatment of Irritable Bowel Syndrome (IBS)",
  },
  { label: "Liver Disease Management", value: "Liver Disease Management" },
  {
    label: "Treatment of Inflammatory Bowel Disease (IBD)",
    value: "Treatment of Inflammatory Bowel Disease (IBD)",
  },
  {
    label: "GERD and Acid Reflux Treatment",
    value: "GERD and Acid Reflux Treatment",
  },
  { label: "Hepatitis Management", value: "Hepatitis Management" },
  { label: "Celiac Disease Management", value: "Celiac Disease Management" },
  { label: "EEG (Electroencephalogram)", value: "EEG (Electroencephalogram)" },
  { label: "EMG (Electromyography)", value: "EMG (Electromyography)" },
  {
    label: "Multiple Sclerosis Management",
    value: "Multiple Sclerosis Management",
  },
  {
    label: "Parkinson's Disease Treatment",
    value: "Parkinson's Disease Treatment",
  },
  {
    label: "Seizure Disorder Management",
    value: "Seizure Disorder Management",
  },
  {
    label: "Migraine and Headache Treatment",
    value: "Migraine and Headache Treatment",
  },
  { label: "Stroke Management", value: "Stroke Management" },
  { label: "Neuropathy Treatment", value: "Neuropathy Treatment" },
  { label: "Chemotherapy", value: "Chemotherapy" },
  { label: "Radiation Therapy", value: "Radiation Therapy" },
  { label: "Cancer Screening", value: "Cancer Screening" },
  { label: "Cancer Surgery", value: "Cancer Surgery" },
  { label: "Immunotherapy", value: "Immunotherapy" },
  { label: "Targeted Therapy", value: "Targeted Therapy" },
  { label: "Palliative Care", value: "Palliative Care" },
  { label: "Genetic Testing for Cancer", value: "Genetic Testing for Cancer" },
  { label: "Vision Exams", value: "Vision Exams" },
  { label: "Cataract Surgery", value: "Cataract Surgery" },
  { label: "Glaucoma Treatment", value: "Glaucoma Treatment" },
  { label: "LASIK Surgery", value: "LASIK Surgery" },
  {
    label: "Treatment of Macular Degeneration",
    value: "Treatment of Macular Degeneration",
  },
  { label: "Diabetic Eye Care", value: "Diabetic Eye Care" },
  { label: "Corneal Transplant", value: "Corneal Transplant" },
  { label: "Retinal Detachment Repair", value: "Retinal Detachment Repair" },
  { label: "Pulmonary Function Testing", value: "Pulmonary Function Testing" },
  { label: "Asthma Management", value: "Asthma Management" },
  { label: "COPD Treatment", value: "COPD Treatment" },
  { label: "Bronchoscopy", value: "Bronchoscopy" },
  { label: "Sleep Apnea Treatment", value: "Sleep Apnea Treatment" },
  { label: "Lung Cancer Screening", value: "Lung Cancer Screening" },
  {
    label: "Interstitial Lung Disease Treatment",
    value: "Interstitial Lung Disease Treatment",
  },
  { label: "Cystic Fibrosis Management", value: "Cystic Fibrosis Management" },
  { label: "Arthritis Management", value: "Arthritis Management" },
  {
    label: "Treatment of Autoimmune Diseases",
    value: "Treatment of Autoimmune Diseases",
  },
  { label: "Joint Injections", value: "Joint Injections" },
  { label: "Gout Treatment", value: "Gout Treatment" },
  { label: "Lupus Treatment", value: "Lupus Treatment" },
  { label: "Fibromyalgia Management", value: "Fibromyalgia Management" },
  { label: "Scleroderma Treatment", value: "Scleroderma Treatment" },
  { label: "Dialysis", value: "Dialysis" },
  {
    label: "Kidney Transplant Management",
    value: "Kidney Transplant Management",
  },
  {
    label: "Chronic Kidney Disease Management",
    value: "Chronic Kidney Disease Management",
  },
  { label: "Electrolyte Disorders", value: "Electrolyte Disorders" },
  {
    label: "Polycystic Kidney Disease Treatment",
    value: "Polycystic Kidney Disease Treatment",
  },
  {
    label: "Acute Kidney Injury Treatment",
    value: "Acute Kidney Injury Treatment",
  },
  {
    label: "Glomerulonephritis Treatment",
    value: "Glomerulonephritis Treatment",
  },
  { label: "Anemia Treatment", value: "Anemia Treatment" },
  { label: "Blood Clotting Disorders", value: "Blood Clotting Disorders" },
  { label: "Leukemia Treatment", value: "Leukemia Treatment" },
  { label: "Lymphoma Treatment", value: "Lymphoma Treatment" },
  {
    label: "Sickle Cell Disease Management",
    value: "Sickle Cell Disease Management",
  },
  { label: "Hemophilia Treatment", value: "Hemophilia Treatment" },
  { label: "Bone Marrow Biopsy", value: "Bone Marrow Biopsy" },
  { label: "Blood Transfusion", value: "Blood Transfusion" },
  { label: "HIV/AIDS Management", value: "HIV/AIDS Management" },
  { label: "Tuberculosis Treatment", value: "Tuberculosis Treatment" },
  {
    label: "Travel Medicine and Vaccinations",
    value: "Travel Medicine and Vaccinations",
  },
  {
    label: "Treatment of Tropical Diseases",
    value: "Treatment of Tropical Diseases",
  },
  { label: "Antibiotic Stewardship", value: "Antibiotic Stewardship" },
  {
    label: "Management of Drug-Resistant Infections",
    value: "Management of Drug-Resistant Infections",
  },
  {
    label: "Fungal Infections Treatment",
    value: "Fungal Infections Treatment",
  },
  {
    label: "Immunotherapy (Allergy Shots)",
    value: "Immunotherapy (Allergy Shots)",
  },
  { label: "Food Allergy Management", value: "Food Allergy Management" },
  { label: "Skin Allergy Treatment", value: "Skin Allergy Treatment" },
  {
    label: "Eczema and Dermatitis Treatment",
    value: "Eczema and Dermatitis Treatment",
  },
  { label: "Hay Fever Treatment", value: "Hay Fever Treatment" },
  { label: "Sinusitis Management", value: "Sinusitis Management" },
  { label: "Prostate Exam", value: "Prostate Exam" },
  { label: "Kidney Stone Treatment", value: "Kidney Stone Treatment" },
  {
    label: "Urinary Tract Infection (UTI) Treatment",
    value: "Urinary Tract Infection (UTI) Treatment",
  },
  { label: "Bladder Cancer Treatment", value: "Bladder Cancer Treatment" },
  { label: "Male Infertility Treatment", value: "Male Infertility Treatment" },
  {
    label: "Erectile Dysfunction Treatment",
    value: "Erectile Dysfunction Treatment",
  },
  { label: "Incontinence Management", value: "Incontinence Management" },
  { label: "Vasectomy", value: "Vasectomy" },
  { label: "Appendectomy", value: "Appendectomy" },
  {
    label: "Gallbladder Removal (Cholecystectomy)",
    value: "Gallbladder Removal (Cholecystectomy)",
  },
  { label: "Hernia Repair", value: "Hernia Repair" },
  { label: "Colon Surgery", value: "Colon Surgery" },
  { label: "Breast Surgery", value: "Breast Surgery" },
  { label: "Thyroid Surgery", value: "Thyroid Surgery" },
  { label: "Emergency Surgery", value: "Emergency Surgery" },
  { label: "Trauma Surgery", value: "Trauma Surgery" },
  { label: "Joint Replacement Surgery", value: "Joint Replacement Surgery" },
  { label: "Arthroscopy", value: "Arthroscopy" },
  { label: "Fracture Repair", value: "Fracture Repair" },
  { label: "Spine Surgery", value: "Spine Surgery" },
  { label: "Sports Injury Treatment", value: "Sports Injury Treatment" },
  { label: "Hand Surgery", value: "Hand Surgery" },
  { label: "Foot and Ankle Surgery", value: "Foot and Ankle Surgery" },
  {
    label: "Pediatric Orthopedic Surgery",
    value: "Pediatric Orthopedic Surgery",
  },
  { label: "Brain Tumor Surgery", value: "Brain Tumor Surgery" },
  { label: "Aneurysm Repair", value: "Aneurysm Repair" },
  { label: "Epilepsy Surgery", value: "Epilepsy Surgery" },
  { label: "Peripheral Nerve Surgery", value: "Peripheral Nerve Surgery" },
  { label: "Hydrocephalus Treatment", value: "Hydrocephalus Treatment" },
  {
    label: "Traumatic Brain Injury Surgery",
    value: "Traumatic Brain Injury Surgery",
  },
  { label: "Carpal Tunnel Surgery", value: "Carpal Tunnel Surgery" },
  {
    label: "Coronary Artery Bypass Grafting (CABG)",
    value: "Coronary Artery Bypass Grafting (CABG)",
  },
  {
    label: "Heart Valve Repair and Replacement",
    value: "Heart Valve Repair and Replacement",
  },
  { label: "Lung Cancer Surgery", value: "Lung Cancer Surgery" },
  { label: "Esophageal Surgery", value: "Esophageal Surgery" },
  { label: "Heart Transplant", value: "Heart Transplant" },
  { label: "Thoracic Aneurysm Repair", value: "Thoracic Aneurysm Repair" },
  {
    label: "Minimally Invasive Heart Surgery",
    value: "Minimally Invasive Heart Surgery",
  },
  {
    label: "Congenital Heart Defect Repair",
    value: "Congenital Heart Defect Repair",
  },
  { label: "Prenatal Care", value: "Prenatal Care" },
  { label: "Labor and Delivery", value: "Labor and Delivery" },
  { label: "C-Section", value: "C-Section" },
  { label: "Gynecological Exams", value: "Gynecological Exams" },
  { label: "Pap Smears", value: "Pap Smears" },
  { label: "Family Planning", value: "Family Planning" },
  { label: "Menopause Management", value: "Menopause Management" },
  {
    label: "Treatment of Gynecological Disorders",
    value: "Treatment of Gynecological Disorders",
  },
  { label: "Psychiatric Evaluation", value: "Psychiatric Evaluation" },
  { label: "Medication Management", value: "Medication Management" },
  { label: "Individual Therapy", value: "Individual Therapy" },
  { label: "Group Therapy", value: "Group Therapy" },
  {
    label: "Cognitive Behavioral Therapy (CBT)",
    value: "Cognitive Behavioral Therapy (CBT)",
  },
  {
    label: "Treatment of Mood Disorders",
    value: "Treatment of Mood Disorders",
  },
  {
    label: "Treatment of Anxiety Disorders",
    value: "Treatment of Anxiety Disorders",
  },
  { label: "Substance Abuse Treatment", value: "Substance Abuse Treatment" },
  { label: "Psychological Assessment", value: "Psychological Assessment" },
  { label: "Behavioral Therapy", value: "Behavioral Therapy" },
  { label: "Family Therapy", value: "Family Therapy" },
  { label: "Marriage Counseling", value: "Marriage Counseling" },
  {
    label: "Treatment of Mental Health Disorders",
    value: "Treatment of Mental Health Disorders",
  },
  {
    label: "Dialectical Behavior Therapy (DBT)",
    value: "Dialectical Behavior Therapy (DBT)",
  },
  { label: "Substance Abuse Counseling", value: "Substance Abuse Counseling" },
  { label: "Trauma Therapy", value: "Trauma Therapy" },
  { label: "Stress Management", value: "Stress Management" },
  { label: "Routine Dental Exams", value: "Routine Dental Exams" },
  { label: "Teeth Cleaning", value: "Teeth Cleaning" },
  { label: "Cavity Fillings", value: "Cavity Fillings" },
  { label: "Root Canal Treatment", value: "Root Canal Treatment" },
  { label: "Tooth Extractions", value: "Tooth Extractions" },
  { label: "Crowns and Bridges", value: "Crowns and Bridges" },
  { label: "Dentures", value: "Dentures" },
  { label: "Teeth Whitening", value: "Teeth Whitening" },
  { label: "Braces", value: "Braces" },
  { label: "Invisalign", value: "Invisalign" },
  { label: "Retainers", value: "Retainers" },
  { label: "Treatment of Malocclusions", value: "Treatment of Malocclusions" },
  { label: "Jaw Alignment", value: "Jaw Alignment" },
  { label: "Palate Expanders", value: "Palate Expanders" },
  { label: "Orthodontic Surgery", value: "Orthodontic Surgery" },
  { label: "Habit Appliances", value: "Habit Appliances" },
  { label: "Dental Implants", value: "Dental Implants" },
  { label: "Jaw Surgery", value: "Jaw Surgery" },
  { label: "Treatment of Oral Diseases", value: "Treatment of Oral Diseases" },
  {
    label: "Cleft Lip and Palate Surgery",
    value: "Cleft Lip and Palate Surgery",
  },
  { label: "Facial Trauma Surgery", value: "Facial Trauma Surgery" },
  { label: "Biopsies of Oral Lesions", value: "Biopsies of Oral Lesions" },
  { label: "TMJ Surgery", value: "TMJ Surgery" },
  { label: "Rehabilitation Exercises", value: "Rehabilitation Exercises" },
  { label: "Manual Therapy", value: "Manual Therapy" },
  { label: "Pain Management", value: "Pain Management" },
  {
    label: "Post-Surgical Rehabilitation",
    value: "Post-Surgical Rehabilitation",
  },
  {
    label: "Sports Injury Rehabilitation",
    value: "Sports Injury Rehabilitation",
  },
  { label: "Stroke Recovery", value: "Stroke Recovery" },
  { label: "Speech Therapy", value: "Speech Therapy" },
  { label: "Swallowing Therapy", value: "Swallowing Therapy" },
  { label: "Voice Therapy", value: "Voice Therapy" },
  { label: "Cognitive Therapy", value: "Cognitive Therapy" },
  { label: "Language Therapy", value: "Language Therapy" },
  { label: "Fluency Therapy", value: "Fluency Therapy" },
  { label: "Articulation Therapy", value: "Articulation Therapy" },
  { label: "Stuttering Therapy", value: "Stuttering Therapy" },
  { label: "Accent Modification", value: "Accent Modification" },
  { label: "Pediatric Speech Therapy", value: "Pediatric Speech Therapy" },
  { label: "Adult Speech Therapy", value: "Adult Speech Therapy" },
  { label: "Swallowing Disorders", value: "Swallowing Disorders" },
  { label: "Voice Disorders", value: "Voice Disorders" },
  { label: "Cognitive Disorders", value: "Cognitive Disorders" },
  { label: "Stroke Recovery", value: "Stroke Recovery" },
  {
    label: "Brain Injury Rehabilitation",
    value: "Brain Injury Rehabilitation",
  },
  { label: "Vocal Cord Dysfunction", value: "Vocal Cord Dysfunction" },
  { label: "Dysphagia Treatment", value: "Dysphagia Treatment" },
  { label: "Stuttering Treatment", value: "Stuttering Treatment" },
  { label: "Accent Reduction", value: "Accent Reduction" },
  { label: "Articulation Disorders", value: "Articulation Disorders" },
  { label: "Fluency Disorders", value: "Fluency Disorders" },
  { label: "Speech Sound Disorders", value: "Speech Sound Disorders" },
  { label: "Language Disorders", value: "Language Disorders" },
  { label: "Voice Disorders", value: "Voice Disorders" },
  { label: "Apraxia Treatment", value: "Apraxia Treatment" },
  { label: "Aphasia Treatment", value: "Aphasia Treatment" },
  { label: "Dysarthria Treatment", value: "Dysarthria Treatment" },
];

export const imageFileTypes = ["image/jpeg", "image/png"];
