import styles from "./FormationsBanner.module.css"
import LinkAsButton from "../Button/LinkAsButton"

const FormationsBanner = () => {
  return (
    <div className={styles.banner}>
      <h2>Découvre des métiers d'avenir</h2>
      <p>
        Que tu aimes les grands espaces ou les petits ateliers, travailler seul ou en groupe, bricoler ou animer,
        esquisse ton futur en explorant les familles de métiers qui te plaisent.
      </p>
      <LinkAsButton secondary href='/formations' className={styles.button}>
        Je trouve ma formation
      </LinkAsButton>
    </div>
  )
}

export default FormationsBanner
