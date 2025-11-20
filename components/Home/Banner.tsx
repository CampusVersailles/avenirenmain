import Video from "../Video/Video"
import styles from "./Banner.module.css"

const Banner = () => {
  return (
    <div className={styles.banner}>
      <div>
        <h1>Explore les métiers de l'artisanat</h1>
        <p className={styles.text}>
          L'artisanat et le patrimoine, c'est plus d'une centaine de métiers qui ont du sens et de l'avenir. Explore-les
          selon tes centres d'intérêt et trouve ta formation partout en France grâce à notre réseau d'écoles
          partenaires. Besoin d'inspiration ? Laisse-toi guider par notre quiz pour découvrir les métiers qui sont faits
          pour toi !
        </p>
      </div>
      <Video className={styles.video} src='/videos/main.mp4' />
    </div>
  )
}

export default Banner
