import * as React from 'react'
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react'

type CarouselApi = UseEmblaCarouselType[1]
type CarouselOptions = Parameters<typeof useEmblaCarousel>[0]

type CarouselProps = {
  opts?: CarouselOptions
  setApi?: (api: CarouselApi) => void
  className?: string
  children: React.ReactNode
}

type CarouselContextValue = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: CarouselApi
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
}

const CarouselContext = React.createContext<CarouselContextValue | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) {
    throw new Error('Carousel components must be used inside <Carousel>.')
  }
  return context
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

function Carousel({ opts, setApi, className, children }: CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(opts)
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const onSelect = React.useCallback((emblaApi: CarouselApi) => {
    if (!emblaApi) return
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [])

  const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api])
  const scrollNext = React.useCallback(() => api?.scrollNext(), [api])

  React.useEffect(() => {
    if (!api) return
    setApi?.(api)
    onSelect(api)
    api.on('select', onSelect)
    api.on('reInit', onSelect)
    return () => {
      api.off('select', onSelect)
      api.off('reInit', onSelect)
    }
  }, [api, onSelect, setApi])

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div className={cx('relative', className)}>{children}</div>
    </CarouselContext.Provider>
  )
}

function CarouselContent({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  const { carouselRef } = useCarousel()
  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div className={cx('flex touch-pan-y -ml-0', className)}>{children}</div>
    </div>
  )
}

function CarouselItem({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('min-w-0 shrink-0 grow-0 basis-full pl-0', className)}>{children}</div>
}

function CarouselPrevious({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { scrollPrev, canScrollPrev } = useCarousel()
  return (
    <button
      type="button"
      onClick={scrollPrev}
      disabled={!canScrollPrev}
      className={cx(
        'rounded-lg border border-[#2a3a4e] px-4 py-2 text-xs font-medium text-[#8e9bb1] transition hover:border-[#3d526b] hover:text-[#a7b4c8] disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}

function CarouselNext({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { scrollNext, canScrollNext } = useCarousel()
  return (
    <button
      type="button"
      onClick={scrollNext}
      disabled={!canScrollNext}
      className={cx(
        'rounded-lg bg-[#14d9b3] px-4 py-2 text-xs font-semibold text-[#031914] transition hover:bg-[#26e9c3] disabled:cursor-not-allowed disabled:bg-[#355b56] disabled:text-[#9abdb6]',
        className,
      )}
      {...props}
    />
  )
}

export type { CarouselApi }
export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext }
