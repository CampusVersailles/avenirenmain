"use client"
import { Partenaire } from "@/strapi/partenaires"
import styles from "./Partenaires.module.css"
import { useMemo, useState } from "react"
import ArrowRightSLine from "../Icons/ArrowRightSLine"
import ArrowLeftSLine from "../Icons/ArrowLeftSLine"
import Image from "next/image"
import Link from "next/link"
import { isBlocksContentEmpty } from "@/lib/text_utils"
import StrapiRichText from "@/components/Strapi/StrapiRichText"

const typesLabels: { [key: string]: string } = {
  Bâtisseur: "Bâtisseurs",
  "Institutionnel et ressource": "Institutions & Ressources",
  Financeur: "Financeurs",
  "Concepteur et relecteur": "Concepteurs & Relecteurs",
}

const PartenairesCarousel = ({ partenaires }: { partenaires: Partenaire[] }) => {
  const partenaireTypes = useMemo(
    () =>
      partenaires
        .map((partenaire) => partenaire.type)
        .filter((type) => type !== null)
        .filter((value, index, self) => self.indexOf(value) === index),
    [partenaires],
  )

  const [selected, setSelected] = useState<Partenaire | null>(null)
  const [typeIndex, setTypeIndex] = useState(0)

  const currentType = partenaireTypes[typeIndex]

  return (
    <>
      <h1>
        Les bâtisseurs de l’<span className={styles.highlight}>Avenir en main</span>
      </h1>
      <div className={styles.box}>
        {selected ? (
          <div className={styles.selectedHeader}>
            <button
              className={styles.button}
              onClick={() => setSelected(null)}
              aria-label='Revenir à la liste des partenaires'>
              <ArrowLeftSLine />
            </button>
            <h2>
              <span className={styles.highlight}>{selected.nom}</span>
            </h2>
          </div>
        ) : (
          <div className={styles.header}>
            <button
              className={styles.button}
              onClick={() => setTypeIndex((prev) => (prev - 1 + partenaireTypes.length) % partenaireTypes.length)}
              aria-label='Voir les partenaires précédents'>
              <ArrowLeftSLine />
            </button>
            <h2>
              Partenaires <span className={styles.highlight}>{typesLabels[currentType] || currentType}</span>
            </h2>
            <button
              className={styles.button}
              onClick={() => setTypeIndex((prev) => (prev + 1) % partenaireTypes.length)}
              aria-label='Voir les partenaires suivants'>
              <ArrowRightSLine />
            </button>
          </div>
        )}
        {selected && selected.description ? (
          <>
            <StrapiRichText content={selected.description} />
            <Link href={selected.site} className={styles.buttonSite} target='_blank' rel='noopener noreferrer'>
              Visiter le site
            </Link>
          </>
        ) : (
          <div className={styles.logos}>
            {partenaires
              .filter((partenaire) => partenaire.type === currentType)
              .map((partenaire) => {
                const content = partenaire.logo ? (
                  <Image
                    src={partenaire.logo}
                    alt={`Logo de ${partenaire.nom}`}
                    className={styles.logoImage}
                    width={150}
                    height={150}
                  />
                ) : (
                  partenaire.nom
                )
                return isBlocksContentEmpty(partenaire.description) ? (
                  <Link
                    href={partenaire.site}
                    key={partenaire.id}
                    className={styles.logo}
                    aria-label={`Aller sur le site de ${partenaire.nom}`}
                    target='_blank'
                    rel='noopener noreferrer'>
                    {content}
                  </Link>
                ) : (
                  <button
                    key={partenaire.id}
                    className={styles.logo}
                    onClick={() => setSelected(partenaire)}
                    aria-label={`Voir les détails de ${partenaire.nom}`}>
                    {content}
                  </button>
                )
              })}
          </div>
        )}
      </div>
    </>
  )
}

export default PartenairesCarousel
