import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  title: string
  description: string
  className?: string
}

export function SectionHeading({ title, description, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-8", className)}>
      <h2 className="text-3xl font-bold md:text-4xl">{title}</h2>
      <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p>
    </div>
  )
}
