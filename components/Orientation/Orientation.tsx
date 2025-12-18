import { Orientation as OrientationType } from "@/strapi/orientation"
import { BlocksRenderer } from "@strapi/blocks-react-renderer"
import styles from "./Orientation.module.css"

const Orientation = ({ orientation }: { orientation: OrientationType }) => {
  return (
    <>
      <h1 className={styles.title}>Orientation</h1>
      <div className={styles.container}>
        <BlocksRenderer content={orientation.bienvenue_aem} />
      </div>
    </>
  )
}

export default Orientation
