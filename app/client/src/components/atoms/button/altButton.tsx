import { ComponentProps, forwardRef } from "react"

const AltButton = forwardRef<
  HTMLButtonElement,
  Omit<ComponentProps<"button">, "className">
>(({ children, ...rest }, ref) => {
  return (
    <button
      ref={ref}
      className="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center "
      {...rest}
    >
      {children}
    </button>
  )
})

export default AltButton
