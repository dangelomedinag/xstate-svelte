import { createMachine, assign } from "xstate";



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
          }
        },
        {
          id:"getCategoriesFromAPI",
          src: getCategoriesInfo,
          onDone: {
            actions: ["storeCategories"],
          }
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
  }
})


function getProductsInfo({products}) {
  if (products.length != 0) return;
  return fetch('https://api-consweet.vercel.app/api/products').then((response) =>
    response.json()
  );
}
function getCategoriesInfo({categories}) {
  if (categories.length != 0) return;
  return fetch('https://api-consweet.vercel.app/api/categories').then((response) =>
    response.json()
  );
}

function notEmptyData({products, categories}){return products.length != 0 && categories.length !=0}
// function notEmptyCategories({categories}){return categories.length != 0}

export default stagesManchine
