const Orderlist = (props) => {
    const { order } = props
    const date = new Date(order.createdAt)
    const dateformat = new Intl.DateTimeFormat('en-GB',{dateStyle: 'full'}).format(date)
    const handlerClick =()=>{
        localStorage.setItem('orderid',order.orderid)
    }
    return <tr>
        <td> <a href="/orderdetail" onClick={handlerClick}>{order.orderid}</a></td>
        <td>{dateformat}</td>
        <td>{order.fullname}</td>
        <td>{order.address}</td>
        <td>${order.totalprice}</td>
    </tr>
           
}
export default Orderlist