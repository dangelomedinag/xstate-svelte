import { Machine, assign } from "xstate";

const stepsMachine = Machine({
  id: "steps",
  initial: "idle",
  states: {
    idle: {
      on: {
        MOUNT: {
          target: "init",
        }
      }
    },
    init: {
      on: {
        MID: "middle",
        FINAL: "final",
      }
    },
    middle: {
      on: {
        INIT: "init",
        FINAL: "final",
      }
    },
    final: {
      on: {
        INIT: "init",
        MID: "middle",
      }
    },
  }
})

export default stepsMachine;