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
  adresse: adresseSchema,
  filieres: z.array(z.string()).min(1),
  romeCodeMetiers: z.array(z.string()).min(1),
  formationDuree: z.string().min(1),
  formationNiveau: z.string().min(1),
  alternance: z.boolean().default(false),
  certificat: z.string().trim(),

  // Infos facultatives
  siteWeb: z.string().trim().optional(),
  contact: z.string().trim().optional(),
})

export type ReferencerForm = z.infer<typeof referencerFormSchema>
