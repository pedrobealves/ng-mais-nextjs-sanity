interface AuthorProps {
  name: string
  bio: string
}

export default function AuthorBio({ name, bio }: AuthorProps) {
  return (
    <div className="flex w-full flex-col items-start justify-center gap-1 self-stretch">
      <p className="text-center text-lg md:text-1xl font-bold leading-7.3 md:leading-9">
        {name}
      </p>
      {bio && (
        <p className="text-left text-lg md:text-1xl font-normal leading-7 md:leading-7.5">
          {bio}
        </p>
      )}
    </div>
  )
}
