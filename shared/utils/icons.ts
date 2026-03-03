import * as Icons from 'lucide-react'
import { type LucideIcon } from 'lucide-react'
import { createElement, SVGProps } from 'react'

export type IconName = keyof typeof Icons

export function DynamicIcon({
  name,
  ...props
}: { name: string } & SVGProps<SVGSVGElement>) {
  const IconComponent =
    (Icons[name as IconName] as LucideIcon) ?? Icons.FolderIcon
  return createElement(IconComponent, props)
}
