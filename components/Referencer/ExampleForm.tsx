// "use client"

// import { useState } from "react"
// import { ZodError } from "zod"
// import { type Option } from "@/strapi/formations"
// import { referencerFormSchema, type ReferencerForm } from "@/types/formation"
// import styles from "./Referencer.module.css"

// const ExampleForm = ({ filieres, niveaux, durees }: { filieres: Option[]; niveaux: Option[]; durees: Option[] }) => {
//   const [formData, setFormData] = useState<ReferencerForm>({
//     titre: "",
//     nomEtablissement: "",
//     adresse: {
//       numeroRue: "",
//       rue: "",
//       complement: "",
//       codePostal: "",
//       ville: "",
//       pays: "",
//     },
//     filiereId: "",
//     formationDureeId: "",
//     formationNiveauId: "",
//     alternance: false,
//     certificat: "",
//     siteWeb: "",
//     contact: "",
//   })

//   const [errors, setErrors] = useState<Record<string, string>>({})

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value, type } = e.target

//     if (type === "checkbox") {
//       const checked = (e.target as HTMLInputElement).checked
//       setFormData((prev) => ({ ...prev, [name]: checked }))
//     } else if (name.startsWith("adresse.")) {
//       const field = name.split(".")[1]
//       setFormData((prev) => ({
//         ...prev,
//         adresse: { ...prev.adresse, [field]: value },
//       }))
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }))
//     }

//     if (errors[name]) {
//       setErrors((prev) => {
//         const newErrors = { ...prev }
//         delete newErrors[name]
//         return newErrors
//       })
//     }
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     console.log("Submit form")
//     e.preventDefault()
//     setErrors({})

//     try {
//       const validatedData = referencerFormSchema.parse(formData)
//       console.log("Form validated successfully:", validatedData)
//       // TODO: Handle form submission
//     } catch (error) {
//       if (error instanceof ZodError) {
//         const fieldErrors: Record<string, string> = {}
//         error.issues.forEach((issue) => {
//           const path = issue.path.join(".")
//           fieldErrors[path] = issue.message
//         })
//         setErrors(fieldErrors)
//       }
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className={styles.form}>
//       {/* Titre de la formation */}
//       <div className={styles.formGroup}>
//         <label htmlFor='titre' className={styles.label}>
//           Titre <span className={styles.required}>*</span>
//         </label>
//         <input
//           type='text'
//           id='titre'
//           name='titre'
//           value={formData.titre}
//           onChange={handleChange}
//           className={`${styles.input} ${errors.titre ? styles.inputError : ""}`}
//         />
//         {errors.titre && <span className={styles.error}>{errors.titre}</span>}
//       </div>

//       {/* Nom de l'établissement */}
//       <div className={styles.formGroup}>
//         <label htmlFor='nomEtablissement' className={styles.label}>
//           Nom de l&apos;établissement <span className={styles.required}>*</span>
//         </label>
//         <input
//           type='text'
//           id='nomEtablissement'
//           name='nomEtablissement'
//           value={formData.nomEtablissement}
//           onChange={handleChange}
//           className={`${styles.input} ${errors.nomEtablissement ? styles.inputError : ""}`}
//         />
//         {errors.nomEtablissement && <span className={styles.error}>{errors.nomEtablissement}</span>}
//       </div>

//       {/* Adresse Section */}
//       <fieldset className={styles.fieldset}>
//         <legend className={styles.legend}>Adresse</legend>

//         <div className={styles.addressRow}>
//           <div className={styles.formGroup}>
//             <label htmlFor='numeroRue' className={styles.label}>
//               Numéro <span className={styles.required}>*</span>
//             </label>
//             <input
//               type='text'
//               id='numeroRue'
//               name='adresse.numeroRue'
//               value={formData.adresse.numeroRue}
//               onChange={handleChange}
//               className={`${styles.input} ${errors["adresse.numeroRue"] ? styles.inputError : ""}`}
//             />
//             {errors["adresse.numeroRue"] && <span className={styles.error}>{errors["adresse.numeroRue"]}</span>}
//           </div>

//           <div className={`${styles.formGroup} ${styles.flexGrow}`}>
//             <label htmlFor='rue' className={styles.label}>
//               Rue <span className={styles.required}>*</span>
//             </label>
//             <input
//               type='text'
//               id='rue'
//               name='adresse.rue'
//               value={formData.adresse.rue}
//               onChange={handleChange}
//               className={`${styles.input} ${errors["adresse.rue"] ? styles.inputError : ""}`}
//             />
//             {errors["adresse.rue"] && <span className={styles.error}>{errors["adresse.rue"]}</span>}
//           </div>
//         </div>

//         <div className={styles.formGroup}>
//           <label htmlFor='complement' className={styles.label}>
//             Complément d&apos;adresse
//           </label>
//           <input
//             type='text'
//             id='complement'
//             name='adresse.complement'
//             value={formData.adresse.complement}
//             onChange={handleChange}
//             className={styles.input}
//           />
//         </div>

//         <div className={styles.addressRow}>
//           <div className={styles.formGroup}>
//             <label htmlFor='codePostal' className={styles.label}>
//               Code postal <span className={styles.required}>*</span>
//             </label>
//             <input
//               type='text'
//               id='codePostal'
//               name='adresse.codePostal'
//               value={formData.adresse.codePostal}
//               onChange={handleChange}
//               className={`${styles.input} ${errors["adresse.codePostal"] ? styles.inputError : ""}`}
//             />
//             {errors["adresse.codePostal"] && <span className={styles.error}>{errors["adresse.codePostal"]}</span>}
//           </div>

//           <div className={`${styles.formGroup} ${styles.flexGrow}`}>
//             <label htmlFor='ville' className={styles.label}>
//               Ville <span className={styles.required}>*</span>
//             </label>
//             <input
//               type='text'
//               id='ville'
//               name='adresse.ville'
//               value={formData.adresse.ville}
//               onChange={handleChange}
//               className={`${styles.input} ${errors["adresse.ville"] ? styles.inputError : ""}`}
//             />
//             {errors["adresse.ville"] && <span className={styles.error}>{errors["adresse.ville"]}</span>}
//           </div>
//         </div>

//         <div className={styles.formGroup}>
//           <label htmlFor='pays' className={styles.label}>
//             Pays <span className={styles.required}>*</span>
//           </label>
//           <input
//             type='text'
//             id='pays'
//             name='adresse.pays'
//             value={formData.adresse.pays}
//             onChange={handleChange}
//             className={`${styles.input} ${errors["adresse.pays"] ? styles.inputError : ""}`}
//           />
//           {errors["adresse.pays"] && <span className={styles.error}>{errors["adresse.pays"]}</span>}
//         </div>
//       </fieldset>

//       {/* Filière */}
//       <div className={styles.formGroup}>
//         <label htmlFor='filiereId' className={styles.label}>
//           Filière <span className={styles.required}>*</span>
//         </label>
//         <select
//           id='filiereId'
//           name='filiereId'
//           value={formData.filiereId}
//           onChange={handleChange}
//           className={`${styles.select} ${errors.filiereId ? styles.inputError : ""}`}>
//           <option value=''>Sélectionnez une filière</option>
//           {filieres.map((filiere) => (
//             <option key={filiere.value} value={filiere.value}>
//               {filiere.label}
//             </option>
//           ))}
//         </select>
//         {errors.filiereId && <span className={styles.error}>{errors.filiereId}</span>}
//       </div>

//       {/* Niveau */}
//       <div className={styles.formGroup}>
//         <label htmlFor='formationNiveauId' className={styles.label}>
//           Niveau <span className={styles.required}>*</span>
//         </label>
//         <select
//           id='formationNiveauId'
//           name='formationNiveauId'
//           value={formData.formationNiveauId}
//           onChange={handleChange}
//           className={`${styles.select} ${errors.formationNiveauId ? styles.inputError : ""}`}>
//           <option value=''>Sélectionnez un niveau</option>
//           {niveaux.map((niveau) => (
//             <option key={niveau.value} value={niveau.value}>
//               {niveau.label}
//             </option>
//           ))}
//         </select>
//         {errors.formationNiveauId && <span className={styles.error}>{errors.formationNiveauId}</span>}
//       </div>

//       {/* Durée */}
//       <div className={styles.formGroup}>
//         <label htmlFor='formationDureeId' className={styles.label}>
//           Durée <span className={styles.required}>*</span>
//         </label>
//         <select
//           id='formationDureeId'
//           name='formationDureeId'
//           value={formData.formationDureeId}
//           onChange={handleChange}
//           className={`${styles.select} ${errors.formationDureeId ? styles.inputError : ""}`}>
//           <option value=''>Sélectionnez une durée</option>
//           {durees.map((duree) => (
//             <option key={duree.value} value={duree.value}>
//               {duree.label}
//             </option>
//           ))}
//         </select>
//         {errors.formationDureeId && <span className={styles.error}>{errors.formationDureeId}</span>}
//       </div>

//       {/* Alternance */}
//       <div className={styles.formGroup}>
//         <label className={styles.checkboxLabel}>
//           <input
//             type='checkbox'
//             name='alternance'
//             checked={formData.alternance}
//             onChange={handleChange}
//             className={styles.checkbox}
//           />
//           <span>Formation en alternance</span>
//         </label>
//       </div>

//       {/* Certificat */}
//       <div className={styles.formGroup}>
//         <label htmlFor='certificat' className={styles.label}>
//           Certificat <span className={styles.required}>*</span>
//         </label>
//         <input
//           type='text'
//           id='certificat'
//           name='certificat'
//           value={formData.certificat}
//           onChange={handleChange}
//           className={`${styles.input} ${errors.certificat ? styles.inputError : ""}`}
//         />
//         {errors.certificat && <span className={styles.error}>{errors.certificat}</span>}
//       </div>

//       {/* Site Web (optional) */}
//       <div className={styles.formGroup}>
//         <label htmlFor='siteWeb' className={styles.label}>
//           Site web
//         </label>
//         <input
//           type='url'
//           id='siteWeb'
//           name='siteWeb'
//           value={formData.siteWeb}
//           onChange={handleChange}
//           className={styles.input}
//           placeholder='https://example.com'
//         />
//         {errors.siteWeb && <span className={styles.error}>{errors.siteWeb}</span>}
//       </div>

//       {/* Contact (optional) */}
//       <div className={styles.formGroup}>
//         <label htmlFor='contact' className={styles.label}>
//           Contact
//         </label>
//         <input
//           type='text'
//           id='contact'
//           name='contact'
//           value={formData.contact}
//           onChange={handleChange}
//           className={styles.input}
//         />
//         {errors.contact && <span className={styles.error}>{errors.contact}</span>}
//       </div>

//       {/* Submit Button */}
//       <div className={styles.formActions}>
//         <button type='submit' className={styles.submitButton}>
//           Soumettre la formation
//         </button>
//       </div>
//     </form>
//   )
// }

// export default ExampleForm
