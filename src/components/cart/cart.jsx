import {timestamp} from "../app/timestamp";

export function Cart({items}) {

  return (
    <section>
      <hr />
      <h2>Shopping cart {timestamp()}</h2>
      <ul>
        {items.map((i) => {
          return <li key={i.id}>{i.name}</li>
        })}
      </ul>
    </section>
  )
}