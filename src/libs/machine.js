import { Machine } from "xstate";

const stateMachine = Machine({
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
        MID: {
					target: "middle",
					
				},
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

export default stateMachine;