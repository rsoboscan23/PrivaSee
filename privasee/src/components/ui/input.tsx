import { forwardRef, type InputHTMLAttributes } from 'react'

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cx(
          'w-full rounded-xl border border-[#2a3a4e] bg-[#0f1822] px-4 py-2.5 text-sm text-[#eaf0f7] placeholder:text-[#607089] focus:outline-none focus:ring-2 focus:ring-[#14d9b3]/60',
          className,
        )}
        {...props}
      />
    )
  },
)

Input.displayName = 'Input'

export { Input }
