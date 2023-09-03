import { Review } from 'lib/sanity.queries'
import { useState } from 'react'

import { Card } from './Card'

type TopProps = {
  games: Review[]
}

export function Top({ games }: TopProps) {
  // State for storing the selected option. Default is "Male"
  const [selectedOption, setSelectedOption] = useState('game0')

  // Function to handle the change in radio button selection
  function onValueChange(event) {
    // Updating the state with the selected radio button's value
    setSelectedOption(event.target.value)
  }

  return (
    <section className="flex flex-col gap-6 w-full">
      <div className="flex justify-start items-center gap-4">
        <div className="w-2 h-9 bg-primary-5 rounded-tr-[5px] rounded-br-[5px]"></div>
        <div className="text-center text-primary-5 text-2xl font-extrabold leading-loose">
          Top Jogos
        </div>
      </div>
      <div className="pl-6">
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
              title={item.game.title}
              cover={item.game.cover}
              grade={item.grade}
              developer={item.game.developer}
              release={item.game.release}
              genre={item.game.genre}
              slug={item.slug}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}
