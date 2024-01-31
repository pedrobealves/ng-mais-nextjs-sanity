import { Section } from 'components/Section'
import { Post } from 'lib/sanity.queries'
import { useState } from 'react'

import { Card } from './Card'

type TopProps = {
  games: Post[]
}

export function HomeTopList({ games }: TopProps) {
  // State for storing the selected option. Default is "Male"
  const [selectedOption, setSelectedOption] = useState('game0')

  // Function to handle the change in radio button selection
  function onValueChange(event) {
    // Updating the state with the selected radio button's value
    setSelectedOption(event.target.value)
  }

  return (
    <Section.Root>
      <Section.Title>Top Jogos</Section.Title>
      <Section.Container>
        <div className="bg-white rounded-[20px] pl-5 pr-4 pt-4">
          <ul className="flex flex-col">
            {games.map((item, index) => (
              <Card
                key={index}
                input={
                  <input
                    id={'game' + index}
                    value={'game' + index}
                    className="peer hidden"
                    type="radio"
                    name="top"
                    checked={selectedOption === 'game' + index}
                    onChange={onValueChange}
                  />
                }
                index={index}
                title={item.game?.title}
                cover={item.game?.cover}
                grade={item.grade}
                developer={item.game?.developer}
                release={item.game?.release}
                genre={item.game?.genre}
                slug={item.slug}
              />
            ))}
          </ul>
        </div>
      </Section.Container>
    </Section.Root>
  )
}
