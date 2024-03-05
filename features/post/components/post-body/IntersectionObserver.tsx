import { InView } from 'react-intersection-observer'

type IntersectionObserverProps = {
  children: React.ReactNode
}

export function IntersectionObserver({ children }: IntersectionObserverProps) {
  return (
    <InView triggerOnce rootMargin="400px">
      {({ inView, ref }) => <div ref={ref}>{inView && children}</div>}
    </InView>
  )
}
