import React, {useState} from "react";

const PharmasiDashboard = () => {

const [menu,setMenu]=useState("home");
const [type,setType]=useState("");
const [medicine,setMedicine]=useState("");
const [qty,setQty]=useState("");
const [expiry,setExpiry]=useState("");

const [items,setItems]=useState([]);

const addMedicine = ()=>{

if(!type || !medicine || !qty || !expiry){
alert("Fill all fields");
return;
}

setItems([
...items,
{
type,
medicine,
qty,
expiry
}
]);

setType("");
setMedicine("");
setQty("");
setExpiry("");

};

return(

<div className="min-h-screen bg-gray-100">

{/* MAIN SECTION */}

<div className="flex">

{/* SIDEBAR */}

<div className="w-64 bg-blue-600 text-white h-screen pt-2 px-6 hidden md:block ">

<ul className="space-y-8 text-xl">

<li onClick={()=>setMenu("home")} className="cursor-pointer">
Home
</li>

<li onClick={()=>setMenu("inventory")} className="cursor-pointer">
Inventory
</li>

<li onClick={()=>setMenu("purchase")} className="cursor-pointer">
Purchase
</li>

<li onClick={()=>setMenu("sales")} className="cursor-pointer">
Sales
</li>

</ul>

</div>


{/* MOBILE MENU */}

<div className="md:hidden fixed bottom-0 left-0 right-0 bg-blue-600 text-white flex
justify-around py-4 z-50">

<button onClick={()=>setMenu("home")}>
Home
</button>

<button onClick={()=>setMenu("inventory")}>
Inventory
</button>

<button onClick={()=>setMenu("purchase")}>
Purchase
</button>

<button onClick={()=>setMenu("sales")}>
Sales
</button>

</div>



{/* CONTENT AREA */}

<div className="flex-1 p-8">

{menu==="home" &&(

<div>

<h2 className="text-3xl font-bold mb-6">
Home
</h2>

<div className="grid md:grid-cols-3 gap-6">

<div className="bg-white rounded-xl shadow p-8">
Total Medicines
<h3 className="text-4xl mt-4 font-bold">
250
</h3>
</div>

<div className="bg-white rounded-xl shadow p-8">
Low Stock
<h3 className="text-4xl mt-4 font-bold">
12
</h3>
</div>

<div className="bg-white rounded-xl shadow p-8">
Sales Today
<h3 className="text-4xl mt-4 font-bold">
₹ 8,500
</h3>
</div>

</div>

</div>

)}



{menu==="inventory" &&(

<div>

<h2 className="text-3xl font-bold mb-6">
Inventory
</h2>

{/* Add Item Box */}

<div className="bg-white rounded-2xl shadow p-8 mb-8">

<h3 className="text-2xl font-bold mb-6">
Add Item
</h3>

<div className="grid md:grid-cols-4 gap-4">

<select
value={type}
onChange={(e)=>setType(e.target.value)}
className="border p-3 rounded-xl"
>
<option value="">Select Type</option>
<option value="Danik">Danik</option>
<option value="Kalimbu">Kalimbu</option>
<option value="Tablet">Tablet</option>
</select>

<input
type="text"
placeholder="Medicine Name"
value={medicine}
onChange={(e)=>setMedicine(e.target.value)}
className="border p-3 rounded-xl"
/>

<input
type="number"
placeholder="Qty"
value={qty}
onChange={(e)=>setQty(e.target.value)}
className="border p-3 rounded-xl"
/>

<input
type="text"
placeholder="Expiry"
value={expiry}
onChange={(e)=>setExpiry(e.target.value)}
className="border p-3 rounded-xl"
/>

</div>

<button
onClick={addMedicine}
className="mt-6 bg-green-500 text-white px-6 py-3 rounded-xl"
>
Add Item
</button>

</div>



{/* Table */}

<div className="bg-white rounded-2xl shadow p-6">

<table className="w-full">

<thead>
<tr className="border-b text-left">
<th>Type</th>
<th>Medicine</th>
<th>Qty</th>
<th>Expiry</th>
</tr>
</thead>

<tbody>

{items.map((item,index)=>(

<tr key={index} className="border-b">
<td>{item.type}</td>
<td>{item.medicine}</td>
<td>{item.qty}</td>
<td>{item.expiry}</td>
</tr>

))}

</tbody>

</table>

</div>

</div>

)}



{menu==="purchase" &&(

<div>

<h2 className="text-3xl font-bold mb-6">
Purchase
</h2>

<div className="bg-white rounded-xl shadow p-6">

<input
placeholder="Supplier Name"
className="border p-3 rounded w-full mb-4"
/>

<input
placeholder="Medicine Name"
className="border p-3 rounded w-full mb-4"
/>

<button className="
bg-blue-600
text-white
px-6
py-3
rounded">
Save Purchase
</button>

</div>

</div>

)}



{menu==="sales" &&(

<div>

<h2 className="text-3xl font-bold mb-6">
Sales
</h2>

<div className="bg-white rounded-xl shadow p-6">

<input placeholder="Customer Name" className="border p-3 rounded w-full mb-4"/>

<input placeholder="Medicine" className="border p-3 rounded w-full mb-4"/>

<button className="bg-green-500 text-white px-6 py-3 rounded">
Create Bill
</button>

</div>

</div>

)}

</div>

</div>

</div>

)

}

export default PharmasiDashboard