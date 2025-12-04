import { z } from "zod"

export const adresseSchema = z.object({
  numeroRue: z.string().trim(),
  rue: z.string().trim(),
  complement: z.string().trim().optional(),
  codePostal: z.string().trim(),
  ville: z.string().trim(),
  pays: z.string().trim(),
})

export const referencerFormSchema = z.object({
  // Infos nécessaires
  titre: z.string().min(1, "Le titre est obligatoire"),
  nomEtablissement: z.string().min(1, "Le nom de l'établissement est obligatoire"),
  adresse: adresseSchema,
  filiereId: z.string().min(1),
  formationDureeId: z.string().min(1),
  formationNiveauId: z.string().min(1),
  alternance: z.boolean().default(false),
  certificat: z.string().trim(),

  // Infos facultatives
  siteWeb: z.string().trim().optional(),
  contact: z.string().trim().optional(),
})

export type ReferencerForm = z.infer<typeof referencerFormSchema>
