import { createMachine, assign } from "xstate";
import categoriesBackup from "../../categories.js";
import productsBackup from "../../products.js";



const stagesManchine = createMachine({
  id: "stages",
  initial: "root",
  context: {
    products: [],
    categories: []
  },
  states: {
    root: {
      invoke: [
        {
          id:"getProductsFromAPI",
          src: getProductsInfo,
          onDone: {
            actions: ["storeProducts"],
          },
          onError: {
            actions: "forwardProducts"
          },
        },
        {
          id:"getCategoriesFromAPI",
          src: getCategoriesInfo,
          onDone: {
            actions: ["storeCategories"],
          },
          onError: {
            actions: "forwardCategories"
          },
        }
      ],
      on: {
        STAGE_LISTING: {
          target: "listing",
          cond: notEmptyData
        },
        STAGE_PRODUCT: {
          target: "product",
          cond: notEmptyData
        },
      }
    },
    listing: {
      on: {
        RETURN: "root",
        STAGE_PRODUCT: "product"
      }
    },
    product: {
      on: {
        RETURN: "listing",
        STAGE_ROOT: "root"
      }
    }
  }
},{
  actions: {
    storeProducts: assign({
      products: ( _ , {data})=> data
    }),
    storeCategories: assign({
      categories: ( _ , {data})=> data
    }),
    forwardProducts: assign({
      products: ( _ , event) => productsBackup
    }),
    forwardCategories: assign({
      categories: ( _ , event) => categoriesBackup
    }),
  }
})


function getProductsInfo({products}) {
  if (products.length != 0) return;
  return fetch('https://api-consweet.vercel.app/api/products1').then((response) =>
    response.json()
  );
}
function getCategoriesInfo({categories}) {
  if (categories.length != 0) return;
  return fetch('https://api-consweet.vercel.app/api/categories1').then((response) =>
    response.json()
  );
}

function notEmptyData({products, categories}){return products.length != 0 && categories.length !=0}
// function notEmptyCategories({categories}){return categories.length != 0}

export default stagesManchine
