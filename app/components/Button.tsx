interface Props {
  children: React.ReactNode
  type?: 'button' | 'submit'
  onClick?: () => void
}

export default function Button({ children, type = 'submit', onClick }: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className='mt-3 rounded bg-green-400 px-4 py-2 font-bold text-white hover:bg-green-700'
    >
      {children}
    </button>
  )
}
