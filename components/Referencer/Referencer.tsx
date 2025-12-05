"use client"

import { useMemo, useState } from "react"
import { submitFormation, type Option } from "@/strapi/formations"
import { referencerFormSchema, type ReferencerForm } from "@/types/formation"
import styles from "./Referencer.module.css"
import { MultiSelect } from "./MultiSelect"
import { FilieresAvecMetiersRomeCodes } from "@/strapi/filieres"
import AdresseAutocomplete, { AddressResult } from "./AdresseAutocomplete"
import SendIcon from "../Icons/SendIcon"
import classNames from "classnames"

const Referencer = ({
  filieresAvecMetiersRomeCodes,
  filieres,
  niveaux,
  durees,
}: {
  filieresAvecMetiersRomeCodes: FilieresAvecMetiersRomeCodes[]
  filieres: Option[]
  niveaux: Option[]
  durees: Option[]
}) => {
  const [adresseValue, setAdresseValue] = useState<AddressResult | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState<ReferencerForm>({
    titre: "",
    nomEtablissement: "",
    adresse: {
      adresseComplete: "",
      numeroRue: "",
      rue: "",
      codePostal: "",
      ville: "",
      pays: "",
    },
    filieres: [],
    romeCodeMetiers: [],
    formationDuree: "",
    formationNiveau: "",
    alternance: false,
    certificat: "",
    siteWeb: "",
    contact: "",
  })

  const romeCodesOptions = useMemo(() => {
    return filieresAvecMetiersRomeCodes
      .filter((filiere) => formData.filieres.includes(filiere.documentId))
      .flatMap((filiere) =>
        filiere.metiers.map((metier) => {
          return {
            value: metier.codeRomeMetier.code,
            label: metier.titre,
          }
        }),
      )
      .filter((romeCode, index, self) => self.findIndex((t) => t.value === romeCode.value) === index)
  }, [formData.filieres, filieresAvecMetiersRomeCodes])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    // Validate the zod schema
    const validated = referencerFormSchema.safeParse(formData)
    if (!validated.success) {
      // Parse validation errors and store them
      const validationErrors: Record<string, string> = {}
      validated.error.issues.forEach((error) => {
        const path = error.path.join(".")
        validationErrors[path] = error.message
      })
      console.log(validated.error.issues)
      console.log(validationErrors)
      setErrors(validationErrors)
      return
    }
    // Submit the form to the API
    submitFormation(validated.data)
  }

  const OnRomeCodeMetierChange = (newCodes: string[]) => {
    setFormData((prev) => ({ ...prev, romeCodeMetiers: newCodes }))
  }

  const OnNomFormationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, titre: e.target.value }))
  }

  const OnDiplomeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, formationNiveau: e.target.value }))
  }

  const OnDureeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, formationDuree: e.target.value }))
  }

  const OnAlternanceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, alternance: e.target.value === "true" }))
  }

  const OnCertificatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, certificat: e.target.value }))
  }

  const OnSiteWebChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, siteWeb: e.target.value }))
  }

  const OnContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, contact: e.target.value }))
  }

  const OnNomEtablissementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, nomEtablissement: e.target.value }))
  }

  const OnFiliereChange = (newValues: string[]) => {
    setFormData((prev) => ({ ...prev, filieres: newValues, romeCodeMetiers: [] }))
  }

  const OnAdresseChange = (newAddress: AddressResult | null) => {
    setAdresseValue(newAddress)
    setFormData((prev) => ({
      ...prev,
      adresse: {
        adresseComplete: newAddress?.properties.label ?? "",
        numeroRue: newAddress?.properties.housenumber ?? "",
        rue: newAddress?.properties.street ?? "",
        codePostal: newAddress?.properties.postcode ?? "",
        ville: newAddress?.properties.city ?? "",
        pays: "France",
        longitude: newAddress?.geometry.coordinates[0] ?? 0,
        latitude: newAddress?.geometry.coordinates[1] ?? 0,
      },
    }))
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {/* Nom de la formation */}
      <div className={styles.row}>
        <div className={styles.inputField}>
          <label htmlFor='search'>
            Nom de la formation <span className={styles.required}>*</span>
          </label>
          <div className={classNames(styles.inputWrapper, { [styles.error]: errors.titre })}>
            <input
              id='search'
              type='text'
              placeholder='Exemple: Formation de musicien intervenant'
              value={formData.titre}
              onChange={OnNomFormationChange}
            />
          </div>
        </div>
      </div>

      <div className={styles.row}>
        {/* Certificat */}
        <div className={styles.inputField}>
          <label htmlFor='certificat'>
            Certificat <span className={styles.required}>*</span>
          </label>
          <div className={classNames(styles.inputWrapper, { [styles.error]: errors.certificat })}>
            <input
              id='certificat'
              type='text'
              placeholder='Exemple: Diplôme universitaire de musicien intervenant'
              value={formData.certificat}
              onChange={OnCertificatChange}
            />
          </div>
        </div>
      </div>

      <div className={styles.row}>
        {/* Filière */}
        <div className={classNames(styles.inputField, { [styles.error]: errors.filieres })}>
          <label htmlFor='filiere'>
            Filières <span className={styles.required}>*</span>
          </label>
          <MultiSelect
            id='filiere'
            options={filieres}
            value={formData.filieres}
            onChange={OnFiliereChange}
            placeholder='Sélectionnez les filières'
            noResultsText='Aucune filière trouvée'
            enableSearch={false}
          />
        </div>
      </div>

      <div className={styles.row}>
        {/* Metiers */}
        <div className={classNames(styles.inputField, { [styles.error]: errors.romeCodeMetiers })}>
          <label htmlFor='romeCodesMetiers'>
            Métiers <span className={styles.required}>*</span>
          </label>
          <MultiSelect
            id='romeCodesMetiers'
            options={romeCodesOptions}
            value={formData.romeCodeMetiers}
            onChange={OnRomeCodeMetierChange}
            placeholder='Sélectionnez les métiers'
            noResultsText={romeCodesOptions.length === 0 ? "Veuillez sélectionner une filière." : "Aucun métier trouvé"}
            enableSearch={true}
          />
        </div>
      </div>

      <div className={styles.row}>
        {/* Niveau */}
        <div className={classNames(styles.field, { [styles.error]: errors.formationNiveau })}>
          <label htmlFor='diplome'>
            Diplôme <span className={styles.required}>*</span>
          </label>
          <select id='diplome' value={formData.formationNiveau} onChange={OnDiplomeChange} className={styles.select}>
            <option value='' hidden></option>
            {niveaux.map((niveau) => (
              <option key={niveau.value} value={niveau.value}>
                {niveau.label}
              </option>
            ))}
          </select>
        </div>

        {/* Durée */}
        <div className={classNames(styles.field, { [styles.error]: errors.formationDuree })}>
          <label htmlFor='duree'>
            Durée <span className={styles.required}>*</span>
          </label>
          <select id='duree' value={formData.formationDuree} onChange={OnDureeChange} className={styles.select}>
            <option value='' hidden></option>
            {durees.map((duree) => (
              <option key={duree.value} value={duree.value}>
                {duree.label}
              </option>
            ))}
          </select>
        </div>

        {/* Alternance */}
        <div className={classNames(styles.field, { [styles.error]: errors.alternance })}>
          <label htmlFor='alternance'>
            Alternance <span className={styles.required}>*</span>
          </label>
          <select
            id='alternance'
            value={formData.alternance ? "true" : "false"}
            onChange={OnAlternanceChange}
            className={styles.select}>
            <option value='true'>Oui</option>
            <option value='false'>Non</option>
          </select>
        </div>
      </div>

      <div className={styles.row}>
        {/* Etablissement */}
        <div className={classNames(styles.inputField, { [styles.error]: errors.nomEtablissement })}>
          <label htmlFor='etablissement'>
            Etablissement <span className={styles.required}>*</span>
          </label>
          <div className={styles.inputWrapper}>
            <input
              id='etablissement'
              type='text'
              placeholder='Exemple: Ecole supérieure de musique de Paris'
              value={formData.nomEtablissement}
              onChange={OnNomEtablissementChange}
            />
          </div>
        </div>
      </div>

      <div className={styles.row}>
        {/* Adresse */}
        <div className={classNames(styles.inputField, { [styles.error]: errors.adresse })}>
          <label htmlFor='adresse'>
            Adresse <span className={styles.required}>*</span>
          </label>
          <AdresseAutocomplete error={errors.adresse} value={adresseValue} onChange={OnAdresseChange} />
        </div>
      </div>

      <div className={styles.row}>
        {/* Site web */}
        <div className={styles.inputField}>
          <label htmlFor='siteWeb'>Site web</label>
          <div className={styles.inputWrapper}>
            <input
              id='siteWeb'
              type='text'
              placeholder='Exemple: https://www.mon-etablissement.fr/ma-formation/'
              value={formData.siteWeb}
              onChange={OnSiteWebChange}
            />
          </div>
        </div>
      </div>

      <div className={styles.row}>
        {/* Contact */}
        <div className={styles.inputField}>
          <label htmlFor='contact'>Contact</label>
          <div className={styles.inputWrapper}>
            <input
              id='contact'
              type='text'
              placeholder='Email ou numéro de téléphone'
              value={formData.contact}
              onChange={OnContactChange}
            />
          </div>
        </div>
      </div>

      {Object.keys(errors).length > 0 && (
        <div className={styles.errors}>
          * Veuillez remplir tous les champs obligatoires avant de soumettre la formation.
        </div>
      )}

      <div className={styles.submitRow}>
        <button className={styles.button} type='submit'>
          Soumettre ma formation
          <SendIcon className={styles.icon} />
        </button>
      </div>
    </form>
  )
}

export default Referencer
