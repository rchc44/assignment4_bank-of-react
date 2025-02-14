// src/components/Debits.js

import AccountBalance from "./AccountBalance";

const Debits = (props) => {
	console.log(props);
	let debitsView = () => {
    const { debits } = props;
    return debits.map((debit) => {
      let date = debit.date.slice(0,10);
      return <li key={debit.id}>{debit.amount} {debit.description} {date}</li>
    }) 
  }
  return (
    <div>
      <h1>Debits</h1>
      {debitsView()}
      <form onSubmit={props.addDebit}>
        Description: <input type="text" name="description" />
        Amount: <input type="number" name="amount" />
        <button type="submit">Add Debit</button>
      </form>
	  <br/>
	  <AccountBalance accountBalance={props.accountBalance}/>
    </div>
  )
}

export default Debits;