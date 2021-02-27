import Listener from "../dist";
class TestClass extends Listener {

  constructor () {
    super()
    this.val = 0
  }

  inc () {
    this.val++
    this.fire('inc', { value: this.val })
  }

  dec () {
    this.val--
    this.fire('dec', { val: this.val })
  }

}
export default TestClass