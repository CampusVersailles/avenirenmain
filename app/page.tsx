import { getMetiers } from "@/strapi/metier"
import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer"

export function JobCard({ title, description }: { title: string; description: BlocksContent }) {
  return (
    <div>
      <h3
        style={{
          margin: "0 0 8px 0",
          fontSize: "18px",
          textDecoration: "underline",
          paddingLeft: "24px",
          paddingBottom: "8px",
        }}>
        {title}
      </h3>
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "16px",
          maxWidth: "800px",
          background: "#fff",
          width: "100%",
        }}>
        <BlocksRenderer content={description} />
      </div>
    </div>
  )
}

export default async function Home() {
  const metiers = await getMetiers()
  console.log(metiers)
  return (
    <div style={{ width: "100%", height: "100vh", backgroundColor: "#f0f0f0" }}>
      <main style={{ maxWidth: "800px", margin: "0 auto", justifyContent: "center", alignItems: "center" }}>
        <h1
          style={{
            textAlign: "center",
            fontSize: "40px",
            fontWeight: "600",
            lineHeight: "48px",
            letterSpacing: "-2.4px",
            textWrap: "balance",
            color: "#000",
          }}>
          Métiers
        </h1>
        <ul style={{ width: "100%", display: "flex", flexDirection: "column", gap: "24px", padding: "24px" }}>
          {metiers.map((metier) => (
            <JobCard key={metier.Titre} title={metier.Titre} description={metier.Description} />
          ))}
        </ul>
      </main>
    </div>
  )
}
