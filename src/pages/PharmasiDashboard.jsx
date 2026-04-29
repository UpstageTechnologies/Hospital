import React,{useState,useEffect} from "react";
const PharmasiDashboard=()=>{

const [menu,setMenu]=useState("inventory");
const [activeCategory,setActiveCategory]=useState("All");
const [editIndex,setEditIndex]=useState(null);
const [type,setType]=useState("");
const [subCategory,setSubCategory]=useState("");
const [medicine,setMedicine]=useState("");
const [qty,setQty]=useState("");
const [purchasePrice,setPurchasePrice]=useState("");
const [salesPrice,setSalesPrice]=useState("");
const [showTypeDropdown,setShowTypeDropdown]=useState(false);
const [showMedicineDropdown,setShowMedicineDropdown]=useState(false);

const [typeOptions,setTypeOptions]=useState([
    "Tablet",
    "Injection",
    "Capsule",
    "Syrup",
    "Drops",
    "Ointment",
    "Inhaler",
    "MedicalConsumables"
    ]);
    
    const [medicineOptions,setMedicineOptions]=useState([
    "Paracetamol",
    "Amoxicillin",
    "Azithromycin",
    "Cetirizine"
    ]);

const [items,setItems]=useState(()=>{
    const saved=localStorage.getItem("pharmacyItems");
    return saved ? JSON.parse(saved) : [];
    });

    const [entryItems,setEntryItems] = useState(()=>{
        const saved = localStorage.getItem("entryItems");
        return saved ? JSON.parse(saved) : [];
        });

    useEffect(()=>{

        localStorage.setItem(
        "pharmacyItems",
        JSON.stringify(items)
        );
        
        },[items]);

        useEffect(()=>{

            localStorage.setItem(
            "entryItems",
            JSON.stringify(entryItems)
            );
            
            },[entryItems]);

const categoryMap={

Tablet:[
"Paracetamol",
"Amoxicillin",
"Azithromycin",
"Cetirizine",
"Metformin",
"Aspirin",
"Vitamin C",
"Ibuprofen"
],

Injection:[
"Insulin",
"Tetanus Injection",
"Diclofenac Injection",
"Ceftriaxone",
"Vitamin B12",
"Rabies Vaccine"
],

Capsule:[
"Omeprazole",
"Doxycycline",
"Amoxicillin Capsule",
"Multivitamin Capsule"
],

Syrup:[
"Cough Syrup",
"Paracetamol Syrup",
"Antacid Syrup",
"Iron Tonic"
],

Drops:[
"Eye Drops",
"Ear Drops",
"Nasal Drops",
"Pediatric Drops"
],

Ointment:[
"Pain Relief Ointment",
"Burn Cream",
"Antifungal Cream",
"Skin Ointment"
],

Inhaler:[
"Asthma Inhaler",
"Salbutamol",
"Steroid Inhaler"
],

MedicalConsumables:[
"Syringe",
"Gloves",
"Cotton",
"Bandage",
"Mask"
]

};


const addMedicine=()=>{

    if(
    !type||
    !subCategory||
    !qty||
    !purchasePrice||
    !salesPrice
    ){
    alert("Fill all fields");
    return;
    }
    
    const data={
        id:Date.now(),
        type,
        subCategory,
        medicine,
        qty,
        purchasePrice,
        salesPrice
        };
    
    if(editIndex!==null){
    
    const updated=[...items];
    updated[editIndex]=data;
    setItems(updated);
    setEditIndex(null);
    
    }else{
    
    setItems([...items,data]);
    
    }
    
    setType("");
    setSubCategory("");
    setMedicine("");
    setQty("");
    setPurchasePrice("");
    setSalesPrice("");
    
    };

    const addEntrySale = ()=>{

        if(!type || !medicine || !qty){
        alert("Fill all fields");
        return;
        }
        
        const inventoryItem = items.find(
        item =>
        item.type===type &&
        (item.subCategory===medicine || item.medicine===medicine)
        );
        
        if(!inventoryItem){
        alert("Medicine not found in inventory");
        return;
        }
        
        const unitPrice =
Number(inventoryItem.salesPrice) /
Number(inventoryItem.qty);

const totalSales =
unitPrice * Number(qty);
        
        const saleData = {
        id:Date.now(),
        type,
        medicine,
        qty,
        purchasePrice: inventoryItem.purchasePrice,
        salesPrice: totalSales
        };
        
        setEntryItems([
        ...entryItems,
        saleData
        ]);
        
        setType("");
        setMedicine("");
        setQty("");
        setSalesPrice("");
        
        };
    const editItem=(index)=>{

        const item=items[index];
        
        setType(item.type);
        setSubCategory(item.subCategory);
        setMedicine(item.medicine);
        setQty(item.qty);
        setPurchasePrice(item.purchasePrice);
        setSalesPrice(item.salesPrice);
        
        setEditIndex(index);
        
        };

    const deleteItem=(index)=>{
        setItems(
        items.filter((_,i)=>i!==index)
        );
        };


return(
<div className="min-h-screen bg-gray-100">

<div className="flex">

<div className="w-64 bg-blue-600 text-white min-h-screen pt-8 px-6 hidden md:block">

<ul className="space-y-8 text-xl">

<li onClick={()=>setMenu("home")} className="cursor-pointer">
Home
</li>

<li onClick={()=>setMenu("inventory")} className="cursor-pointer">
Inventory
</li>

<li onClick={()=>setMenu("entries")} className="cursor-pointer">
Entries
</li>

</ul>

</div>



<div className="
md:hidden
fixed
bottom-0
left-0
right-0
z-50
bg-white
border-t
shadow-md
">

<div className="grid grid-cols-3 py-3 text-black">

<button
onClick={()=>setMenu("home")}
className="flex flex-col items-center gap-2"
>
<span className="text-2xl">🏠</span>
<span className="text-base font-medium">
Home
</span>
</button>

<button
onClick={()=>setMenu("inventory")}
className="flex flex-col items-center gap-2"
>
<span className="text-2xl">📦</span>
<span className="text-base font-medium">
Inventory
</span>
</button>

<button
onClick={()=>setMenu("entries")}
className="flex flex-col items-center gap-2"
>
<span className="text-2xl">📝</span>
<span className="text-base font-medium">
Entries
</span>
</button>

</div>
</div>


<div className="
flex-1
w-full
max-w-full
overflow-x-hidden
px-3 sm:px-4 md:p-6 lg:p-8
pb-24 md:pb-8
">


{menu==="inventory" &&(

<div>

<h2 className="text-4xl font-bold mb-6 ml-4 sm:ml-6 md:ml-0">
Inventory
</h2>



<div className="bg-white rounded-3xl shadow-md p-5 md:p-6 w-[86%] sm:w-[88%] md:w-full max-w-[680px]
ml-4 sm:ml-8 md:mx-auto mb-8">

<h3 className="text-2xl font-bold mb-4">
{activeCategory} Summary
</h3>

<p className="text-xl">
Total Sales:
₹{
items
.filter(item=>
activeCategory==="All"
? true
: item.type===activeCategory
)
.reduce(
(sum,item)=>
sum+
(Number(item.salesPrice||0)
*
Number(item.qty||0)),
0
)
}
</p>

</div>


{/* Add Item */}
<div className="bg-white rounded-3xl shadow-md p-5 md:p-6 w-[86%] sm:w-[88%] md:w-full max-w-[680px]
ml-4 sm:ml-8 md:mx-auto mb-8">
<h3 className="text-2xl font-bold mb-6">
Add Item
</h3>

<div className="
flex flex-col gap-4
sm:flex-col
md:grid md:grid-cols-2
lg:grid-cols-6
">


<div className="relative">

<input
value={type}
onChange={(e)=>{
setType(e.target.value);
setShowTypeDropdown(true);
setSubCategory("");
}}
onClick={()=>setShowTypeDropdown(true)}
placeholder="Select Type"
className="border px-4 py-3 text-lg rounded-xl w-full pr-10"
/>

<button
onClick={()=>setShowTypeDropdown(!showTypeDropdown)}
className="absolute right-5 top-1/2 -translate-y-1/2 text-2xl"
>
</button>

{showTypeDropdown && (
<div className="
absolute top-full left-0 mt-2
bg-white shadow-lg rounded-xl
w-full z-50 p-1
">

{[
"Tablet","Injection","Capsule","Syrup",
"Drops","Ointment","Inhaler","Medical Consumables"
]
.filter(item=>
item.toLowerCase().includes(type.toLowerCase())
)
.map((item,index)=>(

<div
key={index}
onClick={()=>{
setType(item);
setShowTypeDropdown(false);
}}
className="
px-4 py-2
text-base font-medium
cursor-pointer
hover:bg-gray-100
rounded-lg
"
>
{item}
</div>

))}

{/* NEW ADD BUTTON FIX */}
{type &&
![
"Tablet","Injection","Capsule","Syrup",
"Drops","Ointment","Inhaler","Medical Consumables"
].includes(type) && (

<div onClick={()=>{
setType(type);
setShowTypeDropdown(false);
}}
className="mt-1 border-t pt-2 px-4 py-2 text-blue-600 text-base font-semibold
cursor-pointer hover:bg-gray-100 rounded-lg">
+ Add "{type}"
</div>

)}
</div>
)}

</div>



<div className="relative">

<input value={subCategory} onChange={(e)=>{
setSubCategory(e.target.value);
setShowMedicineDropdown(true);
}}
onClick={()=>setShowMedicineDropdown(true)}
placeholder="Medicine Name"
className="border px-4 py-3 text-lg rounded-xl w-full"
/>

{showMedicineDropdown && (

<div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-xl w-full z-50 p-1">

{type &&
categoryMap[type]
?.filter(item=>
item.toLowerCase().includes(
subCategory.toLowerCase()
)
)
.map((item,index)=>(

<div key={index} onClick={()=>{
setSubCategory(item);
setShowMedicineDropdown(false);
}}
className=" px-4 py-2 text-base font-medium cursor-pointer hover:bg-gray-100 rounded-lg">
{item}
</div>

))}

{/* NEW ADD FIX */}
{subCategory &&
type &&
!categoryMap[type]?.includes(subCategory) && (

<div onClick={()=>{
setSubCategory(subCategory);
setShowMedicineDropdown(false);
}}className="mt-1 border-t pt-2 px-4 py-2 text-blue-600 text-base font-semibold
cursor-pointer hover:bg-gray-100 rounded-lg">
+ Add "{subCategory}"
</div>

)}
</div>

)}

</div>




<input type="number"placeholder="Qty"value={qty}onChange={(e)=>setQty(e.target.value)}
className="border p-3 rounded-xl"/>


<input type="number"placeholder="Purchase Price"value={purchasePrice}onChange={(e)=>setPurchasePrice(e.target.value)}
className="border p-3 rounded-xl"/>


<input type="number"placeholder="Sales Price"value={salesPrice}onChange={(e)=>setSalesPrice(e.target.value)}
className="border p-3 rounded-xl"/>


</div>


<button onClick={addMedicine}className="mt-6 w-full sm:w-auto bg-green-500 text-white px-8 py-3 rounded-xl">
Add Item
</button>

</div>


<div className="flex gap-3 mb-8 overflow-x-auto whitespace-nowrap pb-2">

{[
"All",
"Tablet",
"Injection",
"Capsule",
"Syrup",
"Drops",
"Ointment",
"Inhaler"
].map(cat=>(

<button key={cat}onClick={()=>setActiveCategory(cat)}
className={`px-4 md:px-6 py-2 md:py-3 rounded-full border shrink-0
${activeCategory===cat
?"bg-blue-600 text-white"
:"bg-white"}
`}
>
{cat}
</button>

))}

</div>



{/* Table */}
<div className="bg-white rounded-2xl shadow p-4 md:p-6 overflow-x-auto">

<table className="w-full">

<thead>
<tr className="border-b text-left">

<th>Type</th>

<th>Medicine</th>

<th>Qty</th>

<th>Purchase</th>

<th>Sales</th>

<th>Action</th>

</tr>
</thead>


<tbody>

{items
.filter(item=>
activeCategory==="All"
? true
: item.type===activeCategory
)
.map((item,index)=>(

<tr key={item.id} className="border-b">

<td>{item.type}</td>
<td>{item.medicine}</td>
<td>{item.qty}</td>
<td>₹{item.purchasePrice}</td>
<td>₹{item.salesPrice}</td>

<td className="space-x-4">

<button onClick={()=>editItem(index)}className="text-blue-600 font-semibold">
Edit
</button>

<button onClick={()=>deleteItem(index)}className="text-red-600 font-semibold">
Delete
</button>

</td>

</tr>

))}

</tbody>
</table>

</div>

</div>

)}


{menu==="home" &&(
<h2 className="text-3xl font-bold">
Home
</h2>
)}

{menu==="entries" &&(

<div>

<h2 className="text-4xl font-bold mb-6">
Entries
</h2>


{/* Summary */}
<div className="bg-white rounded-3xl p-5 md:p-6 shadow-md
w-[90%]
sm:w-[88%]
md:w-full
max-w-[680px]
mx-auto mb-6">  

<h3 className="text-2xl font-bold mb-4">
{activeCategory} Summary
</h3>

<p className="text-xl">
Total Sales:
₹{
entryItems
.filter(item=>
activeCategory==="All"
? true
: item.type===activeCategory
)
.reduce(
(sum,item)=>
sum +
(Number(item.salesPrice||0) *
Number(item.qty||0)),
0
)
}
</p>

</div>

{/* Add Item Box */}
<div className="bg-white rounded-3xl shadow-md p-5 md:p-6
w-[92%]
sm:w-[90%]
md:w-full
max-w-[680px]
mx-auto mb-8">

<h3 className="text-2xl font-bold mb-6">
Add Item
</h3>

<div className="grid md:grid-cols-5 gap-4">

<div className="relative">

<input
value={type}
onChange={(e)=>{
setType(e.target.value);
setShowTypeDropdown(true);
}}
onFocus={()=>setShowTypeDropdown(true)}
placeholder="Search Type"
className="border p-3 rounded-xl w-full md:w-full max-w-full"
/>

<button
type="button"
onClick={()=>setShowTypeDropdown(!showTypeDropdown)}
className="absolute right-4 top-3 text-xl"
>
</button>

{showTypeDropdown && (
<div className="
absolute top-16 left-0 w-full
bg-white border rounded-xl shadow-lg z-50
max-h-60 overflow-y-auto
">

{typeOptions
.filter(item=>
item.toLowerCase().includes(type.toLowerCase())
)
.map((item,index)=>(
<div
key={index}
onClick={()=>{
setType(item);
setShowTypeDropdown(false);
}}
className="px-4 py-3 cursor-pointer hover:bg-gray-100 text-base"
>
{item}
</div>
))}

{/* Add new custom */}
{type &&
!typeOptions.includes(type) && (
<div
onClick={()=>{
setTypeOptions([...typeOptions,type]);
setType(type);
setShowTypeDropdown(false);
}}
className="
px-4 py-3
text-blue-600 font-semibold
cursor-pointer border-t
"
>
+ Add "{type}"
</div>
)}

</div>
)}

</div>

<div className="relative">

<input
value={medicine}
onChange={(e)=>{
setMedicine(e.target.value);
setShowMedicineDropdown(true);
}}
onFocus={()=>setShowMedicineDropdown(true)}
placeholder="Search Medicine"
className="border p-3 rounded-xl w-full"
/>

<button
type="button"
onClick={()=>setShowMedicineDropdown(!showMedicineDropdown)}
className="absolute right-4 top-3"
>
</button>

{showMedicineDropdown && (
<div className="
absolute top-16 left-0 w-full
bg-white rounded-xl shadow z-50
">

{type &&
(categoryMap[type] || [])
.filter(item =>
 item.toLowerCase().includes(
   medicine.toLowerCase()
 )
)
.map((item,index)=>(

<div
key={index}
onClick={()=>{
setMedicine(item);
setShowMedicineDropdown(false);
}}
className="px-4 py-3 cursor-pointer hover:bg-gray-100"
>
{item}
</div>

))}

{medicine &&
type &&
!categoryMap[type]?.includes(medicine) && (
<div
onClick={()=>{
    categoryMap[type].push(medicine);
setShowMedicineDropdown(false);
}}
className="px-4 py-3 text-blue-600 font-semibold border-t cursor-pointer"
>
+ Add "{medicine}"
</div>
)}

</div>
)}

</div>

<input
type="number"
value={qty}
onChange={(e)=>{

const enteredQty=e.target.value;
setQty(enteredQty);

const selectedItem = items.find(
    item =>
    item.type===type &&
    (item.subCategory===medicine || item.medicine===medicine)
    );
    
    if(selectedItem && enteredQty){
    
        const unitSalesPrice =
        Number(selectedItem.salesPrice) /
        Number(selectedItem.qty);
        
        setSalesPrice(
         unitSalesPrice * Number(enteredQty)
        );
    
    }

}}
placeholder="Qty"
className="border p-3 rounded-xl"
/>


<input
type="number"
value={salesPrice}
readOnly
placeholder="Sales Price Auto"
className="border p-3 rounded-xl bg-gray-100"
/>

</div>

<button
onClick={addEntrySale}
className="mt-6 bg-green-500 text-white px-6 py-3 rounded-xl"
>
Sales
</button>

</div>


{/* Category Buttons */}
<div className="
flex gap-3 mb-8
overflow-x-auto
whitespace-nowrap
pb-2
w-full
max-w-full
">

{[
"All",
"Tablet",
"Injection",
"Capsule",
"Syrup",
"Drops",
"Ointment",
"Inhaler"
].map(cat=>(

<button key={cat} onClick={()=>setActiveCategory(cat)}
className={`px-4 md:px-6 py-2 md:py-3 rounded-full border shrink-0
${activeCategory===cat
? "bg-blue-600 text-white"
: "bg-white"}
`}
>
{cat}
</button>

))}

</div>


{/* Full Table */}
<div className="bg-white rounded-2xl shadow p-4 md:p-6 overflow-x-auto">

<table className="w-full">

<thead>
<tr className="border-b text-left">
<th>Type</th>
<th>Medicine</th>
<th>Qty</th>
<th>Sales</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{entryItems
.filter(item=>
activeCategory==="All"
? true
: item.type===activeCategory
)
.map((item,index)=>(


<tr key={item.id} className="border-b">

<td>{item.type}</td>

<td>{item.medicine}</td>

<td>{item.qty}</td>

<td>₹{item.salesPrice}</td>


<td className="space-x-4">

<button onClick={()=>editItem(index)} className="text-blue-600 font-semibold">
Edit
</button>

<button onClick={()=>deleteItem(index)}className="text-red-600 font-semibold">
Delete
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

)}


</div>

</div>

</div>
)

}

export default PharmasiDashboard;