const AwardIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width='20'
      height='20'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <circle cx='12' cy='8' r='6' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
      <path
        d='M15.5 13l1.5 8 -5-3 -5 3 1.5-8'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default AwardIcon
