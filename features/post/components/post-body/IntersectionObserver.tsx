import { InView } from 'react-intersection-observer'

type IntersectionObserverProps = {
  children: React.ReactNode
}

export function IntersectionObserver({ children }: IntersectionObserverProps) {
  return (
    <InView triggerOnce threshold={0.0}>
      {({ inView, ref }) => <div ref={ref}>{inView && children}</div>}
    </InView>
  )
}
