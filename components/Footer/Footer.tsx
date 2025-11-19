import Link from "next/link"

const Footer = () => {
  return (
    <footer id='footer' role='contentinfo' tabIndex={-1}>
      Propulsé par{" "}
      <Link prefetch={false} href='' target='_blank' rel='noreferrer noopener'>
        le campus Versailles
      </Link>{" "}
      avec le soutien de France 2030
    </footer>
  )
}

export default Footer
