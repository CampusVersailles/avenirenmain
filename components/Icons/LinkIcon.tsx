import classNames from "classnames"

const LinkIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={classNames("lucide lucide-move-right-icon lucide-move-right", className)}>
    <path d='M18 8L22 12L18 16' />
    <path d='M2 12H22' />
  </svg>
)

export default LinkIcon
