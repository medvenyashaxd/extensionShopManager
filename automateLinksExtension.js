// let table = document.querySelector("tbody")
//
// let checkRows = (records) => {
//     for (let record of records) {
//         if (record.addedNodes.length) {
//             let element = document.getElementById(record.addedNodes[0].data)
//             if (element) {
//                 console.log(element)
//             }
//         }
//     }
// }
//
// let observer = new MutationObserver(checkRows)
// observer.observe(
//     table,
//     {
//         childList: true,
//         subtree: true
//     }
// )


let id = document.getElementById("id")
let brand = id.querySelector(".brandAndName")
let smallBrandContent = brand.querySelector("small").outerText
brand.innerHTML = smallBrandContent + "<br><span></span>"
let linked_name = id.querySelector(".btn.btn-xs.btn-outline.btn-primary")
linked_name.innerHTML = '<i class="fa fa-external-link"></i><span style="background-color: yellow;"> new text</span>'