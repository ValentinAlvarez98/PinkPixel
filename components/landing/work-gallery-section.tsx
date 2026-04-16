import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { WorkProject } from "@/lib/landing-data"
import { SectionHeading } from "./section-heading"

type WorkGallerySectionProps = {
  projects: WorkProject[]
  onOpenProject: (projectId: string) => void
}

export function WorkGallerySection({ projects, onOpenProject }: WorkGallerySectionProps) {
  return (
    <section id="galeria" className="bg-muted/35 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          title="Trabajos reales"
          description="Elegi un trabajo, abrilo en grande y recorre cada foto para ver texturas, terminaciones y detalles reales."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden border-border/80 bg-card">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={project.coverSrc}
                  alt={`${project.title} portada`}
                  fill
                  quality={60}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription>{project.summary}</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between gap-3">
                <p className="text-xs font-medium text-muted-foreground">{project.images.length} fotos</p>
                <Button onClick={() => onOpenProject(project.id)}>Abrir visor</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
