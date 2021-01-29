import { createMachine } from "xstate";

const stagesManchine = createMachine({
  id: "stages",
  initial: "root",
  states: {
    root: {
      on: {
        STAGE_LISTING: "listing",
        STAGE_PRODUCT: "product"
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
})

export default stagesManchine
