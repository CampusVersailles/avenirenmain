import classNames from "classnames"

const DownChevronIcon = ({ className }: { className?: string }) => (
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
    className={classNames("lucide lucide-chevron-down-icon lucide-chevron-down", className)}>
    <path d='m6 9 6 6 6-6' />
  </svg>
)

export default DownChevronIcon
