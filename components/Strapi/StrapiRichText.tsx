import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer"
import classNames from "classnames"
import styles from "./StrapiRichText.module.css"
import { replaceNewlinesInBlocks } from "@/lib/text_utils"

export default function StrapiRichText({
  content,
  className,
  noLink,
}: {
  content: BlocksContent
  className?: string
  noLink?: boolean
}) {
  return (
    <div className={classNames(styles.strapiRichText, className)}>
      {content && (
        <BlocksRenderer
          content={replaceNewlinesInBlocks(content)}
          blocks={noLink ? { link: ({ children }) => <span>{children}</span> } : undefined}
        />
      )}
    </div>
  )
}
