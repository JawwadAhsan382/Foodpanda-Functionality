import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getFirestore ,collection, addDoc,Timestamp, getDocs, doc, deleteDoc,updateDoc, deleteField } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { getAuth,createUserWithEmailAndPassword , signInWithEmailAndPassword ,onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
let getCustomerBody=document.getElementById('customerbody')
let getAdminBody=document.getElementById('adminbody')
let getIndexBody=document.getElementById('indexbody')
let getLoginBody=document.getElementById('loginbody')
let getSemail=document.getElementById('semail')
let getSname=document.getElementById('sname')
let getSpassword=document.getElementById('spassword')
let getSform=document.getElementById('sform')
let getLemail=document.getElementById('lemail')
let getLpassword=document.getElementById('lpassword')
let getLform=document.getElementById('lform')
let getLout=document.getElementById('lout')
let getLopen=document.querySelector('.lopen')
let getCustomerContainer=document.getElementById('customercontainer')
let customerRead
let id
let readData
let getPill=document.getElementById('pill')
let getLclose=document.querySelector('.lclose')
let getSopen=document.querySelector('.sopen')
let getSclose=document.querySelector('.sclose')
let getItemForm=document.getElementById('itemform')
let getAdminContainer=document.getElementById('admincontainer')
let getBttnsOrder
let getBill=document.getElementById('bill')
let getSearchForm=document.getElementById('searchform')
const firebaseConfig = {
  apiKey: "AIzaSyAx7z2MAurEV3enbiCqL4-qvi-apefG0Ho",
  authDomain: "store-694a5.firebaseapp.com",
  projectId: "store-694a5",
  storageBucket: "store-694a5.firebasestorage.app",
  messagingSenderId: "315100360668",
  appId: "1:315100360668:web:fa3d898bf6d02899302919"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
localStorage.setItem('a',6)
onAuthStateChanged(auth,async (user) => {
  if(localStorage.getItem('a')){
    let flag=true
    let A=false
  let C=false
  let At
  let Ct
  if (user) {
    if(getSform||location.pathname.endsWith('/index.html')||location.pathname.endsWith('/login.html')||location.pathname.endsWith('/adminDash.html')||location.pathname.endsWith('/customerDash.html')){
      const querySnapshot = await getDocs(collection(db, "admin"));
querySnapshot.forEach((doc) => {
if(user.email==doc.data().email){
  A=true
  At=doc.data().time.seconds
}
});
const query = await getDocs(collection(db, "customer"));
query.forEach((doc) => {
if(user.email==doc.data().email){
  C=true
  Ct=doc.data().time.seconds
}
});
if(A==false && C==true){
if(!(location.pathname.endsWith('/customerDash.html'))){
  location.href='./customerDash.html'
}
}
else if(A==true && C==false){
const que = await getDocs(collection(db, "customerPanel"));
que.forEach((doc) => {
if(user.uid==doc.data().cd){
  flag=false
}
});
if(flag){
try {
  const docRef = await addDoc(collection(db, "customerPanel"), {
    cd:`${user.uid}`
  });
  // console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}
}
if(!(location.pathname.endsWith('/adminDash.html'))){
location.href='./adminDash.html'
}
}
else if(A==true && C==true){  
if(At>Ct){
  const que = await getDocs(collection(db, "customerPanel"));
  que.forEach((doc) => {
    if(user.uid==doc.data().cd){
      flag=false
    }
  });
  if(flag){
    try {
      const docRef = await addDoc(collection(db, "customerPanel"), {
        cd:`${user.uid}`
      });
      // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  if(!(location.pathname.endsWith('/adminDash.html'))){
    location.href='./adminDash.html'
  }
}
else if(Ct>At){
  if(!(location.pathname.endsWith('/customerDash.html'))){
    location.href='./customerDash.html'
  }
}
}
    }
    const uid = user.uid;
    id=uid
    if(location.pathname.endsWith('/adminDash.html')){
      readData()
    }
    if(location.pathname.endsWith('/customerDash.html')){
      customerRead()
    }
  } else {
    if(location.pathname.endsWith('/adminDash.html')||location.pathname.endsWith('/customerDash.html')){
      location.href='./index.html'
    }
  }
  }
});
if(getIndexBody){
  getSopen.addEventListener('click',()=>{
    getSclose.style.display='block'
    getSopen.style.display='none'
    getSpassword.type='text'
})
getSclose.addEventListener('click',()=>{
    getSclose.style.display='none'
    getSopen.style.display='block'
    getSpassword.type='password'
})
  getSform.addEventListener('submit', ()=>{
  Swal.fire({
    title: "How do you want to signup as?",
    showDenyButton: true,
    allowEscapeKey:false,
    allowOutsideClick:true,
    draggable:false,
    confirmButtonText: "Admin",
    denyButtonText: "Customer"
  }).then(async (result) => {//then start
    if (result.isConfirmed) {
      let flag=false
      const querySnapshot = await getDocs(collection(db, "admin"));
querySnapshot.forEach((doc) => {
if(getSemail.value.toLowerCase()==doc.data().email.toLowerCase()){
  flag=true
}
});
if(flag){
Swal.fire({
  icon: "error",
  title: "Oops...",
  text: `${getSemail.value.toLowerCase()} exist as admin`,
});
}else{ //else start
try {//try start
  const querySnapshot = await getDocs(collection(db, "customer"));
querySnapshot.forEach((doc) => {
if(getSemail.value.toLowerCase()==doc.data().email.toLowerCase()){
  flag=true
}
});
if(!flag){
createUserWithEmailAndPassword(auth, getSemail.value, getSpassword.value)
.then((userCredential) => {
  const user = userCredential.user;
  Swal.fire({
    title: `${user.email} signedup`,
    icon: "success",
    draggable: true,
    allowOutsideClick:false,
    allowEscapeKey:false,
  }).then(async ()=>{
    // const { value: rname } = await Swal.fire({
    //   title: "Restaurant Name",
    //   input: "text",
    //   inputPlaceholder: "Enter your restaurant name"
    // });
    // if (rname) {
    //   Swal.fire({
    //     title: "Restaurant added",
    //     icon: "success",
    //     draggable: false
    //   });
    // }
    const docRef = await addDoc(collection(db, "admin"), {
      name:getSname.value,
      // restaurant:rname,
      time:Timestamp.now(),
      email: getSemail.value.toLowerCase(),
    });
    // console.log("Document written with ID: ", docRef.id);
    getSname.value=''
    getSemail.value=''
    getSpassword.value=''
    signOut(auth).then(()=>{
      location.href='./login.html'
    }).catch(()=>{
      console.log('Error 420');
    })
  })
})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;  
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: errorCode+' '+errorMessage,
  });
});
}else{
localStorage.clear()
signInWithEmailAndPassword(auth, getSemail.value, getSpassword.value)
.then((userCredential) => {
  const user = userCredential.user;
  Swal.fire({
    title: `${user.email} signedup`,
    icon: "success",
    draggable: true,
    allowOutsideClick:false,
    allowEscapeKey:false,
  }).then(async ()=>{
    const { value: rname } = await Swal.fire({
      title: "Restaurant Name",
      input: "text",
      inputPlaceholder: "Enter your restaurant name"
    });
    if (rname) {
      Swal.fire({
        title: "Restaurant added",
        icon: "success",
        draggable: false
      });
    }
    const docRef = await addDoc(collection(db, "admin"), {
      name:getSname.value,
      time:Timestamp.now(),
      restaurant:rname,
      email: getSemail.value.toLowerCase(),
    });
    getSname.value=''
    getSemail.value=''
    getSpassword.value=''
    // console.log("Document written with ID: ", docRef.id);
    signOut(auth).then(()=>{        
      location.href='./login.html'
    }).catch(()=>{
      console.log('Error 420');
    })
  })
})
.catch((error) => {
  // const errorCode = error.code;
  // const errorMessage = error.message;
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: 'Use same password',
  });
});
}
} catch (e) {//try end or catch start
  console.error("Error adding document: ", e);
}
} //else end
    } 
    else if (result.isDenied) {
      let flag=false
      const querySnapshot = await getDocs(collection(db, "customer"));
querySnapshot.forEach((doc) => {
if(getSemail.value.toLowerCase()==doc.data().email.toLowerCase()){
  flag=true
}
});
if(flag){
Swal.fire({
  icon: "error",
  title: "Oops...",
  text: `${getSemail.value.toLowerCase()} exist as customer`,
});
}else{
try {
  const querySnapshot = await getDocs(collection(db, "admin"));
querySnapshot.forEach((doc) => {
if(getSemail.value.toLowerCase()==doc.data().email.toLowerCase()){
  flag=true
}
});
if(!flag){
createUserWithEmailAndPassword(auth, getSemail.value, getSpassword.value)
.then((userCredential) => {
  const user = userCredential.user;  
  Swal.fire({
    title: `${user.email} signedup`,
    icon: "success",
    draggable: true,
    allowOutsideClick:false,
    allowEscapeKey:false,
  }).then(async ()=>{
    const docRef = await addDoc(collection(db, "customer"), {
      email: getSemail.value.toLowerCase(),
      name:getSname.value,
      time:Timestamp.now(),
    });
    getSname.value=''
    getSemail.value=''
    getSpassword.value=''
    // console.log("Document written with ID: ", docRef.id);
    signOut(auth).then(()=>{
      location.href='./login.html'
    }).catch(()=>{
      console.log('Error 420');
    })
  })
})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: errorCode+' '+errorMessage,
  });
});
}else{  
localStorage.clear()
signInWithEmailAndPassword(auth, getSemail.value, getSpassword.value)
.then((userCredential) => {
  const user = userCredential.user;
  Swal.fire({
    title: `${user.email} signedup`,
    icon: "success",
    draggable: true,
    allowOutsideClick:false,
    allowEscapeKey:false,
  }).then(async (data)=>{
      const docRef = await addDoc(collection(db, "customer"), {
        email: getSemail.value.toLowerCase(),
        time:Timestamp.now(),
        name:getSname.value,
      });
      getSname.value=''
      getSemail.value=''
      getSpassword.value=''
      // console.log("Document written with ID: ", docRef.id);
      signOut(auth).then(()=>{        
        location.href='./login.html'
      }).catch(()=>{
        console.log('Error 420');
      })
  })
})
.catch((error) => {
  // const errorCode = error.code;
  // const errorMessage = error.message;
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: 'Use same password',
  });
});
}
} catch (e) {
  console.error("Error adding document: ", e);
}
}
    }
  }); //then end
})
}
if(getLoginBody){
getLopen.addEventListener('click',()=>{
  getLclose.style.display='block'
  getLopen.style.display='none'
  getLpassword.type='text'
})
getLclose.addEventListener('click',()=>{
  getLclose.style.display='none'
  getLopen.style.display='block'
  getLpassword.type='password'
})
getLform.addEventListener('submit', ()=>{
Swal.fire({
  title: "How do you want to login as?",
  showDenyButton: true,
  allowEscapeKey:false,
  allowOutsideClick:true,
  draggable:false,
  confirmButtonText: "Admin",
  denyButtonText: "Customer"
}).then(async (result) => {//then start
  if (result.isConfirmed) {
    let flag=false
    const querySnapshot = await getDocs(collection(db, "admin"));
querySnapshot.forEach((doc) => {
if(getLemail.value.toLowerCase()==doc.data().email.toLowerCase()){
flag=true
}
});
if(flag){
localStorage.clear()
signInWithEmailAndPassword(auth, getLemail.value, getLpassword.value)
.then((userCredential) => {
  const user = userCredential.user;
  Swal.fire({
    title: `${user.email} login`,
    icon: "success",
    draggable: true,
    allowOutsideClick:false,
    allowEscapeKey:false,
  }).then(async ()=>{
    let flag=false
    let Bj
    const querySnapshot = await getDocs(collection(db, "admin"));
querySnapshot.forEach(async (doc) => {
if(user.email==doc.data().email.toLowerCase()){
  flag=true
  Bj=doc.id
}
});
if(flag){
const cityRef = doc(db, 'admin', Bj);
await updateDoc(cityRef, {
time: Timestamp.now()
});
}
getLemail.value=''
getLpassword.value=''    
location.href='./adminDash.html'
  })
})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: errorCode+' '+errorMessage,
  });
});
}else{
Swal.fire({
  icon: "error",
  title: "Oops...",
  text: `${getLemail.value.toLowerCase()} does'nt exist as admin`,
});
}
  } 
  else if (result.isDenied) {
    let flag=false
    const querySnapshot = await getDocs(collection(db, "customer"));
querySnapshot.forEach((doc) => {
if(getLemail.value.toLowerCase()==doc.data().email.toLowerCase()){
flag=true
}
});
if(flag){
localStorage.clear()
signInWithEmailAndPassword(auth, getLemail.value, getLpassword.value)
.then((userCredential) => {
  const user = userCredential.user;
  Swal.fire({
    title: `${user.email} login`,
    icon: "success",
    draggable: true,
    allowOutsideClick:false,
    allowEscapeKey:false,
  }).then(async ()=>{
    let flag=false
    let Bj
    const querySnapshot = await getDocs(collection(db, "customer"));
querySnapshot.forEach(async (doc) => {
if(user.email==doc.data().email.toLowerCase()){
  flag=true
  Bj=doc.id
}
});
  if(flag){
    const cityRef = doc(db, 'customer', Bj);
await updateDoc(cityRef, {
  time: Timestamp.now()
});
  }
  getLemail.value=''
  getLpassword.value=''  
  location.href='./customerDash.html'
  })
})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: errorCode+' '+errorMessage,
  });
});
}else{
Swal.fire({
  icon: "error",
  title: "Oops...",
  text: `${getLemail.value.toLowerCase()} does'nt exist as customer`,
});
}
  }
});
})
}
if(getAdminBody){
function base64ToFile(base64Url, filename) {
  const arr = base64Url.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}
const typed=new Typed('#element',{
  strings:["Welcome to Admin's Panel",'Add your dishes to serve'],
  typeSpeed:50,
  fadeOut:true,
  backDelay:1000,
  startDelay:3000,
  loop:false,
  cursorChar:'<span class="cursor">_</span>',
})
getLout.addEventListener('click',()=>{
  Swal.fire({
    title: "Do you want to logout?",
    showDenyButton: true,
    confirmButtonText: "Yes",
    denyButtonText: `No`,
    allowOutsideClick:false,
    allowEscapeKey:false,
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.clear()
      signOut(auth).then(()=>{
        Swal.fire({
            title: `You Loggedout`,
            icon: "success",
            draggable: true,
            allowOutsideClick:false,
            allowEscapeKey:false,
          }).then(()=>{
            location.href='./index.html'
          })
      }).catch(()=>{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.code+' '+error.message,
        });
      })
    } else if (result.isDenied) {
      Swal.fire("Didn't logout", "", "info");
    }
  });
})
getItemForm.addEventListener('submit',()=>{
  let getItemName=document.getElementById('itemname')
  let getItemPrice=document.getElementById('itemprice')
  let getItemDescription=document.getElementById('itemdescription')
  let getItemImage=document.getElementById('itemimage')
  let getItemCategory=document.getElementById('itemcategory')
  let file=getItemImage.files[0]
  let reader=new FileReader()
  reader.addEventListener('load', async ()=>{
    let sel
          Array.from(getItemCategory.childNodes).forEach(cv=>{
            if(cv.selected){
              sel=cv
            }
          })
    try {
      const docRef = await addDoc(collection(db, `${id}`), {
        name: getItemName.value,
        price:getItemPrice.value,
        description:getItemDescription.value,
        category:sel.innerHTML,
        url:reader.result,
      });
      // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    getItemName.value=''
    getItemPrice.value=''
    getItemDescription.value=''
    getItemImage.value=''
    getItemCategory.selectedIndex = 0
    readData()
  })
  reader.readAsDataURL(file)
})
readData=async function(){
  
  getAdminContainer.innerHTML=''
  let flag=false
  const querySnapshot = await getDocs(collection(db, `${id}`));
querySnapshot.forEach((doc) => {
  flag=true
  getAdminContainer.innerHTML+=`<div class="card my-2" style="width: 16rem;">
<img src="${doc.data().url}" height="250px" class="card-img-top" alt="..." style="object-fit:cover;">
<div class="card-body">
  <h5 class="card-title">${doc.data().name}</h5>
         <div class="card-text">Rs ${doc.data().price}</div>
         <div class="card-text">${doc.data().category}</div>
         <div class="card-text">${doc.data().description}</div>
         <div class="card-text mt-2 d-flex justify-content-evenly"><button value='${doc.id}' class="card-btn bttnsdel">Delete</button><button value='${doc.id}' class="card-btn bttnsedit" data-bs-toggle="modal" data-bs-target="#staticBuckdrop">Edit</button></div>
</div>
</div>`
});
if(flag){
  let getBttnsDel=document.querySelectorAll('.bttnsdel')
  let getBttnsEdit=document.querySelectorAll('.bttnsedit')
  Array.from(getBttnsDel).forEach((cv,ci)=>{
    cv.addEventListener('click',(e)=>{
      Swal.fire({
        title: "Do you want to delete?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: `No`,
        allowOutsideClick:false,
        allowEscapeKey:false,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteDoc(doc(db, `${id}`, e.srcElement.value));
          Swal.fire({
        title: `Deleted`,
        icon: "success",
        draggable: true,
        allowOutsideClick:false,
        allowEscapeKey:false,
      }).then(()=>{
        readData()
      })
        } else if (result.isDenied) {
          Swal.fire("Didn't delete", "", "info");
        }
      });
    })
    getBttnsEdit[ci].addEventListener('click',async (e)=>{
      let getEditForm=document.getElementById('itemeditform')
      let getEditName=document.getElementById('itemeditname')
      let getEditPrice=document.getElementById('itemeditprice')
      let getEditDescription=document.getElementById('itemeditdescription')
      let getEditImage=document.getElementById('itemeditimage')
      let getEditCategory=document.getElementById('itemeditcategory')
      const querySnapshot = await getDocs(collection(db, `${id}`));
querySnapshot.forEach((doc) => {
if(e.srcElement.value==doc.id){
  getEditName.value=doc.data().name
  getEditPrice.value=doc.data().price
  getEditDescription.value=doc.data().description
  Array.from(getEditCategory.childNodes).forEach(cv=>{
    if(cv.innerText==doc.data().category){
      getEditCategory.selectedIndex=cv.value
    }
  })
  
  
  const file = base64ToFile(doc.data().url, `${doc.data().name}.PNG`);
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(file);
  
  // Set it to the input
  // const input = document.querySelector('input[type="file"]');
  getEditImage.files = dataTransfer.files;
}
});
      const cityRef = doc(db, `${id}`, e.srcElement.value);
      getEditForm.addEventListener('submit',()=>{
        let file=getEditImage.files[0]
        let reader=new FileReader()
        reader.addEventListener('load',async ()=>{
          let sel
          Array.from(getEditCategory.childNodes).forEach(cv=>{
            if(cv.selected){
              sel=cv
            }
          })
          await updateDoc(cityRef, {
            name: getEditName.value,
            price:getEditPrice.value,
            category:sel.innerHTML,
            description:getEditDescription.value,
            url:reader.result,
            });
            getEditName.value=''
            getEditPrice.value=''
            getEditDescription.value=''
            getEditImage.value=''
            getEditCategory.selectedIndex=0
              readData()
        })
        reader.readAsDataURL(file)
      })
    })
  })
}
}
}
if(getCustomerBody){
let getCart=document.getElementById('cart')
if(Number(getPill.firstChild.textContent)==0){
  getPill.style.display='none'
}
let abc
let getFilterResult=document.querySelector('.filterresult')
let getfilterResultPanel=document.getElementById('filterresultpanel')
let getCross=document.getElementById('crossbtn')
getCross.addEventListener('click',()=>{
  getfilterResultPanel.style.display='none' 
  abc.forEach(cv=>{
    cv.style.display='none'
  })
  Array.from(getCustomerContainer.childNodes).forEach(cv=>{
    cv.style.display='block'
  })
})
getSearchForm.addEventListener('submit',()=>{
  let getSearchField=document.getElementById('searchfield')
  abc=Array.from(getCustomerContainer.childNodes).filter(cv=>{
    return cv.childNodes[1].childNodes[2].innerText.toLowerCase().indexOf(getSearchField.value.split(' ').filter(cv=>cv).join(' ').toLowerCase())!=-1 || cv.childNodes[1].childNodes[3].innerText.toLowerCase().indexOf(getSearchField.value.split(' ').filter(cv=>cv).join(' ').toLowerCase())!=-1 || cv.childNodes[1].childNodes[0].innerText.toLowerCase().indexOf(getSearchField.value.split(' ').filter(cv=>cv).join(' ').toLowerCase())!=-1
  })
  Array.from(getCustomerContainer.childNodes).forEach(cv=>{
    cv.style.display='none'
  })
  abc.forEach(cv=>{
    cv.style.display='block'
  })
  getFilterResult.innerText=abc.length
  getfilterResultPanel.style.display='flex' 
})
const typed=new Typed('#elemen',{
  strings:["Welcome dear user",'Delicious food near your town','Order now'],
  typeSpeed:50,
  fadeOut:true,
  backDelay:1000,
  startDelay:3000,
  loop:false,
  cursorChar:'<span class="cursor">_</span>',
})
getLout.addEventListener('click',()=>{
  Swal.fire({
    title: "Do you want to logout?",
    showDenyButton: true,
    confirmButtonText: "Yes",
    denyButtonText: `No`,
    allowOutsideClick:false,
    allowEscapeKey:false,
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.clear()
      signOut(auth).then(()=>{
        Swal.fire({
            title: `You Loggedout`,
            icon: "success",
            draggable: true,
            allowOutsideClick:false,
            allowEscapeKey:false,
          }).then(()=>{
            location.href='./index.html'
          })
      }).catch(()=>{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.code+' '+error.message,
        });
      })
    } else if (result.isDenied) {
      Swal.fire("Didn't logout", "", "info");
    }
  });
})
customerRead=async function(){
  getCustomerContainer.innerHTML=''
  let n=0
  const querySnapshot = await getDocs(collection(db, "customerPanel"));
querySnapshot.forEach(async (doc) => {
const querySnapshot = await getDocs(collection(db, `${doc.data().cd}`));
querySnapshot.forEach((doc) => {
  getCustomerContainer.innerHTML+=`<div class="card my-2" style="width: 16rem;"><img src="${doc.data().url}" height="250px" class="card-img-top" alt="..." style="object-fit:cover;"><div class="card-body"><h5 class="card-title">${doc.data().name}</h5><div class="card-text">Rs <span>${doc.data().price}</span></div><div class="card-text">${doc.data().category}</div><div class="card-text">${doc.data().description}</div><div class="card-text mt-2 d-flex justify-content-evenly"><button value='${n}' class="card-btn bttnsOrder" onclick="addToCart(this)">Order</button></div></div></div>`
n++
})
getBttnsOrder=document.querySelectorAll('.bttnsOrder')
});
}
function addToCart(e){
  getPill.style.display='inline'
  getPill.firstChild.textContent=Number(getPill.firstChild.textContent)+1
  let a=e.parentNode.parentNode.parentNode.cloneNode(true)
  a.lastChild.lastChild.appendChild(a.lastChild.lastChild.firstChild.cloneNode(true))
  a.lastChild.lastChild.firstChild.innerHTML='<b><i class="fa-solid fa-plus"></i></b>'
  a.lastChild.lastChild.firstChild.setAttribute('onclick','plus(this)')
  a.lastChild.lastChild.lastChild.innerHTML='<b><i class="fa-solid fa-minus"></i></b>'
  a.lastChild.lastChild.lastChild.setAttribute('onclick','removeFromCart(this)')
  e.disabled=true
  e.style.opacity=0.5
  getCart.innerHTML+=`<div class="card my-2" style="width: 16rem;">${a.innerHTML}</div>`
  getBill.innerText=Number(getBill.innerText)+Number(a.firstChild.nextSibling.firstChild.nextSibling.firstChild.nextSibling.innerText)
}
window.addToCart=addToCart
function removeFromCart(e){
  let x=0
  let flag=true
  Array.from(getCart.childNodes).forEach(cv=>{
    if(cv.lastChild.lastChild.lastChild.value==e.value){
      x++
    }
  })
  if(x>=2){
    flag=false
  }
  Array.from(getBttnsOrder).forEach(cv=>{
    if(cv.value==e.value && flag){
      cv.disabled=false
  cv.style.opacity=1  
    }
  })
  getBill.innerText=Number(getBill.innerText)-Number(e.parentNode.parentNode.firstChild.nextSibling.firstChild.nextSibling.innerText)
  e.parentNode.parentNode.parentNode.remove()
  getPill.firstChild.textContent=Number(getPill.firstChild.textContent)-1
  if(Number(getPill.firstChild.textContent)==0){
    getPill.style.display='none'
  }
}
window.removeFromCart=removeFromCart
function plus(e){
  getPill.firstChild.textContent=Number(getPill.firstChild.textContent)+1
  let a=e.parentNode.parentNode.parentNode.cloneNode(true)
  getCart.innerHTML+=`<div class="card my-2" style="width: 16rem;">${a.innerHTML}</div>`
  getBill.innerText=Number(getBill.innerText)+Number(a.firstChild.nextSibling.firstChild.nextSibling.firstChild.nextSibling.innerText)
}
window.plus=plus
}