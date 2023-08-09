/* eslint-disable @next/next/no-html-link-for-pages */
import Container from 'components/BlogContainer'

export default function Alert({
  preview,
  loading,
}: {
  preview?: boolean
  loading?: boolean
}) {
  if (!preview) return null

  return (
    <div
      className={`${
        loading ? 'animate-pulse' : ''
      } z-50 absolute border-b w-full border-accent-7 bg-accent-7 text-white`}
    >
      <Container>
        <div className="py-2 text-center text-sm">
          {'Previewing draft content. '}
          <a
            href="/api/exit-preview"
            className="underline transition-colors duration-200 hover:text-cyan"
          >
            Exit draft mode
          </a>
        </div>
      </Container>
    </div>
  )
}
