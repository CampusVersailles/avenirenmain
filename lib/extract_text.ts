export const extractNodeText = (node: unknown): string => {
  if (!node || typeof node !== "object") {
    return ""
  }

  const typedNode = node as { text?: unknown; children?: unknown[] }
  const ownText = typeof typedNode.text === "string" ? typedNode.text : ""
  const childrenText = Array.isArray(typedNode.children)
    ? typedNode.children.map((child) => extractNodeText(child)).join(" ")
    : ""

  return [ownText, childrenText].filter(Boolean).join(" ").trim()
}
