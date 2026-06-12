import { FichePratiqueDetailStrapi } from "@/strapi/ressources"
import { FichePratiqueContentItem } from "./FichePratiqueContentItem"
import styles from "./FichePratiquePrintDocument.module.css"

const FichePratiquePrintDocument = ({ fiche }: { fiche: FichePratiqueDetailStrapi }) => {
  return (
    <main id='fiche-pdf-root' className={styles.root}>
      <header className={styles.header}>
        <h1 className={styles.title}>{fiche.titre}</h1>
        {fiche.sousTitre && <p className={styles.subtitle}>{fiche.sousTitre}</p>}
        <div className={styles.meta}>
          {fiche.type && <p>{fiche.type}</p>}
          {fiche.temps && <p>Temps estime: {fiche.temps}</p>}
        </div>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Introduction</h2>
        <FichePratiqueContentItem item={{ id: -1, texte: { id: -1, texte: fiche.intro } }} />
      </section>

      {fiche.parties.map((partie, partieIndex) => (
        <section key={partie.id} className={`${styles.section} ${styles.partSection}`} data-part-section='true'>
          <h2 className={styles.sectionTitle}>
            Partie {partieIndex + 1} - {partie.titre}
          </h2>

          {partie.sousParties.map((sousPartie, sousPartieIndex) => (
            <div key={sousPartie.id} className={styles.subSection} data-sub-section='true'>
              <h3 className={styles.subSectionTitle}>
                {partieIndex + 1}.{sousPartieIndex + 1} {sousPartie.titre}
              </h3>
              {sousPartie.contenu.map((item) => (
                <FichePratiqueContentItem key={item.id} item={item} />
              ))}
            </div>
          ))}
        </section>
      ))}
    </main>
  )
}

export default FichePratiquePrintDocument
