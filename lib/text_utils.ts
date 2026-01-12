import { BlocksContent } from "@strapi/blocks-react-renderer"

export function replaceNewlinesInBlocks(content: BlocksContent): BlocksContent {
  return content.map((block) => processNode(block)) as BlocksContent
}

function isObj(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null
}

function isTextNode(x: unknown): x is { type: "text"; text: string } {
  return isObj(x) && x.type === "text" && typeof x.text === "string"
}

function hasArrayProp<T extends string>(x: unknown, prop: T): x is Record<T, unknown[]> & Record<string, unknown> {
  return isObj(x) && Array.isArray(x[prop])
}

function processNode<T>(node: T): T {
  if (isTextNode(node)) {
    return {
      ...node,
      text: node.text.replace(/\\n/g, "\n"),
    } as T
  }

  if (hasArrayProp(node, "children")) {
    return {
      ...node,
      children: node.children.map(processNode),
    } as T
  }

  if (hasArrayProp(node, "value")) {
    return {
      ...node,
      value: node.value.map(processNode),
    } as T
  }

  return node
}

export function isBlocksContentEmpty(content: BlocksContent | null | undefined): boolean {
  if (!content || content.length === 0) {
    return true
  }

  const hasText = (node: unknown): boolean => {
    if (isTextNode(node)) {
      return node.text.trim() !== ""
    }

    if (hasArrayProp(node, "children")) {
      return node.children.some(hasText)
    }

    if (hasArrayProp(node, "value")) {
      return node.value.some(hasText)
    }

    return false
  }

  return !content.some(hasText)
}
