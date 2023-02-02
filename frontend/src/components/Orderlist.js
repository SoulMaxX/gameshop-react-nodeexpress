const Orderlist = (props) => {
    const { order } = props
    const date = new Date(order.createdAt)
    const dateformat = new Intl.DateTimeFormat('en-GB',{dateStyle: 'full'}).format(date)
    const handleClick =()=>{
        localStorage.setItem('orderid',order.orderid)
    }
    // console.log(order.Orderstatus)
    return <tr>
        <td> <a href="/orderdetail" onClick={handleClick}>{order.orderid}</a></td>
        <td>{dateformat}</td>
        <td>{order.fullname}</td>
        <td>{order.address}</td>
        <td>${order.totalprice}</td>
        <td>{!order.Orderstatus? '': order.Orderstatus.status}</td>
    </tr>
           
}
export default Orderlist