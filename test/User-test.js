import chai from 'chai';
const expect = chai.expect;
import { testData } from "../src/data/test-data.js"
import { User } from "../src/User.js";

describe("User", function() {

  let user

  beforeEach(() => {
    user = new User(testData[0].travelers[0]);
  })

  it ("Should be an instance of User", () => {
    expect(user).to.be.an.instanceOf(User);
  })

  it ("Should have an ID", () => {
    expect(user.id).to.equal(1)
  })

  

})
