import Image from "next/image"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import type { WorkProject } from "@/lib/landing-data"

type WorkLightboxProps = {
  open: boolean
  activeProject: WorkProject | null
  activeIndex: number
  onClose: () => void
  onSelectImage: (index: number) => void
  onPrev: () => void
  onNext: () => void
}

export function WorkLightbox({
  open,
  activeProject,
  activeIndex,
  onClose,
  onSelectImage,
  onPrev,
  onNext,
}: WorkLightboxProps) {
  const activeImage = activeProject?.images[activeIndex] ?? null

  return (
    <Dialog open={open} onOpenChange={(state) => !state && onClose()}>
      <DialogContent className="h-[96vh] w-[98vw] max-w-[1700px] overflow-hidden border-white/20 bg-neutral-950 p-0 sm:max-w-[98vw]">
        {activeProject && activeImage && (
          <div className="grid h-full grid-rows-[auto_1fr_auto] md:grid-cols-[120px_1fr] md:grid-rows-[auto_1fr]">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 md:col-span-2">
              <DialogTitle className="text-sm font-semibold text-white md:text-base">{activeProject.title}</DialogTitle>
              <p className="text-xs text-white/75">
                {activeIndex + 1} / {activeProject.images.length}
              </p>
            </div>

            <aside className="hidden border-r border-white/10 bg-black/35 p-3 md:flex md:flex-col md:gap-2 md:overflow-y-auto">
              {activeProject.images.map((image, index) => (
                <button
                  key={`${image.thumbSrc}-desktop`}
                  type="button"
                  onClick={() => onSelectImage(index)}
                  className={`relative h-20 w-full overflow-hidden rounded-lg border transition ${
                    activeIndex === index ? "border-primary" : "border-white/25"
                  }`}
                  aria-label={`Ver imagen ${index + 1}`}
                >
                  <Image src={image.thumbSrc} alt={image.alt} fill className="object-cover" sizes="120px" quality={45} />
                </button>
              ))}
            </aside>

            <div className="relative flex min-h-0 items-center justify-center bg-black md:row-start-2 md:col-start-2">
              <Image src={activeImage.fullSrc} alt={activeImage.alt} fill quality={76} className="object-contain p-4 md:p-6" sizes="90vw" />

              {activeProject.images.length > 1 && (
                <>
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    className="absolute left-4 top-1/2 z-20 -translate-y-1/2 border-white/35 bg-black/55 text-white hover:bg-black/80"
                    onClick={onPrev}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    className="absolute right-4 top-1/2 z-20 -translate-y-1/2 border-white/35 bg-black/55 text-white hover:bg-black/80"
                    onClick={onNext}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </>
              )}
            </div>

            <div className="flex gap-2 overflow-x-auto border-t border-white/10 bg-black/35 p-3 md:hidden">
              {activeProject.images.map((image, index) => (
                <button
                  key={`${image.thumbSrc}-mobile`}
                  type="button"
                  onClick={() => onSelectImage(index)}
                  className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-md border ${
                    activeIndex === index ? "border-primary" : "border-white/20"
                  }`}
                  aria-label={`Ver imagen ${index + 1}`}
                >
                  <Image src={image.thumbSrc} alt={image.alt} fill className="object-cover" sizes="64px" quality={45} />
                </button>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
