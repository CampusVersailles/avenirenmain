import { z } from "zod"

export const adresseSchema = z.object({
  adresseComplete: z.string().trim(),
  numeroRue: z.string().trim(),
  rue: z.string().trim(),
  codePostal: z.string().trim(),
  ville: z.string().trim(),
  pays: z.string().trim(),
  longitude: z.number().optional(),
  latitude: z.number().optional(),
})

export const referencerFormSchema = z.object({
  // Infos nécessaires
  titre: z.string().min(1, "Le titre est obligatoire"),
  nomEtablissement: z.string().min(1, "Le nom de l'établissement est obligatoire"),
  // Adresse obligatoire
  adresse: adresseSchema.refine((data) => data.adresseComplete !== "", { message: "L'adresse est obligatoire" }),
  filieres: z.array(z.string()).min(1, "Au moins une filière est obligatoire"),
  romeCodeMetiers: z.array(z.string()).min(1, "Au moins un métier est obligatoire"),
  formationDuree: z.string().min(1, "La durée de la formation est obligatoire"),
  formationNiveau: z.string().min(1, "Le niveau de la formation est obligatoire"),
  alternance: z.boolean(),
  certificat: z.string().trim().min(1, "Le certificat est obligatoire"),

  // Infos facultatives
  siteWeb: z.string().trim().optional(),
  contact: z.string().trim().optional(),
})

export type ReferencerForm = z.infer<typeof referencerFormSchema>
