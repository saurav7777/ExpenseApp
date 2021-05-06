const btn = document.getElementById('addbtn');

const headingele = document.getElementById('TotalAmount')
const expense_data = document.getElementById('list-group')
// var data = document.getElementById('inputAmount');
let totalExpense = 0;
let expenseList = [];
// console.log(btn)

// btn.onclick = function(){
//     console.log("clicked button")
// }

btn.addEventListener('click',addExpenseToTotal,false);

function addExpenseToTotal(){
    const amount = document.getElementById('inputAmount');
    const amountdesc = document.getElementById('expense-desc');

    const textAmount = amount.value;
    const textdesc = amountdesc.value;
    // console.log({textAmount,textdesc})
    
    let expenseObj = {};
    
    const expense = parseInt(textAmount,10);
    expenseObj.Amount = expense;
    expenseObj.desc = textdesc;
    expenseObj.moment = new Date();
    totalExpense += expense;

    expenseList.push(expenseObj);
    console.log({expenseList});
    headingele.textContent = totalExpense;

    addchildnode(expenseObj)

    // converting data to HTML
    // renderList(expenseList);
    
    // console.clear();
    // console.log("html joined list ",allexpenseHtmlJoined)
    // console.table(expenseList);
}

function addchildnode(expenseObj){
    const newli=document.createElement('li');
    newli.classList.add("list-group-items")
    newli.innerHTML = `
            <div class="col-1">
                <h3 class="list-item-name">${expenseObj.textdesc}</h3>
                <small class="list-item-time">${getDateString(expenseObj.moment)}</small>
            </div>
            <div class="col-2">
                <h3>${expenseObj.Amount}</h3>
            </div>
            <div class="col-3">
                <button 
                    class="delete-btn"
                    onclick="deleteitem(${expenseObj.moment.valueOf()})"
                    >
                    <i class="far fa-trash-alt"></i>
                </button>
        </div>
                        `
    expense_data.appendChild(newli)
}

function renderList(arrofList){
    const allexpenseHtml = arrofList.map((obj) =>
       createListItem(obj)
    )
    const allexpenseHtmlJoined = allexpenseHtml.join('')  
    expense_data.innerHTML = allexpenseHtmlJoined;
    
    //updating total
    headingele.textContent = totalExpense;
}

function createListItem({desc,Amount,moment}){
    console.log("function called",desc,Amount);
    return `<li class="list-group-items">
        <div class="col-1">
            <h3 class="list-item-name">${desc}</h3>
            <small class="list-item-time">${getDateString(moment)}</small>
        </div>
        <div class="col-2">
            <h3>${Amount}</h3>
        </div>
        <div class="col-3">
            <button 
                class="delete-btn"
                onclick="deleteitem(${moment.valueOf()})"
                >
                <i class="far fa-trash-alt"></i>
            </button>
        </div>
    </li>`
    ;
}

function getDateString(moment){
    return moment.toLocaleDateString('en-US',{
        year:'numeric',
        month:'long',
        day:'numeric'})
}

function deleteitem(datestring){
    // const filteredarr = [];
    // console.log("delete called",datestring)
    // for(let i=0;i<expenseList.length;i++){
    //     if(expenseList[i].moment.valueOf() !== datestring){
    //         filteredarr.push(expenseList[i])
    //     }
    // }

    const filteredarr = expenseList.filter((expense)=>{
        if(expense.moment.valueOf() !== datestring) {
            return expense
        }else{
            totalExpense = totalExpense - expense.Amount
        }
    })

    // const filteredarr = expenseList.filter(
    //     expense => expense.moment.valueOf() !== datestring
    //     )


    expenseList=filteredarr;
    renderList(filteredarr)
}
function counterIncrement(){
    counter++;
}
