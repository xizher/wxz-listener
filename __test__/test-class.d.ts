import Listener from "../dist";

export default class extends Listener<{
  'inc': { value: number },
  'dec': { val: number },
}> {
  inc () : void
  dec () : void
}