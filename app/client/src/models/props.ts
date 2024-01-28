import {
  ComponentProps,
  ForwardRefExoticComponent,
  RefAttributes,
  SVGProps
} from "react"

export interface PostModalItemProps {
  onClose: () => void
}

export interface LogosProps {
  width?: number | string
  height?: number | string
  className?: string
}

export interface CardProps
  extends Omit<ComponentProps<"div">, "className" | "children"> {
  title: string
  description: string
  Icon: ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, "ref"> & {
      title?: string | undefined
      titleId?: string | undefined
    } & RefAttributes<SVGSVGElement>
  >
  href: string
}


export interface ModalProps {
  isOpen: boolean
  closeModal: () => void
  children?: React.ReactNode
}