import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer"
import classNames from "classnames"
import styles from "./StrapiRichText.module.css"
import { replaceNewlinesInBlocks } from "@/lib/text_utils"

export default function StrapiRichText({ content, className }: { content: BlocksContent; className?: string }) {
  return (
    <div className={classNames(styles.strapiRichText, className)}>
      <BlocksRenderer content={replaceNewlinesInBlocks(content)} />
    </div>
  )
}
