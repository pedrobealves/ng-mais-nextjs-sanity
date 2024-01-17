import { Review } from 'lib/sanity.queries'
import { FaCheck, FaXmark } from 'react-icons/fa6'
import { IconContext } from 'react-icons/lib'

import { Card } from './Card'

type ReviewProps = {
  review: Review
}

export function Review({ review }: ReviewProps) {
  return (
    <>
      <Card.Root>
        {review.grade && <Card.Grade grade={review.grade} />}
        <Card.ContainerDetail>
          <IconContext.Provider value={{ size: '24' }}>
            {review.pros && (
              <div className="flex flex-1 self-stretch flex-col justify-start items-center gap-7">
                <Card.DividerDetail color="pros" />
                <div className="flex items-center">
                  <div className="self-stretch flex-col items-start gap-3.5 flex">
                    {review.pros?.map((pro, index) => (
                      <Card.Detail
                        key={index}
                        text={pro}
                        color="pros"
                        icon={FaCheck}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            {review.cons && (
              <div className="flex flex-1 self-stretch flex-col justify-start items-center gap-7">
                <Card.DividerDetail color="cons" />
                <div className="flex items-center">
                  <div className="self-stretch flex-col items-start gap-3.5 flex">
                    {review.cons?.map((con, index) => (
                      <Card.Detail
                        key={index}
                        text={con}
                        color="cons"
                        icon={FaXmark}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </IconContext.Provider>
        </Card.ContainerDetail>
        {review.verdict && <Card.Verdict verdict={review.verdict} />}
      </Card.Root>
    </>
  )
}
