import { getFormations } from "@/strapi/formations"
import FormationsPage from "@/views/FormationsPage"

const Formations = async () => {
  const formations = await getFormations()
  return <FormationsPage formations={formations} />
}

export default Formations
