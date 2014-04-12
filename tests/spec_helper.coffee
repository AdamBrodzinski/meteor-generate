global.chai = require "chai"
global.sinon = require "sinon"
global.sinonChai = require "sinon-chai"
global.rewire = require "rewire"

global.expect = chai.expect
chai.should()
chai.use(sinonChai)

