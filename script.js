const products=[
 {id:1,name:"iPhone 15 Pro",cat:"Smartphones",price:3900000,icon:"📱",badge:"Popular"},
 {id:2,name:"Samsung Galaxy S24",cat:"Smartphones",price:3500000,icon:"📱",badge:"New"},
 {id:3,name:"Dell Latitude 5480",cat:"Laptops",price:850000,icon:"💻",badge:"Value"},
 {id:4,name:"HP EliteBook",cat:"Laptops",price:1200000,icon:"💻",badge:"Business"},
 {id:5,name:"Premium Wireless Earbuds",cat:"Audio",price:85000,icon:"🎧",badge:"Hot"},
 {id:6,name:"Smart Watch Series",cat:"Smartwatches",price:120000,icon:"⌚",badge:"New"},
 {id:7,name:"Power Bank 20,000mAh",cat:"Accessories",price:95000,icon:"🔋",badge:"Essential"},
 {id:8,name:"Fast USB-C Charger",cat:"Accessories",price:55000,icon:"🔌",badge:"Fast"},
 {id:9,name:"PlayStation Controller",cat:"Gaming",price:180000,icon:"🎮",badge:"Gaming"},
 {id:10,name:"HD Security Camera",cat:"Cameras",price:160000,icon:"📷",badge:"Smart"},
 {id:11,name:"Smart LED TV",cat:"TV",price:950000,icon:"📺",badge:"Home"},
 {id:12,name:"Bluetooth Speaker",cat:"Audio",price:150000,icon:"🔊",badge:"Best seller"}
];
let cart=JSON.parse(localStorage.getItem("dgadgets-cart")||"[]");
let activeFilter="All";
const grid=document.getElementById("productGrid");
const fmt=n=>"UGX "+n.toLocaleString("en-UG");

function renderProducts(list=products){
 grid.innerHTML=list.map(p=>`<article class="product">
   <div class="product-visual">${p.icon}<span class="badge">${p.badge}</span></div>
   <div class="product-info"><small>${p.cat}</small><h3>${p.name}</h3><div class="price">${fmt(p.price)}</div>
   <div class="product-actions"><button class="add" onclick="addToCart(${p.id})">Add to cart</button><a class="wa" target="_blank" href="https://wa.me/256746330991?text=${encodeURIComponent("Hello D Gadgets, I am interested in "+p.name+". Is it available?")}">☏</a></div></div>
 </article>`).join("");
}
function addToCart(id){const p=products.find(x=>x.id===id);cart.push(p);save();openCart();}
function removeFromCart(i){cart.splice(i,1);save();renderCart();}
function save(){localStorage.setItem("dgadgets-cart",JSON.stringify(cart));document.getElementById("cartCount").textContent=cart.length;renderCart();}
function renderCart(){
 const el=document.getElementById("cartItems");
 if(!cart.length){el.innerHTML='<div class="empty">Your cart is empty.<br>Add a gadget to get started.</div>';document.getElementById("cartTotal").textContent="UGX 0";return;}
 el.innerHTML=cart.map((p,i)=>`<div class="cart-item"><div class="mini">${p.icon}</div><div><h4>${p.name}</h4><p>${fmt(p.price)}</p></div><button class="remove" onclick="removeFromCart(${i})">×</button></div>`).join("");
 const total=cart.reduce((s,p)=>s+p.price,0);document.getElementById("cartTotal").textContent=fmt(total);
 document.getElementById("checkoutBtn").href="https://wa.me/256746330991?text="+encodeURIComponent("Hello D Gadgets, I would like to order:\n"+cart.map(p=>"• "+p.name+" — "+fmt(p.price)).join("\n")+"\nTotal: "+fmt(total));
}
function openCart(){document.getElementById("cartDrawer").classList.add("open");document.getElementById("overlay").classList.add("open");}
function closeCart(){document.getElementById("cartDrawer").classList.remove("open");document.getElementById("overlay").classList.remove("open");}
document.getElementById("cartBtn").onclick=openCart;document.getElementById("closeCart").onclick=closeCart;document.getElementById("overlay").onclick=closeCart;
document.getElementById("searchBtn").onclick=()=>{document.getElementById("searchPanel").classList.toggle("open");document.getElementById("searchInput").focus()};
document.getElementById("closeSearch").onclick=()=>document.getElementById("searchPanel").classList.remove("open");
document.getElementById("searchInput").addEventListener("input",e=>{const q=e.target.value.toLowerCase();renderProducts(products.filter(p=>(p.name+" "+p.cat).toLowerCase().includes(q)))});
document.querySelectorAll(".filter").forEach(b=>b.onclick=()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");activeFilter=b.dataset.filter;renderProducts(activeFilter==="All"?products:products.filter(p=>p.cat===activeFilter))});
document.querySelectorAll(".category").forEach(b=>b.onclick=()=>{activeFilter=b.dataset.category;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x.dataset.filter===activeFilter));renderProducts(products.filter(p=>p.cat===activeFilter));document.getElementById("products").scrollIntoView({behavior:"smooth"})});
document.getElementById("menuBtn").onclick=()=>{const n=document.getElementById("mainNav");n.style.display=n.style.display==="flex"?"none":"flex";n.style.position="absolute";n.style.top="64px";n.style.left="0";n.style.right="0";n.style.padding="18px 24px";n.style.background="#fff";n.style.flexDirection="column"};
renderProducts();save();
