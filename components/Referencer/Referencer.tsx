"use client"

import { useMemo, useState } from "react"
import { submitFormation, type Option } from "@/strapi/formations"
import { referencerFormSchema, type ReferencerForm } from "@/types/formation"
import styles from "./Referencer.module.css"
import { MultiSelect } from "./MultiSelect"
import { FilieresAvecMetiersRomeCodes } from "@/strapi/filieres"
import AdresseAutocomplete, { AddressResult } from "./AdresseAutocomplete"
import SendIcon from "../Icons/SendIcon"

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
    // Validate the zod schema
    const validated = referencerFormSchema.safeParse(formData)
    if (!validated.success) {
      return
    }
    // Submit the form to the API
    const response = await submitFormation(validated.data)
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
          <label htmlFor='search'>Nom de la formation</label>
          <div className={styles.inputWrapper}>
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
          <label htmlFor='certificat'>Certificat</label>
          <div className={styles.inputWrapper}>
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
        <div className={styles.inputField}>
          <label htmlFor='filiere'>Filières</label>
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
        <div className={styles.inputField}>
          <label htmlFor='romeCodesMetiers'>Métiers</label>
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
        <div className={styles.field}>
          <label htmlFor='diplome'>Diplôme</label>
          <select id='diplome' value={formData.formationNiveau} onChange={OnDiplomeChange} className={styles.select}>
            {niveaux.map((niveau) => (
              <option key={niveau.value} value={niveau.value}>
                {niveau.label}
              </option>
            ))}
          </select>
        </div>

        {/* Durée */}
        <div className={styles.field}>
          <label htmlFor='duree'>Durée</label>
          <select id='duree' value={formData.formationDuree} onChange={OnDureeChange} className={styles.select}>
            {durees.map((duree) => (
              <option key={duree.value} value={duree.value}>
                {duree.label}
              </option>
            ))}
          </select>
        </div>

        {/* Alternance */}
        <div className={styles.field}>
          <label htmlFor='alternance'>Alternance</label>
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
        <div className={styles.inputField}>
          <label htmlFor='etablissement'>Etablissement</label>
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
        <div className={styles.inputField}>
          <AdresseAutocomplete value={adresseValue} onChange={OnAdresseChange} />
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
