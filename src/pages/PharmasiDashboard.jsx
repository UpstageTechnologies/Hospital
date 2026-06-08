import React,{useState,useEffect} from "react";
import { db } from "../firebase";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";
import { saveAs } from "file-saver"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
  } from "recharts";

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
const [entryType,setEntryType] = useState("")
const [showEntryDropdown,setShowEntryDropdown] = useState(false)
const [purchaseItems,setPurchaseItems] = useState([]);
const [salesItems,setSalesItems] = useState([]);
const [journalSearch,setJournalSearch] = useState("")


const printRow = (item, type) => {

  const win = window.open("", "", "width=800,height=600");
  
  win.document.write(`
  <html>
  <head>
  <title>${type} Bill</title>
  <style>
  body{
  font-family:Arial;
  padding:20px;
  }
  table{
  width:100%;
  border-collapse:collapse;
  }
  td,th{
  border:1px solid #000;
  padding:10px;
  }
  </style>
  </head>
  <body>
  
  <h2>${type} Details</h2>
  
  <table>
  <tr>
  <th>Type</th>
  <td>${item.type}</td>
  </tr>
  
  <tr>
  <th>Medicine</th>
  <td>${item.medicine}</td>
  </tr>
  
  <tr>
  <th>Qty</th>
  <td>${item.qty}</td>
  </tr>
  
  <tr>
  <th>Amount</th>
  <td>₹${item.purchasePrice || item.salesPrice}</td>
  </tr>
  
  <tr>
  <th>Date</th>
  <td>${item.date}</td>
  </tr>
  
  <tr>
  <th>Time</th>
  <td>${item.time}</td>
  </tr>
  
  </table>
  
  </body>
  </html>
  `);
  
  win.document.close();
  win.print();
  
  };

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

    const [items, setItems] = useState([]);

    const [entryItems,setEntryItems] = useState([]);

        
        useEffect(() => {

          const fetchItems = async () => {
        
            const querySnapshot = await getDocs(
              collection(db, "inventory")
            );
        
            const data = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
        
            setItems(data);
          };
        
          fetchItems();
        
        }, []);

        const currentMonth =
new Date().getMonth()+1;

const monthlyIncome =
entryItems
.filter(item => {

const month =
new Date(item.date).getMonth()+1;

return month===currentMonth;

})
.reduce(
(sum,item)=>
sum + Number(item.salesPrice||0),
0
);

const monthlyExpense =
purchaseItems
.filter(item => {

const month =
new Date(item.date).getMonth()+1;

return month===currentMonth;

})
.reduce(
(sum,item)=>
sum +
(
Number(item.purchasePrice||0)
*
Number(item.qty||0)
),
0
);


const totalIncome =
entryItems.reduce(
(sum,item)=>
sum + Number(item.salesPrice || 0),
0
);

const totalExpense =
purchaseItems.reduce(
(sum,item)=>
sum +
(
Number(item.purchasePrice || 0)
*
Number(item.qty || 0)
),
0
);

const totalProfit =
Math.max(
totalIncome - totalExpense,
0
);

const totalPurchasedQty =
purchaseItems.reduce(
(sum,item)=>
sum + Number(item.qty || 0),
0
);

const totalSoldQty =
entryItems.reduce(
(sum,item)=>
sum + Number(item.qty || 0),
0
);

const availableStock =
totalPurchasedQty - totalSoldQty;

  const graphData = [
    {
    name:"Income",
    amount: totalIncome
    },
    {
    name:"Expense",
    amount: totalExpense
    },
    {
    name:"Profit",
    amount: totalProfit
    }
    ];
          

        useEffect(()=>{

            localStorage.setItem(
            "entryItems",
            JSON.stringify(entryItems)
            );
            
            },[entryItems]);

           useEffect(() => {

  const fetchJournal = async () => {

    const querySnapshot = await getDocs(
      collection(db,"journal")
    );

    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setEntryItems(data);

  };

  fetchJournal();

}, []);

            useEffect(() => {

              const fetchPurchase = async () => {
            
                const querySnapshot = await getDocs(
                  collection(db, "purchase")
                );
            
                const data = querySnapshot.docs.map(doc => ({
                  id: doc.id,
                  ...doc.data()
                }));
            
                setPurchaseItems(data);
              };
            
              fetchPurchase();
            
            }, []);

            useEffect(() => {

              const fetchJournal = async () => {
            
                const querySnapshot = await getDocs(
                  collection(db,"journal")
                );
            
                const data = querySnapshot.docs.map(doc => ({
                  id: doc.id,
                  ...doc.data()
                }));
            
                setEntryItems(data);
            
              };
            
              fetchJournal();
            
            }, []);

            const addPurchase = async () => {

              if(!type || !medicine || !qty || !purchasePrice){
              alert("Fill all fields");
              return;
              }
              
              const existingItem = purchaseItems.find(
              item =>
              item.type === type &&
              item.medicine === medicine
              );
              
              if(existingItem){
              
              const updatedQty =
              Number(existingItem.qty)
              +
              Number(qty);
              
              await updateDoc(
              
              doc(db,"purchase",existingItem.id),
              
              {
              qty: updatedQty,
              purchasePrice:Number(purchasePrice)
              }
              
              );
              
              setPurchaseItems(prev =>
              prev.map(item =>
              
              item.id===existingItem.id
              
              ? {
              ...item,
              qty:updatedQty,
              purchasePrice:Number(purchasePrice)
              }
              
              : item
              
              )
              );
              
              }else{
              
                const data = {
                  type,
                  medicine,
                  qty:Number(qty),
                  purchasePrice:Number(purchasePrice),
                  
                  date:new Date().toLocaleDateString(),
                  
                  time:new Date().toLocaleTimeString()
                  
                  };
              
              const docRef = await addDoc(
              collection(db,"purchase"),
              data
              );
              
              setPurchaseItems(prev => [
              ...prev,
              {
              id:docRef.id,
              ...data
              }
              ]);
              
              }
              
              setType("");
              setMedicine("");
              setQty("");
              setPurchasePrice("");
              
              };

            

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


const addMedicine = async () => {

  if(!type || !subCategory || !qty || !purchasePrice || !salesPrice){
    alert("Fill all fields");
    return;
  }

  const data = {
    type,
    medicine: subCategory,
    qty: Number(qty),
    purchasePrice: Number(purchasePrice),
    salesPrice: Number(salesPrice),
    
    date:new Date().toLocaleDateString(),
    
    time:new Date().toLocaleTimeString()
    
    };

  const docRef = await addDoc(
    collection(db,"inventory"),
    data
  );

  setItems(prev => [
    ...prev,
    {
      id: docRef.id,
      ...data
    }
  ]);

  // 🔥 PURCHASE STOCK MINUS

  const selectedPurchase = purchaseItems.find(
    item =>
      item.type === type &&
      item.medicine === subCategory
  );

  if(selectedPurchase){

    const remainingQty =
      Number(selectedPurchase.qty)
      - Number(qty);

    // local update
    setPurchaseItems(prev =>
      prev.map(item =>
        item.id === selectedPurchase.id
        ? {...item, qty: remainingQty}
        : item
      )
    );

  }

  setType("");
  setSubCategory("");
  setQty("");
  setPurchasePrice("");
  setSalesPrice("");
};

  const addEntryPurchase = () => {

    if(!type || !medicine || !qty || !salesPrice){
      alert("Fill all fields");
      return;
    }
  
    const data = {
      id: Date.now(),
      type,
      medicine,
      qty,
      entryType: "Purchase",
  
      // ✅ purchase amount save
      purchasePrice: salesPrice,
  
      // ✅ sales amount save
      salesPrice
    };
  
    setEntryItems([...entryItems, data]);
  
    setType("");
    setMedicine("");
    setQty("");
    setPurchasePrice("");
    setSalesPrice("");
    setEntryType("");
  };

  const addSale = async () => {

    if(!type || !medicine || !qty){
      alert("Fill all fields");
      return;
    }
  
    const selectedItem = items.find(
      item =>
        item.type === type &&
        item.medicine === medicine
    );
  
    if(!selectedItem){
      alert("Medicine not found");
      return;
    }
  
    const totalPurchase =
      Number(selectedItem.purchasePrice)
      * Number(qty);
  
    const totalSales =
      Number(selectedItem.salesPrice)
      * Number(qty);
  
      const data = {
        type,
        medicine,
        qty: Number(qty),
        purchasePrice: totalPurchase,
        salesPrice: totalSales,
        
        date:new Date().toLocaleDateString(),
        
        time:new Date().toLocaleTimeString()
        
        };
  
    // FIREBASE SAVE
    const docRef = await addDoc(
      collection(db,"sales"),
      data
    );
  
    await addDoc(
      collection(db,"journal"),
      data
    );

    // TABLE SAVE
    setEntryItems(prev => [
      ...prev,
      {
        id: docRef.id,
        ...data
      }
    ]);
  
    // INVENTORY STOCK MINUS
    setItems(prev =>
      prev.map(item =>
        item.id === selectedItem.id
        ? {
            ...item,
            qty:
              Number(item.qty)
              - Number(qty)
          }
        : item
      )
    );
  
    setType("");
    setMedicine("");
    setQty("");
    setSalesPrice("");
  };

  const addEntrySale = () => {

    if(!type || !medicine || !qty){
      alert("Fill all fields");
      return;
    }
  
    // 🔥 inventory la irundhu item edukkum
    const selectedItem = items.find(
      item =>
        item.type === type &&
        (item.subCategory === medicine ||
         item.medicine === medicine)
    );
  
    // 🔥 purchase + sales auto set
    const unitPurchasePrice =
      Number(selectedItem?.purchasePrice || 0);
  
    const unitSalesPrice =
      Number(selectedItem?.salesPrice || 0);
  
    const totalPurchase =
      unitPurchasePrice * Number(qty);
  
    const totalSales =
      unitSalesPrice * Number(qty);
  
    const data = {
      id: Date.now(),
      type,
      medicine,
      qty,
      entryType: "Sales",
  
      // ✅ NOW SAVING
      purchasePrice: totalPurchase,
  
      salesPrice: totalSales
    };
  
    setEntryItems([...entryItems, data]);
  
    setType("");
    setMedicine("");
    setQty("");
    setPurchasePrice("");
    setSalesPrice("");
    setEntryType("");
  };

  // ✅ EDIT ENTRY
const editEntryItem = (index) => {

  const item = entryItems[index];

  setType(item.type);
  setMedicine(item.medicine);
  setQty(item.qty);
  setSalesPrice(item.salesPrice);

  setEditIndex(index);
};

// ✅ DELETE ENTRY
const deleteEntryItem = (index) => {
  setEntryItems(prev => prev.filter((_, i) => i !== index));
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

        const deleteItem = async (id) => {

          await deleteDoc(doc(db, "inventory", id));
        
          setItems(prev =>
            prev.filter(item => item.id !== id)
          );
        };

        const editPurchaseItem = (item) => {

          setType(item.type);
          setMedicine(item.medicine);
          setQty(item.qty);
          setPurchasePrice(item.purchasePrice);
          
          setEditIndex(item.id);
          
          };
          
          const deletePurchaseItem = async (id) => {
          
          await deleteDoc(
          doc(db,"purchase",id)
          );
          
          setPurchaseItems(prev =>
          prev.filter(item => item.id !== id)
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

<li onClick={()=>setMenu("purchase")} className="cursor-pointer">
Purchase
</li>

<li onClick={()=>setMenu("sales")} className="cursor-pointer">
Sales
</li>

<li onClick={()=>setMenu("journal")}className="cursor-pointer">
Journal Entry
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

<div className="grid grid-cols-5 py-3 text-black">

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
onClick={()=>setMenu("purchase")}
className="flex flex-col items-center gap-2"
>
<span className="text-2xl">📥</span>
<span className="text-base font-medium">
Purchase
</span>
</button>

<button
onClick={()=>setMenu("sales")}
className="flex flex-col items-center gap-2"
>
<span className="text-2xl">💰</span>
<span className="text-base font-medium">
Sales
</span>
</button>

<button
onClick={()=>setMenu("journal")}
className="flex flex-col items-center gap-2"
>
<span className="text-2xl">📒</span>
<span className="text-base font-medium">
Journal
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



<div className="bg-white rounded-3xl shadow-md p-5 md:p-6
w-[86%] sm:w-[88%] md:w-full lg:w-full
ml-4 sm:ml-8 md:mx-0 lg:mx-0 mb-8">

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
<div className="bg-white rounded-3xl shadow-md p-5 md:p-6
w-[86%] sm:w-[88%] md:w-full lg:w-full
ml-4 sm:ml-8 md:mx-0 lg:mx-0 mb-8">
<h3 className="text-2xl font-bold mb-6">
Add Item
</h3>

<div className="flex flex-col gap-4 sm:flex-col md:grid md:grid-cols-2 lg:grid-cols-6">


<div className="relative">

<input value={type} onChange={(e)=>{
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
w-full z-50 p-2
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
className="px-4 py-2 text-sm font-medium cursor-pointer break-words whitespace-normal"
style={{ wordBreak: "break-word" }}
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

<div className="
absolute top-full left-0 mt-2
bg-white shadow-lg rounded-xl
w-full z-50 p-2
max-h-60 overflow-y-auto
break-words
">

{medicineOptions
.filter(item=>
item.toLowerCase().includes(
subCategory.toLowerCase()
)
)
.map((item,index)=>(

<div key={index} onClick={()=>{
setSubCategory(item);
setShowMedicineDropdown(false);
}}
className="px-4 py-2 text-sm font-medium cursor-pointer hover:bg-gray-100 rounded-lg break-words whitespace-normal"
style={{ wordBreak: "break-word" }}>
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




<input type="number"placeholder="Qty"value={qty}onChange={(e)=>{

const enteredQty = e.target.value;

setQty(enteredQty);

const selectedItem = purchaseItems.find(
  item =>
    item.type === type &&
    item.medicine === subCategory
);

if(selectedItem){

  setPurchasePrice(
    Number(selectedItem.purchasePrice)
    * Number(enteredQty)
  );

}

}}
className="border p-3 rounded-xl"/>


<input type="number"placeholder="Purchase Price"value={purchasePrice}onChange={(e)=>setPurchasePrice(e.target.value)}
className="border p-3 rounded-xl"/>


<input type="number"placeholder="Sales Price"value={salesPrice}onChange={(e)=>setSalesPrice(e.target.value)}
className="border p-3 rounded-xl"/>


</div>


<button
onClick={addMedicine}
className="mt-6 w-full sm:w-auto bg-green-500 text-white px-8 py-3 rounded-xl"
>
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
<div className="hidden lg:block bg-white rounded-2xl shadow p-4 md:p-6 overflow-x-auto">

<table className="w-full">

<thead>
<tr className="border-b text-left">

<th>Type</th>

<th>Medicine</th>

<th>Qty</th>

<th>Purchase</th>

<th>Sales</th>

<th>Date</th>

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

<td>{item.medicine || item.subCategory}</td>

<td>{item.qty}</td>

<td>₹{item.purchasePrice}</td>

<td>₹{item.salesPrice}</td>

<td>

{item.date || new Date().toLocaleDateString()}

<br/>

<span className="text-sm text-gray-500">
{item.time || new Date().toLocaleTimeString()}
</span>

</td>

<td className="space-x-4">

<button onClick={()=>editItem(index)}className="text-blue-600 font-semibold">
Edit
</button>

<button onClick={()=>deleteItem(item.id)}className="text-red-600 font-semibold">
Delete
</button>

</td>

</tr>

))}

</tbody>
</table>

</div>

{/* Mobile + Tablet Card View */}

<div className="block lg:hidden space-y-4">

{items
.filter(item=>

activeCategory==="All"
? true
: item.type===activeCategory

)
.map((item,index)=>(

<div
key={item.id}
className="
bg-white
rounded-2xl
shadow
border
p-4
"
>

<div className="space-y-3">

<div className="flex">
<span className="w-28 font-semibold text-gray-600">
Type
</span>
<span className="font-medium">
: {item.type}
</span>
</div>

<div className="flex">
<span className="w-28 font-semibold text-gray-600">
Medicine
</span>
<span className="font-medium break-words">
: {item.medicine || item.subCategory}
</span>
</div>

<div className="flex">
<span className="w-28 font-semibold text-gray-600">
Qty
</span>
<span className="font-medium">
: {item.qty}
</span>
</div>

<div className="flex">
<span className="w-28 font-semibold text-gray-600">
Purchase
</span>
<span className="font-medium">
: ₹{item.purchasePrice}
</span>
</div>

<div className="flex">
<span className="w-28 font-semibold text-gray-600">
Sales
</span>
<span className="font-medium">
: ₹{item.salesPrice}
</span>
</div>

<div className="flex">
<span className="w-28 font-semibold text-gray-600">
Date
</span>

<span className="font-medium">
: {item.date}
<br />
{item.time}
</span>

</div>

</div>

<div className="grid grid-cols-2 gap-2 mt-4">

<button
onClick={()=>editItem(index)}
className="
bg-blue-500
text-white
py-2
rounded-xl
"
>
Edit
</button>

<button
onClick={()=>deleteItem(item.id)}
className="
bg-red-500
text-white
py-2
rounded-xl
"
>
Delete
</button>

</div>

</div>

))}

</div>

</div>

)}

{menu==="purchase" &&(

<div>

<h2 className="text-4xl font-bold mb-6">
Purchase
</h2>

{/* SUMMARY */}

<div className="bg-white rounded-3xl shadow-md p-5 md:p-6 mb-8">

<h3 className="text-2xl font-bold mb-4">
Purchase Summary
</h3>

<p className="text-xl">

Total Stock:
{
purchaseItems.reduce(
(sum,item)=>
sum + Number(item.qty || 0),
0
)
}

</p>

</div>

{/* ADD PURCHASE */}

<div className="bg-white rounded-3xl shadow-md p-5 md:p-6 mb-8">

<h3 className="text-2xl font-bold mb-6">
Add Purchase
</h3>

<div className="grid md:grid-cols-4 gap-4">

{/* TYPE */}

<div className="relative">

<input
value={type}
onChange={(e)=>{
setType(e.target.value);
setShowTypeDropdown(true);
}}
onClick={()=>setShowTypeDropdown(true)}
placeholder="Select Type"
className="border p-3 rounded-xl w-full"
/>

{showTypeDropdown && (

<div className="
absolute top-full left-0 mt-2
bg-white shadow-lg rounded-xl
w-full z-50
max-h-60 overflow-y-auto
">

{typeOptions
.filter(item =>
item.toLowerCase().includes(type.toLowerCase())
)
.map((item,index)=>(

<div
key={index}
onClick={()=>{
setType(item);
setShowTypeDropdown(false);
}}
className="px-4 py-3 cursor-pointer hover:bg-gray-100"
>
{item}
</div>

))}

{/* ADD TYPE */}

{type &&
!typeOptions.includes(type) && (

<div
onClick={()=>{

setTypeOptions(prev => [
...prev,
type
]);

// 🔥 NEW
categoryMap[type] = [];

setShowTypeDropdown(false);
}}
className="px-4 py-3 text-blue-600 font-semibold border-t cursor-pointer"
>
+ Add "{type}"
</div>

)}

</div>

)}

</div>

{/* MEDICINE */}

<div className="relative">

<input
value={medicine}
onChange={(e)=>{
setMedicine(e.target.value);
setShowMedicineDropdown(true);
}}
onClick={()=>setShowMedicineDropdown(true)}
placeholder="Medicine Name"
className="border p-3 rounded-xl w-full"
/>

{showMedicineDropdown && (

<div className="
absolute top-full left-0 mt-2
bg-white shadow-lg rounded-xl
w-full z-50
max-h-60 overflow-y-auto
">

{medicineOptions
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

{/* ADD MEDICINE */}

{medicine &&
!medicineOptions.includes(medicine) && (

<div
onClick={()=>{

setMedicineOptions(prev => [
...prev,
medicine
]);

// 🔥 NEW
if(!categoryMap[type]){
categoryMap[type] = [];
}

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

{/* QTY */}

<input
type="number"
value={qty}
onChange={(e)=>setQty(e.target.value)}
placeholder="Qty"
className="border p-3 rounded-xl"
/>

{/* PURCHASE PRICE */}

<input
type="number"
value={purchasePrice}
onChange={(e)=>setPurchasePrice(e.target.value)}
placeholder="Purchase Price"
className="border p-3 rounded-xl"
/>

</div>

<button
onClick={async ()=>{

  if(editIndex){
  
  await updateDoc(
  
  doc(db,"purchase",editIndex),
  
  {
  type,
  medicine,
  qty:Number(qty),
  purchasePrice:Number(purchasePrice)
  }
  
  );

  setItems(prev =>
    prev.map(item =>
    
    item.type===type &&
    item.medicine===medicine
    
    ? {
    ...item,
    purchasePrice:Number(purchasePrice)
    }
    
    : item
    
    )
    );
    
    setEntryItems(prev =>
    prev.map(item =>
    
    item.type===type &&
    item.medicine===medicine
    
    ? {
    ...item,
    purchasePrice:
    Number(purchasePrice)
    *
    Number(item.qty)
    }
    
    : item
    
    )
    );
  
  setPurchaseItems(prev =>
  prev.map(item =>
  item.id===editIndex
  ? {
  ...item,
  type,
  medicine,
  qty:Number(qty),
  purchasePrice:Number(purchasePrice)
  }
  : item
  )
  );
  
  setEditIndex(null);
  
  }else{
  
  addPurchase();
  
  }
  
  }}
className="mt-6 bg-green-500 text-white px-8 py-3 rounded-xl"
>
Add Purchase
</button>

</div>

{/* TABLE */}

<div className="hidden lg:block bg-white rounded-2xl shadow p-4 md:p-6 overflow-x-auto">

<table className="w-full">

<thead>

<tr className="border-b text-left">

<th>Type</th>
<th>Medicine</th>
<th>Qty</th>
<th>Purchase Price</th>
<th>Date</th>
<th>Action</th>

</tr>

</thead>

<tbody>

{purchaseItems.map((item)=>(

<tr key={item.id} className="border-b">

<td>{item.type}</td>

<td>{item.medicine}</td>

<td>{item.qty}</td>

<td>₹{item.purchasePrice}</td>
<td>

{item.date || new Date().toLocaleDateString()}

<br/>

<span className="text-sm text-gray-500">
{item.time || new Date().toLocaleTimeString()}
</span>

</td>

<td className="space-x-4">

<button
onClick={()=>editPurchaseItem(item)}
className="text-blue-600 font-semibold"
>
Edit
</button>

<button
onClick={()=>deletePurchaseItem(item.id)}
className="text-red-600 font-semibold"
>
Delete
</button>

<button
onClick={() => printRow(item,"Purchase")}
className="text-purple-600 font-semibold"
>
Print
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

{/* Mobile + Tablet Card View */}
<div className="block lg:hidden space-y-4">

{purchaseItems.map((item)=>(

<div
key={item.id}
className="bg-white rounded-2xl shadow border p-4"
>

<div className="space-y-3">

<div className="flex">
<span className="w-28 font-semibold text-gray-600">
Type
</span>
<span>: {item.type}</span>
</div>

<div className="flex">
<span className="w-28 font-semibold text-gray-600">
Medicine
</span>
<span>: {item.medicine}</span>
</div>

<div className="flex">
<span className="w-28 font-semibold text-gray-600">
Qty
</span>
<span>: {item.qty}</span>
</div>

<div className="flex">
<span className="w-28 font-semibold text-gray-600">
Purchase
</span>
<span>: ₹{item.purchasePrice}</span>
</div>

<div className="flex">
<span className="w-28 font-semibold text-gray-600">
Date
</span>
<span>
: {item.date}
<br/>
{item.time}
</span>
</div>

</div>

<div className="grid grid-cols-3 gap-2 mt-4">

<button
onClick={()=>editPurchaseItem(item)}
className="bg-blue-500 text-white py-2 rounded-xl"
>
Edit
</button>

<button
onClick={()=>deletePurchaseItem(item.id)}
className="bg-red-500 text-white py-2 rounded-xl"
>
Delete
</button>

<button
onClick={()=>printRow(item,"Purchase")}
className="bg-purple-600 text-white py-2 rounded-xl"
>
Print
</button>

</div>

</div>

))}

</div>

</div>

)}


{menu==="home" &&(

<div className="space-y-6">

<h1 className="text-4xl font-bold">
 Pharmacy Dashboard
</h1>

{/* Low Stock */}

<div className="bg-white rounded-2xl shadow p-6">

<h2 className="text-2xl font-bold mb-4">
 Low Stock Medicines
</h2>

<div className="space-y-3">

{
items
.filter(item => Number(item.qty) <= 10)
.slice(0,5)
.map((item,index)=>(
<div
key={index}
className="
flex
justify-between
border-b
pb-2
"
>
<span>
{item.medicine}
</span>

<span className="text-red-500 font-bold">
{item.qty} Left
</span>

</div>
))
}

{
items.filter(item =>
Number(item.qty) <= 10
).length === 0 && (

<p className="text-green-600">
All Medicines Stock Available
</p>

)
}

</div>

</div>

{/* Stats */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

<div className="bg-white rounded-2xl shadow p-6">
<h3 className="text-gray-500">
Inventory Items
</h3>
<p className="text-4xl font-bold text-blue-600">
{items.length}
</p>
</div>

<div className="bg-white rounded-2xl shadow p-6">
<h3 className="text-gray-500">
Purchase Entries
</h3>
<p className="text-4xl font-bold text-green-600">
{purchaseItems.length}
</p>
</div>

<div className="bg-white rounded-2xl shadow p-6">
<h3 className="text-gray-500">
Sales Entries
</h3>
<p className="text-4xl font-bold text-purple-600">
{entryItems.length}
</p>
</div>

<div className="bg-white rounded-2xl shadow p-6">
<h3 className="text-gray-500">
Available Stock
</h3>
<p className="text-4xl font-bold text-red-600">
{
items.reduce(
(sum,item)=>
sum + Number(item.qty || 0),
0
)
}
</p>
</div>

</div>

{/* Revenue */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

<div className="bg-white rounded-2xl shadow p-6">

<h2 className="text-2xl font-bold mb-4">
Purchase Amount
</h2>

<p className="text-5xl font-bold text-red-500">

₹{
purchaseItems.reduce(
(sum,item)=>
sum +
(
Number(item.purchasePrice || 0)
*
Number(item.qty || 0)
),
0
)
}

</p>

</div>

<div className="bg-white rounded-2xl shadow p-6">

<h2 className="text-2xl font-bold mb-4">
Sales Amount
</h2>

<p className="text-5xl font-bold text-green-600">

₹{
entryItems.reduce(
(sum,item)=>
sum +
Number(item.salesPrice || 0),
0
)
}

</p>

</div>

</div>




</div>

)}

{menu==="sales" &&(

<div>

<h2 className="text-4xl font-bold mb-6">
Sales
</h2>


{/* Summary */}
<div className="bg-white rounded-3xl p-5 md:p-6 shadow-md
w-[90%]
sm:w-[88%]
md:w-full lg:w-full
ml-4 sm:ml-8 md:mx-0 lg:mx-0 mb-6"> 

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
  sum + Number(item.salesPrice||0),
  0
  )
}
</p>

</div>

{/* Add Item Box */}
<div className="bg-white rounded-3xl shadow-md p-5 md:p-6
w-[92%]
sm:w-[90%]
md:w-full lg:w-full
ml-4 sm:ml-8 md:mx-0 lg:mx-0 mb-8">

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
p-2
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
className="px-4 py-2 text-sm font-medium cursor-pointer break-words whitespace-normal"
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

{purchaseItems
.filter(item =>
item.type === type &&
item.medicine
.toLowerCase()
.includes(medicine.toLowerCase())
)
.map((item,index)=>(

<div
key={index}
onClick={()=>{
setMedicine(item.medicine);
setShowMedicineDropdown(false);
}}
className="
px-4 py-3 text-sm
cursor-pointer
hover:bg-gray-100
"
>
{item.medicine}
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
      Number(selectedItem.salesPrice);
      
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
onClick={addSale}
className="mt-6 bg-green-500 text-white px-6 py-3 rounded-xl"
>
Save
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
<div className="hidden lg:block bg-white rounded-2xl shadow p-4 md:p-6 overflow-x-auto">

<table className="w-full">

<thead>
<tr className="border-b text-left">
<th>Type</th>
<th>Medicine</th>
<th>Qty</th>
<th>Sales</th>
<th>Date</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{entryItems
.filter(item =>

  activeCategory === "All"
    ? true
    : item.type === activeCategory

)
.map((item,index)=>(

<tr key={item.id} className="border-b">

<td>{item.type}</td>

<td>{item.medicine}</td>

<td>{item.qty}</td>

<td>₹{item.salesPrice}</td>

<td>

{item.date || new Date().toLocaleDateString()}

<br/>

<span className="text-sm text-gray-500">
{item.time || new Date().toLocaleTimeString()}
</span>

</td>

<td className="space-x-4">

<button
onClick={()=>editEntryItem(index)}
className="text-blue-600 font-semibold"
>
Edit
</button>

<button
onClick={()=>deleteEntryItem(index)}
className="text-red-600 font-semibold"
>
Delete
</button>

<button
onClick={() => printRow(item,"Sales")}
className="text-purple-600 font-semibold"
>
Print
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

{/* Mobile + Tablet Card View */}
<div className="block lg:hidden space-y-4">

{entryItems
.filter(item=>

activeCategory==="All"
? true
: item.type===activeCategory

)
.map((item,index)=>(

<div
key={item.id}
className="bg-white rounded-2xl shadow border p-4"
>

<div className="space-y-3">

<div className="flex">
<span className="w-28 font-semibold text-gray-600">
Type
</span>
<span>: {item.type}</span>
</div>

<div className="flex">
<span className="w-28 font-semibold text-gray-600">
Medicine
</span>
<span>: {item.medicine}</span>
</div>

<div className="flex">
<span className="w-28 font-semibold text-gray-600">
Qty
</span>
<span>: {item.qty}</span>
</div>

<div className="flex">
<span className="w-28 font-semibold text-gray-600">
Sales
</span>
<span>: ₹{item.salesPrice}</span>
</div>

<div className="flex">
<span className="w-28 font-semibold text-gray-600">
Date
</span>
<span>
: {item.date}
<br/>
{item.time}
</span>
</div>

</div>

<div className="grid grid-cols-3 gap-2 mt-4">

<button
onClick={()=>editEntryItem(index)}
className="bg-blue-500 text-white py-2 rounded-xl"
>
Edit
</button>

<button
onClick={()=>deleteEntryItem(index)}
className="bg-red-500 text-white py-2 rounded-xl"
>
Delete
</button>

<button
onClick={() => printRow(item,"Sales")}
className="bg-purple-600 text-white py-2 rounded-xl"
>
Print
</button>

</div>

</div>

))}

</div>

</div>

)}

{menu==="journal" && (

<div>

<h1 className="text-4xl font-bold mb-8">
Journal Entry
</h1>


{/* Summary Cards */}

<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

<div className="bg-white rounded-3xl shadow p-6 border-l-[8px] border-blue-500">
<h3 className="text-gray-500 text-xl font-semibold">
Income
</h3>

<p className="text-4xl font-bold text-blue-500 mt-3">

₹{
entryItems.reduce(
(sum,item)=>
sum + Number(item.salesPrice || 0),
0
)
}

</p>
</div>

<div className="bg-white rounded-3xl shadow p-6 border-l-[8px] border-yellow-500">
<h3 className="text-gray-500 text-xl font-semibold">
Expense
</h3>

<p className="text-4xl font-bold text-yellow-500 mt-3">

₹{
purchaseItems.reduce(
(sum,item)=>
sum +
(
Number(item.purchasePrice || 0)
*
Number(item.qty || 0)
),
0
)
}

</p>
</div>

<div className="bg-white rounded-3xl shadow p-6 border-l-[8px] border-green-500">
<h3 className="text-gray-500 text-xl font-semibold">
Profit
</h3>

<p className="text-4xl font-bold text-green-500 mt-3">

₹{
entryItems.reduce(
(sum,item)=>
sum + Number(item.salesPrice || 0),
0
)
-
purchaseItems.reduce(
(sum,item)=>
sum +
(
Number(item.purchasePrice || 0)
*
Number(item.qty || 0)
),
0
)
}

</p>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

<div className="bg-white rounded-3xl shadow p-6">
<h3 className="text-xl font-bold">
Purchased Qty
</h3>
<p className="text-4xl font-bold text-blue-600">
{totalPurchasedQty}
</p>
</div>

<div className="bg-white rounded-3xl shadow p-6">
<h3 className="text-xl font-bold">
Sold Qty
</h3>
<p className="text-4xl font-bold text-green-600">
{totalSoldQty}
</p>
</div>

<div className="bg-white rounded-3xl shadow p-6">
<h3 className="text-xl font-bold">
Available Stock
</h3>
<p className="text-4xl font-bold text-purple-600">
{availableStock}
</p>
</div>

</div>

<div className="bg-white rounded-3xl shadow p-6 mt-6">

<h2 className="text-2xl font-bold mb-4">
Today's Report
</h2>

<p>
Income :
₹{
entryItems
.filter(item =>
item.date === new Date().toLocaleDateString()
)
.reduce(
(sum,item)=>
sum + Number(item.salesPrice || 0),
0
)
}
</p>

<p>
Expense :
₹{
purchaseItems
.filter(item =>
item.date === new Date().toLocaleDateString()
)
.reduce(
(sum,item)=>
sum +
(Number(item.purchasePrice||0)
*
Number(item.qty||0)),
0
)
}
</p>
</div>

<br />

<div className="bg-white rounded-3xl shadow p-6 mb-6">

<h2 className="text-2xl font-bold mb-4">
Medicine Wise Sales
</h2>

{entryItems.map((item,index)=>(

<div
key={index}
className="flex justify-between border-b py-3"
>

<span>{item.medicine}</span>

<span>
Qty : {item.qty}
</span>

<span>
₹{item.salesPrice}
</span>

</div>

))}

</div>

{/* GRAPH START */}

<div className="
bg-black
rounded-3xl
p-6
mt-8
w-full
">

<h2 className="text-white text-3xl font-bold mb-2">
Pharmacy Profit Overview
</h2>

<p className="text-gray-300 mb-6">
Compare income, expense and profit
</p>

<div className="h-[450px]">

<ResponsiveContainer
width="100%"
height="100%"
>

<BarChart
data={graphData}
margin={{
top:20,
right:30,
left:20,
bottom:20
}}
>

<CartesianGrid
strokeDasharray="3 3"
stroke="#444"
/>

<XAxis
dataKey="name"
stroke="#fff"
/>

<YAxis
stroke="#fff"
/>

<Tooltip />

<Bar
dataKey="amount"
fill="#3B82F6"
radius={[10,10,0,0]}
/>

</BarChart>

</ResponsiveContainer>

</div>

</div>

<br />

{/* Table */}

<div className="bg-white rounded-2xl shadow overflow-x-auto">

<table className="w-full">

<thead>

<tr className="bg-blue-600 text-white">

<th className="p-4">Medicine</th>
<th>Qty</th>
<th>Income</th>
<th>Expense</th>
<th>Date</th>
<th>Print</th>

</tr>

</thead>

<tbody>

{entryItems
.filter(item=>

item.medicine
?.toLowerCase()
.includes(
journalSearch.toLowerCase()
)

)
.map((item,index)=>(

<tr
key={index}
className="border-b"
>

<td className="p-4">
{item.medicine}
</td>

<td>
{item.qty}
</td>

<td>
₹{item.salesPrice}
</td>

<td>
₹{item.purchasePrice}
</td>

<td>
{item.date}
</td>

<td>

<button
onClick={()=>printRow(item,"Journal")}
className="
bg-blue-600
text-white
px-4
py-2
rounded-xl
"
>
Print
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