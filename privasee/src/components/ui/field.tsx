import type { HTMLAttributes, LabelHTMLAttributes } from 'react'

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

function FieldSet({ className, ...props }: HTMLAttributes<HTMLFieldSetElement>) {
  return <fieldset className={cx('space-y-2', className)} {...props} />
}

function FieldLegend({ className, ...props }: HTMLAttributes<HTMLLegendElement>) {
  return <legend className={cx('text-base font-semibold text-[#eaf0f7]', className)} {...props} />
}

function FieldGroup({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('space-y-5', className)} {...props} />
}

function Field({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('space-y-1.5', className)} role="group" {...props} />
}

function FieldLabel({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cx('block text-sm font-medium text-[#b5c0d1]', className)} {...props} />
}

function FieldDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cx('text-xs text-[#748399]', className)} {...props} />
}

function FieldError({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cx('text-xs text-red-300', className)} {...props} />
}

export { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet }
