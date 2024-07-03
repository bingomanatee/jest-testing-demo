
export default function Buyable( props ) {
  const {id, name, handleBuy, children} = props
  return <div className='product'>
    <h3>{name}</h3>
    {children}
    <button type='button' onClick={ () => handleBuy(props)}>Add to Cart</button>
  </div>
}