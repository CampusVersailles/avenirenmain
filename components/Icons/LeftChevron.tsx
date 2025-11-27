import classNames from "classnames"

const LeftChevronIcon = ({ className }: { className?: string }) => (
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
    className={classNames("lucide lucide-circle-chevron-left-icon lucide-circle-chevron-left", className)}>
    <circle cx='12' cy='12' r='10' />
    <path d='m14 16-4-4 4-4' />
  </svg>
)

export default LeftChevronIcon
