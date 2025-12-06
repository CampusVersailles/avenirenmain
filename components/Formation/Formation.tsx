import { Formation as FormationType } from "@/strapi/formations"
import styles from "./Formation.module.css"
import Link from "next/link"
import BriefcaseIcon from "@/components/Icons/BriefcaseIcon"
import SchoolIcon from "@/components/Icons/SchoolIcon"
import AwardIcon from "@/components/Icons/AwardIcon"
import MapPinIcon from "@/components/Icons/MapPinIcon"
import GlobeIcon from "@/components/Icons/GlobeIcon"
import MailIcon from "@/components/Icons/MailIcon"
import Image from "next/image"
import PhoneIcon from "@/components/Icons/PhoneIcon"
import classNames from "classnames"

const Formation = ({
  formation,
  onClick,
  selected,
}: {
  formation: FormationType
  onClick?: () => void
  selected?: boolean
}) => {
  return (
    <div className={classNames(styles.formation, { [styles.selected]: selected })}>
      {onClick && (
        <button
          onClick={onClick}
          className={styles.viewOnMapButton}
          aria-label={`Voir la formation ${formation.titre} sur la carte`}>
          <MapPinIcon />
        </button>
      )}
      <div className={classNames(styles.header, { [styles.small]: onClick })}>
        {formation.filieres[0]?.icone && (
          <div className={styles.iconWrapper}>
            <Image
              src={formation.filieres[0]?.icone.url}
              alt=''
              width={48}
              height={48}
              className={styles.filiereIcon}
            />
          </div>
        )}
        <div className={styles.headerContent}>
          <h2 className={styles.title}>{formation.titre}</h2>
          <p className={styles.etablissement}>{formation.nomEtablissement}</p>
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.infoItem}>
          {formation.alternance ? (
            <>
              <BriefcaseIcon className={styles.icon} />
              <span>Alternance{formation.formationDuree?.label ? ` - ${formation.formationDuree.label}` : ""}</span>
            </>
          ) : (
            <>
              <SchoolIcon className={styles.icon} />
              <span>
                Formation continue{formation.formationDuree?.label ? ` - ${formation.formationDuree.label}` : ""}
              </span>
            </>
          )}
        </div>
        <div className={styles.infoItem}>
          <MapPinIcon className={styles.icon} />
          <span>{formation.adresse?.ville || "Non renseignée"}</span>
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.detailsHeader}>
          <AwardIcon className={styles.icon} />
          <span className={styles.detailsLabel}>Formation :</span>
        </div>
        <div className={styles.niveaux}>
          <p className={styles.niveauItem}>Titre : {formation.certificat || "Non renseigné"}</p>
          <p className={styles.niveauItem}>Niveau : {formation.formationNiveau?.label || "Non renseigné"}</p>
        </div>
      </div>

      <div className={styles.info}>
        {formation.siteWeb && (
          <div className={styles.contactItem}>
            <GlobeIcon className={styles.icon} />
            <Link href={formation.siteWeb} target='_blank' rel='noopener noreferrer' className={styles.link}>
              {formation.siteWeb}
            </Link>
          </div>
        )}
        {formation.contact &&
          (formation.contact.includes("@") ? (
            <div className={styles.contactItem}>
              <MailIcon className={styles.icon} />
              <Link href={`mailto:${formation.contact}`} className={styles.link}>
                {formation.contact}
              </Link>
            </div>
          ) : (
            <div className={styles.contactItem}>
              <PhoneIcon className={styles.icon} />
              <p className={styles.link}>{formation.contact}</p>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Formation
