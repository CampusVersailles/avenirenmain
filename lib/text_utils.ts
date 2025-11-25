import { BlocksContent } from "@strapi/blocks-react-renderer"

export function replaceNewlinesInBlocks(content: BlocksContent): BlocksContent {
  return content.map((block) => processBlock(block))
}

function processBlock(block: any): any {
  if (block.type === "text" && typeof block.text === "string") {
    console.log(block.text)
    return {
      ...block,
      text: block.text.replace(/\\n/g, "\n"),
    }
  }

  if (Array.isArray(block.children)) {
    return {
      ...block,
      children: block.children.map((child: any) => processBlock(child)),
    }
  }

  if (Array.isArray(block.value)) {
    return {
      ...block,
      value: block.value.map((v: any) => processBlock(v)),
    }
  }

  return block
}
