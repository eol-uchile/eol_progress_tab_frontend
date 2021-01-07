
export const date_format = date => (
    (new Date(date)).toLocaleString('es-CL')
)

export const unescapeHTML = string => {
   var elt = document.createElement("span");
   elt.innerHTML = string;
   return elt.innerText;
}