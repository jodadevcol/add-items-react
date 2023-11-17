import React, { useState } from 'react'
import './App.css'

type ItemID = `${string}-${string}-${string}-${string}-${string}`

interface Item {
  id: ItemID,
  timestamp: number,
  title: string
}

const INITIAL_ITEMS: Item[] = [
  {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    title: 'Planear vacaciones'
  },
  {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    title: 'Compra de detalles'
  },
  {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    title: 'Videojuegos'
  }
]

function App() {
  const [items, setItems] = useState(INITIAL_ITEMS)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { elements } = event.currentTarget
    const valueItem = elements.namedItem('inputList')
    const isInput = valueItem instanceof HTMLInputElement
    if (!isInput || isInput == null) return

    const newItem: Item = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      title: valueItem.value
    }

    setItems((prevItems) => {
      return [...prevItems, newItem]
    })

    valueItem.value = ''
  }

  const createHandleRemoveItem = (id: ItemID) => () => {
    setItems((prevItems) => {
      return prevItems.filter(currentItem => currentItem.id !== id)
    })
  }

  return (
    <>
      <header>
        <h1>Prueba técnica</h1>
        <h2>Añadir y eliminar elementos de una lista</h2>
      </header>

      <main>
        <aside>
          <form onSubmit={handleSubmit}>
            <label htmlFor='inputList'>
              Write element:
              <input type='text' name='inputList' required placeholder='Videojuegos' />
            </label>

            <button>Add element to list</button>
          </form>
        </aside>

        <section>
          <ul>
            {
              items.map((item) => {
                return (
                  <li key={item.id}>
                    {item.title}

                    <button onClick={createHandleRemoveItem(item.id)}>Remove</button>
                  </li>
                )
              })
            }
          </ul>
        </section>
      </main>
    </>
  )
}

export default App
