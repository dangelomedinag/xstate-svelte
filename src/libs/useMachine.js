import { interpret } from "xstate";

export function useMachine(machine, config, transiton,options) {
	const extendsConfig = config ? machine.withConfig(config) : machine

  const service = interpret(extendsConfig, options);

	service.onTransition((state=>{
		if(state.changed && transiton) {
			transiton()
		}
	})).start()

  return {
    service
  }
}