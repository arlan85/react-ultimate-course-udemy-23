import { connect } from "react-redux";
function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay({balance}) {
  return <div className="balance">{formatCurrency(balance || 0)}</div>;
}
 // OLD WAY before hooks this is the way to get the state from the store, we can use connect function to connect the component to the store, and we can use it in any component that is wrapped by the Provider component
function mapStateToProps(store) {
  return {
    balance: store.account.balance.amount,
  };
}

export default connect(mapStateToProps)(BalanceDisplay);
