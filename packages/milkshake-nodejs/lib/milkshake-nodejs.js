import MilkshakePlugin from 'milkshake-core/milkshake-plugin';

class Plugin extends MilkshakePlugin {

  constructor() {
    super();
  }

  getType() {
    return "nodejs";
  }
}

module.exports = new Plugin();
